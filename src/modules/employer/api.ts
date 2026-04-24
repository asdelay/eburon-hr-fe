import { EmployerCandidate } from "@/types/employer";

export async function fetchCandidatesForEmployer(
  role?: string,
  sort?: "confidence_asc" | "confidence_desc",
  filter?: string
): Promise<EmployerCandidate[]> {
  const params = new URLSearchParams();
  if (role?.trim()) params.set("role", role.trim());
  if (sort) params.set("sort", sort);
  if(filter) params.set('filter', filter);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/candidates/for-employer?${params}`, {credentials: 'include'}
  );
  if (!res.ok) throw new Error("Failed to fetch candidates");
  const data = await res.json();
  (data)
  return data.candidates ?? [];
}
