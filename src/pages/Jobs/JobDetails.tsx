import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaBuilding,
} from "react-icons/fa";

interface CompanyInfo {
  name: string;
}

interface JobData {
  _id: string;
  title: string;
  companyName?: string;
  company?: CompanyInfo;
  location: string;
  salary: string;
  jobType: string;
  experience?: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  createdAt: string;
}

const JobDetails = () => {
  // 1. CHANGED HERE: Grab jobId from the URL parameters
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [applying, setApplying] = useState<boolean>(false);
  const [applyMessage, setApplyMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    const fetchJobDetails = async () => {
      // 2. CHANGED HERE: Check for jobId instead of id
      if (!jobId) return;
      
      try {
        setLoading(true);
        // 3. CHANGED HERE: Call your jobs API using the jobId variable
        const response = await axios.get(`${API_BASE}/api/jobs/${jobId}`);
        const finalData = response.data.data ? response.data.data : response.data;
        setJob(finalData);
        setError(null);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to load job details.");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected system error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]); // 4. CHANGED HERE: Added jobId to the dependency array

  const handleApply = async () => {
    // 5. CHANGED HERE: Fallback to the URL's jobId if state isn't populated
    const targetJobId = job?._id || jobId;
    
    if (!targetJobId) {
      setApplyMessage({ type: "error", text: "❌ Invalid target identifier configuration." });
      return;
    }

    setApplying(true);
    setApplyMessage(null);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_BASE}/api/applications/apply/${targetJobId}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setApplyMessage({ type: "success", text: "🎉 Application submitted successfully!" });
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || "Could not complete your application.";
      setApplyMessage({ type: "error", text: `❌ ${errMsg}` });
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-gray-600">
        Loading job details...
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <div className="text-xl font-semibold text-red-600">{error || "Job not found"}</div>
        <Link to="/jobs" className="text-blue-600 hover:underline">Back to Job Listings</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      
      {applyMessage && (
        <div className={`p-4 mb-6 rounded-lg font-medium text-sm border ${
          applyMessage.type === "success" 
            ? "bg-green-50 text-green-800 border-green-200" 
            : "bg-red-50 text-red-800 border-red-200"
        }`}>
          {applyMessage.text}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{job.title}</h1>

        <div className="flex flex-wrap gap-6 mt-4 text-gray-600">
          <div className="flex items-center gap-2">
            <FaBuilding />
            <span>{job.company?.name || job.companyName || "Company Name"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMoneyBillWave />
            <span>₹{job.salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBriefcase />
            <span>{job.jobType}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={handleApply}
            disabled={applying}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {applying ? "Submitting Application..." : "Apply Now"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
            <p className="text-gray-600 leading-7 whitespace-pre-line">{job.description}</p>
          </div>

          {job.responsibilities && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                {job.responsibilities.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Job Overview</h2>
            <div className="space-y-4">
              <div><p className="text-gray-500 text-sm">Company</p><p>{job.company?.name || job.companyName}</p></div>
              <div><p className="text-gray-500 text-sm">Location</p><p>{job.location}</p></div>
              <div><p className="text-gray-500 text-sm">Posted</p><p>{new Date(job.createdAt).toLocaleDateString()}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;