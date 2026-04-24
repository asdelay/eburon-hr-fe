export interface Interview {
  id: number;
  userId: number;
  confidence: number;
  label: string;
  role: string;
  experience: number;
  questions: any;
  answers: any;

  createdAt: Date
  updatedAt: Date;
}