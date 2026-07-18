import React from "react";

// 1. Defined Interface for clarity
export interface Applicant {
  _id: string;
  name: string;
  email: string;
  resume?: string;
  resumeUrl?: string;
  status: "pending" | "accepted" | "rejected";
}

interface Props {
  applicant: Applicant;
  onStatusChange?: (
    id: string,
    status: "accepted" | "rejected"
  ) => Promise<void>;
  isProcessing?: boolean;
}

const ApplicantCard: React.FC<Props> = ({
  applicant,
  onStatusChange,
  isProcessing = false,
}) => {
  // Styles based on status
  const statusStyles = {
    pending: "text-yellow-600 bg-yellow-50 border-yellow-200",
    accepted: "text-green-600 bg-green-50 border-green-200",
    rejected: "text-red-600 bg-red-50 border-red-200",
  };

  // Logic: Prioritize resume, fallback to resumeUrl
  const resumeLink = applicant.resume || applicant.resumeUrl;

  const handleAction = async (newStatus: "accepted" | "rejected") => {
    if (onStatusChange) {
      await onStatusChange(applicant._id, newStatus);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Applicant Info */}
      <div className="flex-1 min-w-0">
        <h2 className="text-base font-bold text-gray-900 truncate">
          {applicant.name}
        </h2>
        <p className="text-sm text-gray-500 truncate">{applicant.email}</p>
        <div className="mt-2">
          <span
            className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded border ${statusStyles[applicant.status]}`}
          >
            {applicant.status}
          </span>
        </div>
      </div>

      {/* Resume Link */}
      <div className="shrink-0">
        {resumeLink ? (
          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
          >
            View Resume ↗
          </a>
        ) : (
          <span className="text-gray-400 text-sm italic">No Resume</span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => handleAction("accepted")}
          disabled={isProcessing || applicant.status === "accepted"}
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
        >
          Accept
        </button>
        <button
          onClick={() => handleAction("rejected")}
          disabled={isProcessing || applicant.status === "rejected"}
          className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-50 text-sm font-medium"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ApplicantCard;