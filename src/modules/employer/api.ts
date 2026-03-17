import { EmployerCandidate } from "@/types/employer";

export async function fetchCandidatesForEmployer(
  role?: string,
  sort?: "confidence_asc" | "confidence_desc",
): Promise<EmployerCandidate[]> {
  const params = new URLSearchParams();
  if (role?.trim()) params.set("role", role.trim());
  if (sort) params.set("sort", sort);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/candidates/for-employer?${params}`,
  );
  if (!res.ok) throw new Error("Failed to fetch candidates");
  const data = await res.json();
  return data.candidates ?? [];
}
