import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";

interface Company {
  _id: string;
  companyName: string;
}

interface Job {
  _id: string;
  title: string;
  company?: Company;
  location: string;
  jobType: string;
  salaryMin: number;
  salaryMax: number;
  status?: string;
  createdAt: string;
}

const MyJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get("/jobs/my");

      console.log("MY JOBS RESPONSE:", data);

      if (Array.isArray(data)) {
        setJobs(data);
      } else if (Array.isArray(data.data)) {
        setJobs(data.data);
      } else if (Array.isArray(data.jobs)) {
        setJobs(data.jobs);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/jobs/${id}`);

      setJobs((prev) => prev.filter((job) => job._id !== id));

      alert("Job deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete job.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg font-semibold">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          My Jobs
        </h1>

        <Link
          to="/jobs/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Post Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-10 text-center">
          <h2 className="text-xl font-semibold">
            No Jobs Found
          </h2>

          <p className="text-gray-500 mt-2">
            You haven't posted any jobs yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Company</th>
                <th className="text-left p-4">Location</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Salary</th>
                <th className="text-left p-4">Status</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {job.title}
                  </td>

                  <td className="p-4">
                    {job.company?.companyName || "-"}
                  </td>

                  <td className="p-4">
                    {job.location}
                  </td>

                  <td className="p-4">
                    {job.jobType}
                  </td>

                  <td className="p-4">
                    ₹{job.salaryMin?.toLocaleString()} - ₹
                    {job.salaryMax?.toLocaleString()}
                  </td>

                  <td className="p-4">
                    {job.status || "Open"}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-4 justify-center">
                      <Link
                        to={`/jobs/edit/${job._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteJob(job._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyJobs;