import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";

interface Company {
  _id: string;
  companyName: string;
}

interface Job {
  _id: string;
  title: string;
  company: Company;
  location: string;
  jobType: string;
  salaryMin: number;
  salaryMax: number;
  status: string;
  createdAt: string;
}

const MyJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const { data } = await axiosInstance.get("/jobs/employer/my-jobs");

      setJobs(data.data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }

    try {
      await axiosInstance.delete(`/jobs/${id}`);

      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete job.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        Loading your jobs...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          My Job Postings
        </h2>

        <Link
          to="/employer/create-job"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-500">
          You haven't posted any jobs yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Salary</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">
                    {job.title}
                  </td>

                  <td className="p-3">
                    {job.company?.companyName}
                  </td>

                  <td className="p-3">
                    {job.location}
                  </td>

                  <td className="p-3">
                    {job.jobType}
                  </td>

                  <td className="p-3">
                    ₹{job.salaryMin.toLocaleString()} - ₹
                    {job.salaryMax.toLocaleString()}
                  </td>

                  <td className="p-3">
                    {job.status}
                  </td>

                  <td className="p-3 flex gap-3">
                    <Link
                      to={`/employer/edit-job/${job._id}`}
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