export async function fetchGenerateQuestions(
  role: string,
  experience: number,
): Promise<string[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/interview/generate-questions`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, experience }),
      credentials: 'include'
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
  experience: number,
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
      credentials: 'include'
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? res.statusText ?? "Failed to assess");
  }
  return res.json();
}

export async function fetchQuestionAudio(
  text: string,
): Promise<{ blob: Blob; contentType: string }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tts/synthesize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? res.statusText ?? "Failed to generate audio");
  }

  const blob = await res.blob();
  return {
    blob,
    contentType: res.headers.get("content-type") ?? "audio/mpeg",
  };
}
