import Link from "next/link";
import CandidateFormModule from "@/modules/candidate/CandidateFormModule";

export default function CandidatePage() {
  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <header className="mb-6 w-full max-w-lg">
        <Link href="/" className="text-white/60 hover:text-white text-sm">
          ← Back
        </Link>
        <h1 className="font-bold text-2xl mt-2">Candidate Registration</h1>
        <p className="text-white/70 text-sm mt-1">
          Enter your details to start the AI interview
        </p>
      </header>
      <CandidateFormModule />
    </div>
  );
}
