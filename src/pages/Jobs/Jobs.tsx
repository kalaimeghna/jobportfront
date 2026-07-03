import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";

interface Company {
  name?: string;
}

interface Job {
  _id: string;
  title: string;
  company: Company | null;
  location: string;
  salary: number;
  jobType: string;
}

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await axiosInstance.get("/jobs");

      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl">
        Loading Jobs...
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold">
          No Jobs Available
        </h2>

        <p className="text-gray-500 mt-3">
          Create a job first from Employer Dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold mb-8">
        Latest Jobs
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold">
              {job.title}
            </h2>

            <p className="text-gray-500 mt-2">
              {job.company?.name || "Company"}
            </p>

            <p>{job.location}</p>

            <p className="text-green-600 font-semibold mt-2">
              ₹{job.salary.toLocaleString()}
            </p>

            <p className="mt-2">
              {job.jobType}
            </p>

            <div className="flex gap-3 mt-5">
              <Link
                to={`/jobs/${job._id}`}
                className="bg-gray-200 px-5 py-2 rounded"
              >
                View
              </Link>

              <Link
                to={`/jobs/apply/${job._id}`}
                className="bg-blue-600 text-white px-5 py-2 rounded"
              >
                Apply
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;