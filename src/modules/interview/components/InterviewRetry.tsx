import React from "react";
import Button from "@/components/Button";

type Props = {
  onRetry: () => void;
  error: string | null;
};

export default function InterviewRetry({ onRetry, error }: Props) {
  return (
    <section className="rounded-lg border border-white/30 p-4">
      <h2 className="text-sm font-medium text-white/70 mb-2">
        All answers submitted
      </h2>
      <p className="text-white/60 text-sm mb-3">
        Submission failed. Click below to retry.
      </p>
      <Button onClick={onRetry}>Retry assessment</Button>
      {error && (
        <p className="mt-2 text-red-400 text-sm" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
