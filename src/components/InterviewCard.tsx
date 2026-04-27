import { Interview } from "@/types/interview";
import React from "react";

const InterviewCard: React.FC<Interview> = (props) => {
  return (
    <div className="w-full p-4 border border-white/30 rounded-2xl my-4">
      <div className="flex justify-between gap-2">
        {/* todo */}
        <p className="text-white/80">{props.role || "No role specified"}</p>
        <p className="text-sm text-white/50">
          {new Date(props.createdAt).toLocaleDateString("en-us", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="flex justify-center gap-2 font-mono my-4">
        <p>{props.confidence} - </p>
        <p>{props.label}</p>
      </div>
    </div>
  );
};

export default InterviewCard;
