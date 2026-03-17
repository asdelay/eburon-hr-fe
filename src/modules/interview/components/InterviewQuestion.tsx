import Button from "@/components/Button";
import { Mic } from "lucide-react";

type Props = {
  question: string;
  questionIndex: number;
  answer: string;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
  onMicClick: () => void;
  isLastQuestion: boolean;
  isListening: boolean;
  sttSupported: boolean;
  error: string | null;
};

export default function InterviewQuestion({
  question,
  questionIndex,
  answer,
  onAnswerChange,
  onSubmit,
  onMicClick,
  isLastQuestion,
  isListening,
  sttSupported,
  error,
}: Props) {
  return (
    <section className="rounded-lg border border-white/30 p-4">
      <p className="text-white/50 text-xs mb-2">
        Question {questionIndex + 1} of 5
      </p>
      <h2 className="text-sm font-medium text-white/90 mb-3">{question}</h2>
      <textarea
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="Type your answer or use the microphone..."
        className="w-full min-h-25 p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/40 resize-y focus:outline-none focus:border-white/50"
        aria-label="Your answer"
      />
      <div className="mt-3 flex gap-2 items-center">
        {sttSupported && (
          <button
            type="button"
            onClick={onMicClick}
            className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${
              isListening
                ? "bg-red-500/30 border-red-500 text-red-400 animate-pulse"
                : "border-white/50 text-white/80 hover:bg-white/10 hover:border-white/80"
            }`}
            aria-label={isListening ? "Stop recording" : "Start voice input"}
          >
            <Mic size={20} aria-hidden />
          </button>
        )}
        <Button onClick={onSubmit} disabled={!answer.trim()}>
          {isLastQuestion ? "Submit & finish" : "Next question"}
        </Button>
      </div>
      {error && (
        <p className="mt-2 text-red-400 text-sm" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
