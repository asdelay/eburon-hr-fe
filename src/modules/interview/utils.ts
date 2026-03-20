export const STORAGE_KEY = (candidateId: string) => `interview-${candidateId}`;

export type StoredInterview = {
  questions: string[];
  answers: { question: string; answer: string }[];
  role: string;
  experience: number;
};

export function loadStored(candidateId: string): StoredInterview | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY(candidateId));
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredInterview;
    if (!data.questions?.length || !Array.isArray(data.answers)) return null;
    return data;
  } catch {
    return null;
  }
}

export function saveStored(candidateId: string, data: StoredInterview) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY(candidateId), JSON.stringify(data));
}

export function clearStored(candidateId: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY(candidateId));
}

export function getSpeechRecognition(): (new () => SpeechRecognition) | null {
  if (typeof window === "undefined") return null;
  const win = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  };
  return win.SpeechRecognition ?? win.webkitSpeechRecognition ?? null;
}
