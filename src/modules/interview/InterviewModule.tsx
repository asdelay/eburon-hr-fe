"use client";

import { useInterview } from "./hooks";
import InterviewResult from "./components/InterviewResult";
import InterviewIdle from "./components/InterviewIdle";
import InterviewStatus from "./components/InterviewStatus";
import InterviewRetry from "./components/InterviewRetry";
import InterviewQuestion from "./components/InterviewQuestion";

type Props = {
  candidateId: string;
  role: string;
  experience: number;
};

export default function InterviewModule({
  candidateId,
  role,
  experience,
}: Props) {
  const {
    phase,
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
  } = useInterview(candidateId, role, experience);

  if (result) {
    return <InterviewResult result={result} />;
  }

  if (phase === "idle") {
    return <InterviewIdle onStart={handleStartInterview} error={error} />;
  }

  if (phase === "loading_questions") {
    return <InterviewStatus message="Generating questions..." />;
  }

  if (phase === "submitting") {
    return <InterviewStatus message="Assessing your answers..." />;
  }

  if (answers.length >= 5) {
    return <InterviewRetry onRetry={handleRetrySubmit} error={error} />;
  }

  return (
    <InterviewQuestion
      question={currentQuestion!}
      questionIndex={currentIndex}
      answer={currentAnswer}
      onAnswerChange={setCurrentAnswer}
      onSubmit={handleSubmitAnswer}
      onMicClick={handleMicClick}
      isLastQuestion={isLastQuestion}
      isListening={isListening}
      sttSupported={sttSupported}
      error={error}
    />
  );
}
