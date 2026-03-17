export async function fetchGenerateQuestions(
  role: string,
  experience: string,
): Promise<string[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/interview/generate-questions`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, experience }),
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? res.statusText ?? "Failed to generate");
  }
  const data = await res.json();
  const qs = data.questions ?? [];
  if (qs.length < 5) throw new Error("Expected 5 questions");
  return qs;
}

export async function fetchSubmitConfidence(
  candidateId: number,
  role: string,
  experience: string,
  answers: { question: string; answer: string }[],
): Promise<{ confidence: number; label: string }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/interview/confidence`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidateId,
        role,
        experience,
        answers,
      }),
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? res.statusText ?? "Failed to assess");
  }
  return res.json();
}
