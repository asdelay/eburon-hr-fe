import Link from "next/link";
import InterviewModule from "@/modules/interview/InterviewModule";
import { Candidate } from "@/types/candidate";
import { monthsToMonthYears } from "@/utils/dates";

type Props = {
  candidate?: Candidate;
  candidateId?: string;
};

export default function InterviewPage({ candidate, candidateId }: Props) {
  if (!candidate || !candidateId) {
    return (
      <div className="flex flex-col gap-4 p-6 max-w-2xl mx-auto min-h-screen">
        <header>
          <Link href="/" className="text-white/60 hover:text-white text-sm">
            ← Back
          </Link>
          <h1 className="text-xl font-semibold mt-2">AI Interview</h1>
        </header>

        <section className="rounded-lg border border-white/30 p-4">
          <p className="text-sm text-white/70">
            No candidate selected for this interview page.
          </p>
          <p className="text-sm text-white/60 mt-2">
            Open an interview from a candidate profile instead.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-6 max-w-2xl mx-auto min-h-screen">
      <header>
        <Link href="/" className="text-white/60 hover:text-white text-sm">
          ← Back
        </Link>
        <h1 className="text-xl font-semibold mt-2">AI Interview</h1>
      </header>

      <section className="rounded-lg border border-white/30 p-4">
        <h2 className="text-sm font-medium text-white/70 mb-2">
          Candidate profile
        </h2>
        <dl className="grid gap-1 text-sm">
          <div>
            <span className="text-white/60">Name:</span>{" "}
            <span>{candidate?.fullName || "No full name"}</span>
          </div>
          <div>
            <span className="text-white/60">Role:</span>{" "}
            <span>{candidate.role || "—"}</span>
          </div>
          <div>
            <span className="text-white/60">Experience:</span>{" "}
            {candidate.experience ? (
              <span>{monthsToMonthYears(candidate.experience)}</span>
            ) : (
              <span>—</span>
            )}
          </div>
        </dl>
      </section>

      <InterviewModule
        candidateId={candidateId}
        role={candidate.role || ""}
        experience={candidate.experience || 0}
      />
    </div>
  );
}
