interface SpeechRecognition extends EventTarget {
  start(): void;
  stop(): void;
  abort(): void;

  lang: string;
  continuous: boolean;
  interimResults: boolean;
  

  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}