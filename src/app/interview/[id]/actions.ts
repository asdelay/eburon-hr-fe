"use server";

import { Candidate } from "@/types/candidate";
import { notFound } from "next/navigation";

export async function getCandidate(id: string): Promise<Candidate> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/candidates/${id}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();
  return {
    id: data.id,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone ?? null,
    role: data.role,
    experience: data.experience,
  };
}
