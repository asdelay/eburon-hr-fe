"use client";

import { useState } from "react";
import { useCandidates } from "./hooks";
import CandidateCard from "./components/CandidateCard";
import { isSortBy } from "@/utils";
import { downloadCandidates } from "./helpers";
import { Download } from "lucide-react";

export default function CandidatesModule() {
  const [roleSearch, setRoleSearch] = useState("");
  const [sortBy, setSortBy] = useState<"confidence_asc" | "confidence_desc">(
    "confidence_desc",
  );
  const { candidates, loading } = useCandidates(roleSearch, sortBy);

  return (
    <>
      <div className="flex flex-col items-start sm:flex-row gap-4 mb-6">
        <button
          onClick={() => downloadCandidates(candidates)}
          disabled={candidates.length === 0}
          className="text-white/70 duration-150 hover:text-white/80 cursor-pointer disabled:cursor-not-allowed disabled:opacity-20"
        >
          <Download />
        </button>
        <input
          type="search"
          value={roleSearch}
          onChange={(e) => setRoleSearch(e.target.value)}
          placeholder="Search by role (e.g. frontend, junior)"
          className="w-full h-10 flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
          aria-label="Search by role"
        />
        <select
          value={sortBy}
          onChange={(e) => {
            const sortOption = e.target.value;
            if (isSortBy(sortOption)) {
              setSortBy(sortOption);
            }
          }}
          className="w-full h-10 sm:w-auto px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-white/50"
          aria-label="Sort by confidence"
        >
          <option value="confidence_desc">Confidence: High → Low</option>
          <option value="confidence_asc">Confidence: Low → High</option>
        </select>
      </div>

      {loading ? (
        <p className="text-white/60">Loading candidates...</p>
      ) : !candidates || candidates.length < 1 ? (
        <p className="text-white/60">
          No candidates found. {roleSearch ? "Try a different search." : ""}
        </p>
      ) : (
        <ul className="space-y-4">
          {candidates.map((c) => (
            <CandidateCard key={c.id} {...c} />
          ))}
        </ul>
      )}
    </>
  );
}
