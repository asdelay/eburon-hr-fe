"use client";

import { useActionState } from "react";
import { sendCandidateData } from "@/app/candidate/register-action";

const initialState = { message: "" };

export function useCandidateForm() {
  return useActionState(sendCandidateData, initialState);
}
