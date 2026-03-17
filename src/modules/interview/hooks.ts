"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { fetchGenerateQuestions, fetchSubmitConfidence } from "./api";
import {
  loadStored,
  saveStored,
  clearStored,
  getSpeechRecognition,
} from "./utils";

export type InterviewPhase =
  | "idle"
  | "loading_questions"
  | "answering"
  | "submitting"
  | "done";

export type InterviewResult = { confidence: number; label: string };

export function useInterview(candidateId: string, role: string, experience: string) {
  const [phase, setPhase] = useState<InterviewPhase>("idle");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{ question: string; answer: string }[]>(
    [],
  );
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InterviewResult | null>(null);
  const [sttSupported, setSttSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const currentIndex = answers.length;
  const currentQuestion = questions[currentIndex] ?? null;
  const isLastQuestion = currentIndex === 4;

  const persist = useCallback(
    (q: string[], a: { question: string; answer: string }[]) => {
      saveStored(candidateId, { questions: q, answers: a, role, experience });
    },
    [candidateId, role, experience],
  );

  const submitConfidence = useCallback(
    async (
      q: string[],
      a: { question: string; answer: string }[],
      r: string,
      exp: string,
    ) => {
      setPhase("submitting");
      setError(null);
      try {
        const data = await fetchSubmitConfidence(
          Number(candidateId),
          r,
          exp,
          a,
        );
        setResult(data);
        clearStored(candidateId);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
        setPhase("answering");
      }
    },
    [candidateId],
  );

  // Restore from localStorage on mount
  useEffect(() => {
    const stored = loadStored(candidateId);
    if (!stored) return;
    setQuestions(stored.questions);
    setAnswers(stored.answers);
    if (stored.answers.length >= 5) {
      setPhase("submitting");
      submitConfidence(
        stored.questions,
        stored.answers,
        stored.role,
        stored.experience,
      );
    } else {
      setPhase("answering");
    }
  }, [candidateId, submitConfidence]);

  // STT support check
  useEffect(() => {
    setSttSupported(!!getSpeechRecognition());
  }, []);

  // Speech synthesis (TTS) when question appears
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      phase !== "answering" ||
      !currentQuestion ||
      answers.length >= 5
    )
      return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentQuestion);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
    return () => window.speechSynthesis.cancel();
  }, [currentQuestion, phase, answers.length]);

  // Speech recognition (STT) setup
  useEffect(() => {
    const RecognitionClass = getSpeechRecognition();
    if (!RecognitionClass) return;

    const recognition = new RecognitionClass();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        }
      }
      if (finalTranscript) {
        setCurrentAnswer((prev) =>
          prev ? `${prev} ${finalTranscript.trim()}` : finalTranscript.trim(),
        );
      }
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    return () => {
      recognition.abort();
      recognitionRef.current = null;
    };
  }, []);

  const handleStartInterview = useCallback(async () => {
    setPhase("loading_questions");
    setError(null);
    try {
      const qs = await fetchGenerateQuestions(role, experience);
      setQuestions(qs);
      setAnswers([]);
      setCurrentAnswer("");
      persist(qs, []);
      setPhase("answering");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setPhase("idle");
    }
  }, [role, experience, persist]);

  const handleSubmitAnswer = useCallback(() => {
    const trimmed = currentAnswer.trim();
    if (!trimmed || !currentQuestion) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const newAnswers = [
      ...answers,
      { question: currentQuestion, answer: trimmed },
    ];
    setAnswers(newAnswers);
    setCurrentAnswer("");
    persist(questions, newAnswers);

    if (isLastQuestion) {
      submitConfidence(questions, newAnswers, role, experience);
    }
  }, [
    currentAnswer,
    currentQuestion,
    answers,
    questions,
    isLastQuestion,
    isListening,
    role,
    experience,
    persist,
    submitConfidence,
  ]);

  const handleMicClick = useCallback(() => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (isListening) {
      rec.stop();
      setIsListening(false);
    } else {
      rec.start();
      setIsListening(true);
    }
  }, [isListening]);

  const handleRetrySubmit = useCallback(() => {
    submitConfidence(questions, answers, role, experience);
  }, [questions, answers, role, experience, submitConfidence]);

  return {
    phase,
    questions,
    answers,
    currentAnswer,
    setCurrentAnswer,
    currentQuestion,
    currentIndex,
    isLastQuestion,
    isListening,
    error,
    result,
    sttSupported,
    handleStartInterview,
    handleSubmitAnswer,
    handleMicClick,
    handleRetrySubmit,
    recognitionRef,
  };
}
