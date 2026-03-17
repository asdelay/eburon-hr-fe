import React from "react";

type Props = {
  message: string;
};

export default function InterviewStatus({ message }: Props) {
  return (
    <section className="rounded-lg border border-white/30 p-4">
      <p className="text-white/70">{message}</p>
    </section>
  );
}
