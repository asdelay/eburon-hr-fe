"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const sendCandidateData = async (
  prevState: { message: string },
  data: FormData
) => {
  const experience = Number(data.get("experience-y")) * 12 + Number(data.get("experience-m"))
  const payload = {
    fullName: data.get("fullName") || 'No name provided',
    email: data.get("email"),
    role: data.get("role") || 'candidate',
    experience: experience,
    phone: data.get("phone") ? data.get("phone") : null
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/candidates`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: 'include'
    }
  );

  if (!response.ok) {
    let errorMessage = "Failed to create user";
    try {
      const body = await response.json();
      const msg = body?.message;
      errorMessage = Array.isArray(msg) ? msg.join(", ") : msg ?? response.statusText ?? errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }
    return { message: errorMessage };
  }

  let newUser: { id: number };
  try {
    newUser = await response.json();
  } catch {
    return { message: "Invalid response from server" };
  }

  redirect(`/interview/${newUser.id}`);
};

type CandidateProfileActionState = {
  message: string;
  success?: boolean;
};

export const updateCandidateProfile = async (
  prevState: CandidateProfileActionState,
  data: FormData
): Promise<CandidateProfileActionState> => {
  const { verifyUser } = await import("@/dal/dal");
  const candidateId = data.get("candidateId");
  const experienceYears = Number(data.get("experience-y") ?? 0);
  const experienceMonths = Number(data.get("experience-m") ?? 0);

  const payload = {
    fullName: String(data.get("fullName") ?? "").trim(),
    role: String(data.get("role") ?? "").trim(),
    phone: String(data.get("phone") ?? "").trim() || null,
    experience: experienceYears * 12 + experienceMonths,
  };

  if (!candidateId || Number.isNaN(Number(candidateId))) {
    return { message: "Invalid candidate id." };
  }

  if (!payload.fullName || !payload.role) {
    return { message: "Full name and role are required." };
  }

  const { cookieHeader } = await verifyUser();
  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/candidates/${candidateId}`;
  const requestInit = {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify(payload),
    cache: "no-store" as const,
  };

  const response = await fetch(baseUrl, {
    method: "PATCH",
    ...requestInit,
  });

  if (!response.ok) {
    let errorMessage = "Failed to update profile.";
    try {
      const body = await response.json();
      const msg = body?.message;
      errorMessage = Array.isArray(msg) ? msg.join(", ") : msg ?? errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }
    return { message: errorMessage };
  }

  revalidateTag(`candidate:${candidateId}`, "max");
  revalidateTag("candidate-profile", "max");
  revalidatePath("/candidate/profile");
  return { message: "Profile updated successfully.", success: true };
};

export const deleteCandidateProfile = async (formData: FormData) => {
  const { verifyUser } = await import("@/dal/dal");
  const candidateId = formData.get("candidateId");
  if (!candidateId || Number.isNaN(Number(candidateId))) {
    redirect("/candidate/profile");
  }

  const { cookieHeader } = await verifyUser();
  await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/candidates/${candidateId}`,
    {
      method: "DELETE",
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    }
  );

  revalidateTag(`candidate:${candidateId}`, "max");
  revalidateTag("candidate-profile", "max");
  const cookieStore = await cookies();
  cookieStore.delete('refresh_token')
  cookieStore.delete('access_token')

  redirect("/candidate/auth/login");
};

export const startNewInterview = async (formData: FormData) => {
  const candidateId = formData.get("candidateId");
  if (!candidateId || Number.isNaN(Number(candidateId))) {
    redirect("/candidate/profile");
  }

  redirect(`/interview/${candidateId}`);
};