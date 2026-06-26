import { FC } from "react";

interface Applicant {
  _id: string;
  name: string;
  email: string;
  resume?: string;
  status: "pending" | "accepted" | "rejected";
}

interface Props {
  applicant: Applicant;
  onStatusChange?: (id: string, status: "accepted" | "rejected") => void;
}

const ApplicantCard: FC<Props> = ({ applicant, onStatusChange }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      {/* Left Info */}
      <div>
        <h2 className="text-lg font-semibold">{applicant.name}</h2>
        <p className="text-sm text-gray-600">{applicant.email}</p>

        <p className="text-xs mt-1">
          Status:{" "}
          <span
            className={
              applicant.status === "accepted"
                ? "text-green-600"
                : applicant.status === "rejected"
                ? "text-red-600"
                : "text-yellow-600"
            }
          >
            {applicant.status}
          </span>
        </p>
      </div>

      {/* Resume */}
      <div>
        {applicant.resume ? (
          <a
            href={applicant.resume}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Resume
          </a>
        ) : (
          <span className="text-gray-400 text-sm">No Resume</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onStatusChange?.(applicant._id, "accepted")}
          className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
        >
          Accept
        </button>

        <button
          onClick={() => onStatusChange?.(applicant._id, "rejected")}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ApplicantCard;