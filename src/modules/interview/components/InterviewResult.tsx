import React from "react";
import type { InterviewResult } from "../hooks";

type Props = {
  result: InterviewResult;
};

export default function InterviewResult({ result }: Props) {
  return (
    <section className="rounded-lg border border-white/30 p-4">
      <h2 className="text-sm font-medium text-white/70 mb-2">
        Interview complete
      </h2>
      <div className="space-y-2 text-sm">
        <p>
          <span className="text-white/60">Confidence:</span>{" "}
          <strong>{result.confidence.toFixed(2)}</strong>
        </p>
        <p>
          <span className="text-white/60">Assessment:</span> {result.label}
        </p>
      </div>
    </section>
  );
}
