"use client";

import { useActionState } from "react";
import { sendCandidateData } from "@/app/candidate/actions";

const initialState = { message: "" };

export function useCandidateForm() {
  return useActionState(sendCandidateData, initialState);
}
