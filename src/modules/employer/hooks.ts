"use client";

import { useState, useEffect } from "react";
import {
  fetchCandidatesForEmployer,
} from "./api";
import { EmployerCandidate } from "@/types/employer";

export function useCandidates(
  roleSearch: string,
  sortBy: "confidence_asc" | "confidence_desc",
) {
  const [candidates, setCandidates] = useState<EmployerCandidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidatesForEmployer(
      roleSearch.trim() || undefined,
      sortBy,
    )
      .then(setCandidates)
      .catch(() => setCandidates([]))
      .finally(() => setLoading(false));
  }, [roleSearch, sortBy]);

  return { candidates, loading };
}

