import { Link } from "react-router-dom";

interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  salary: string;
  jobType?: string;
}

interface Props {
  job: Job;
}

const JobCard = ({ job }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6 border">
      {/* Job Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {job.title}
      </h2>

      {/* Company */}
      <p className="text-gray-600 font-medium">
        {job.company}
      </p>

      {/* Location */}
      <p className="text-gray-500 text-sm mt-1">
        📍 {job.location}
      </p>

      {/* Salary */}
      <p className="text-green-600 font-semibold mt-2">
        💰 {job.salary}
      </p>

      {/* Job Type */}
      {job.jobType && (
        <span className="inline-block mt-3 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
          {job.jobType}
        </span>
      )}

      {/* Description */}
      <p className="text-gray-600 mt-4 line-clamp-3">
        {job.description}
      </p>

      {/* Button */}
      <div className="mt-6">
        <Link
          to={`/jobs/${job._id}`}
          className="inline-block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;