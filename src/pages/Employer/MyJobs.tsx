import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
} from "react-icons/fa";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  applications: number;
  status: string;
}

const MyJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      _id: "1",
      title: "Frontend Developer",
      company: "Google",
      location: "Remote",
      jobType: "Full Time",
      applications: 25,
      status: "Active",
    },
    {
      _id: "2",
      title: "Backend Developer",
      company: "Microsoft",
      location: "Bangalore",
      jobType: "Full Time",
      applications: 18,
      status: "Active",
    },
    {
      _id: "3",
      title: "UI/UX Designer",
      company: "Amazon",
      location: "Chennai",
      jobType: "Hybrid",
      applications: 10,
      status: "Closed",
    },
  ]);

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (confirmDelete) {
      setJobs(jobs.filter((job) => job._id !== id));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            My Jobs
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all your posted jobs.
          </p>
        </div>

        <Link
          to="/employer/create-job"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          <FaPlus />
          Create Job
        </Link>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-4">
                  Job Title
                </th>
                <th className="text-left px-6 py-4">
                  Company
                </th>
                <th className="text-left px-6 py-4">
                  Location
                </th>
                <th className="text-left px-6 py-4">
                  Type
                </th>
                <th className="text-left px-6 py-4">
                  Applications
                </th>
                <th className="text-left px-6 py-4">
                  Status
                </th>
                <th className="text-left px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {job.title}
                  </td>

                  <td className="px-6 py-4">
                    {job.company}
                  </td>

                  <td className="px-6 py-4">
                    {job.location}
                  </td>

                  <td className="px-6 py-4">
                    {job.jobType}
                  </td>

                  <td className="px-6 py-4">
                    {job.applications}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        job.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/jobs/${job._id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEye size={18} />
                      </Link>

                      <Link
                        to={`/employer/edit-job/${job._id}`}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaEdit size={18} />
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(job._id)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {jobs.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No jobs posted yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyJobs;