import { Interview } from "./interview";

export interface Candidate {
    id: number;
    fullName: string;
    email: string;
    phone?: string;
    role: string;
    //in months
    experience?: number;
    interview?: Interview

    createdAt: Date;
    updatedAt: Date
}