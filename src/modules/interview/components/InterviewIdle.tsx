import React from "react";
import Button from "@/components/Button";

type Props = {
  onStart: () => void;
  error: string | null;
};

export default function InterviewIdle({ onStart, error }: Props) {
  return (
    <section className="rounded-lg border border-white/30 p-4">
      <h2 className="text-sm font-medium text-white/70 mb-2">
        Text interview
      </h2>
      <p className="text-white/60 text-sm mb-3">
        You will answer 5 questions one at a time. Answers are saved locally
        until the interview is complete.
      </p>
      <Button onClick={onStart} variant="outline">
        Start interview
      </Button>
      {error && (
        <p className="mt-2 text-red-400 text-sm" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
