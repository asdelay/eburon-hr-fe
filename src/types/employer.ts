export type EmployerCandidate = {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  role: string;
  experience: number;
  createdAt: string;
  latestInterview: {
    confidence: number;
    label: string;
    createdAt: string;
  } | null;
};