import Link from "next/link";
import CandidatesModule from "@/modules/employer/Candidates";

export default function EmployerPage() {
  return (
    <div className="flex flex-col min-h-screen p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <Link href="/" className="text-white/60 hover:text-white text-sm">
          ← Back
        </Link>
        <h1 className="font-bold text-3xl mt-2">Employer Portal</h1>
        <p className="text-white/70 mt-1">
          Browse candidates and their interview results
        </p>
      </header>
      <CandidatesModule />
    </div>
  );
}
