import React from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaBuilding,
} from "react-icons/fa";

export interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;

  company?: {
    _id?: string;
    companyName?: string;
    logo?:
      | string
      | {
          url?: string;
          publicId?: string;
        };
  } | null;

  companyName?: string;

  salary?: number;
  salaryMin?: number;
  salaryMax?: number;

  jobType?: string;
  type?: string;

  status?: "Open" | "Closed";

  isOpen?: boolean;
  isExpired?: boolean;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const companyName =
    job.company?.companyName ||
    job.companyName ||
    "Company Hiring";

  const jobType = job.jobType || job.type || "Full-Time";

  // Support both old and new logo formats
  const logo =
    typeof job.company?.logo === "string"
      ? job.company.logo
      : job.company?.logo?.url;

  // Support both old and new salary formats
  const salaryText =
    job.salaryMin && job.salaryMax
      ? `₹${job.salaryMin.toLocaleString()} - ₹${job.salaryMax.toLocaleString()}`
      : job.salary
      ? `₹${Number(job.salary).toLocaleString()}`
      : "Negotiable";

  const status =
    job.status ??
    (job.isOpen === false ? "Closed" : "Open");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">

      {/* Company Logo */}

      {logo ? (
        <img
          src={logo}
          alt={companyName}
          className="w-full h-40 object-cover"
        />
      ) : (
        <div className="w-full h-40 bg-slate-100 flex items-center justify-center">
          <FaBuilding className="text-5xl text-slate-400" />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">

        <div className="flex justify-between items-start">

          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {job.title}
            </h3>

            <p className="text-gray-500 mt-1">
              {companyName}
            </p>
          </div>

          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            {jobType}
          </span>

        </div>

        <p className="text-gray-600 mt-4 line-clamp-3">
          {job.description}
        </p>

        <div className="mt-5 space-y-3 text-sm">

          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-blue-500" />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <FaMoneyBillWave className="text-green-500" />
            <span>{salaryText}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaBriefcase className="text-purple-500" />

            <span
              className={
                job.isExpired
                  ? "text-red-600 font-semibold"
                  : status === "Closed"
                  ? "text-orange-600 font-semibold"
                  : "text-green-600 font-semibold"
              }
            >
              {job.isExpired ? "Expired" : status}
            </span>
          </div>

        </div>

        <Link
          to={`/jobs/${job._id}`}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-semibold transition"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default JobCard;