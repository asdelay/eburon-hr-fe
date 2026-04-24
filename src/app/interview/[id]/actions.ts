"use server";

import { Candidate } from "@/types/candidate";
import { notFound } from "next/navigation";

export async function getCandidate(id: string): Promise<Candidate> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/candidates/${id}`,
    { cache: "no-store", credentials: 'include' }
  );

  if (!response.ok) {
    console.log('error')
  }

  const data = await response.json();
  console.log(data)
  return {
    id: data.id,
    fullName: data?.fullName || 'No fullname',
    email: data.email,
    phone: data.phone ?? null,
    role: data.role || 'candidate',
    experience: data.experience,
    createdAt: data.createdAt,
    updatedAt: data.createdAt
  };
}
