"use server";

import { redirect } from "next/navigation";

export const sendCandidateData = async (
  prevState: { message: string },
  data: FormData
) => {
  const payload = {
    fullName: data.get("fullName") || 'No name provided',
    email: data.get("email"),
    role: data.get("role") || 'candidate',
    experience: data.get("experience"),
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