import { type EmployerCandidate } from "@/types/employer";
import { FC } from "react";

const CandidateCard: FC<EmployerCandidate> = ({
  fullName,
  role = "candidate",
  experience,
  email,
  latestInterview,
  phone,
}) => {
  return (
    <li className="rounded-lg border border-white/30 p-4 hover:border-white/50 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="font-semibold text-lg">
            {fullName || "No full name"}
          </h2>
          <p className="text-white/70 text-sm">{role}</p>

          <p className="text-white/50 text-sm">
            {experience} • {email}
          </p>
          {phone && <p className="text-white/50 text-sm">{phone}</p>}
        </div>
        {latestInterview ? (
          <div className="flex flex-col items-end shrink-0">
            <span
              className={`font-mono font-semibold ${
                latestInterview.confidence >= 1
                  ? "text-green-400"
                  : latestInterview.confidence >= 0.5
                    ? "text-amber-400"
                    : "text-red-400"
              }`}
            >
              {latestInterview.confidence.toFixed(2)}
            </span>
            <p className="text-white/60 text-xs text-right max-w-50">
              {latestInterview.label}
            </p>
          </div>
        ) : (
          <span className="text-white/40 text-sm">No interview yet</span>
        )}
      </div>
    </li>
  );
};

export default CandidateCard;
