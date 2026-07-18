import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  User,
  Briefcase,
} from "lucide-react";

interface ApplicationData {
  _id: string;
  job: {
    _id: string;
    title: string;
  } | null;
  applicant: {
    _id: string;
    name: string;
    email: string;
  } | null;
  status: "pending" | "reviewed" | "interview" | "accepted" | "rejected";
  resumeUrl?: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    reviewed: "bg-blue-100 text-blue-700",
    interview: "bg-purple-100 text-purple-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

const Applicants = () => {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setUserRole(user.role || "");

      const endpoints: Record<string, string> = {
        employer: "/applications/employer/dashboard",
        jobseeker: "/applications/my",
        admin: "/applications",
      };

      const { data } = await axiosInstance.get(
        endpoints[user.role] || "/applications"
      );

      setApplications(data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const updateStatus = async (id: string, status: "accepted" | "rejected") => {
    try {
      await axiosInstance.patch(`/applications/${id}/status`, { status });
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status } : app))
      );
    } catch (err: any) {
      alert(err.response?.data?.message || "Unable to update application.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600 font-bold">{error}</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-black mb-8">Manage Applications</h1>

      <div className="bg-white rounded-3xl shadow border overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-slate-500">Candidate</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-slate-500">Job Position</th>
              <th className="text-center px-6 py-4 text-xs uppercase tracking-widest text-slate-500">Status</th>
              <th className="text-center px-6 py-4 text-xs uppercase tracking-widest text-slate-500">Resume</th>
              {userRole !== "jobseeker" && (
                <th className="text-center px-6 py-4 text-xs uppercase tracking-widest text-slate-500">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan={userRole !== "jobseeker" ? 5 : 4} className="text-center py-10 text-slate-500">
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <User size={18} className="text-slate-400" />
                      <div>
                        <p className="font-bold">{app.applicant?.name || "N/A"}</p>
                        <p className="text-sm text-slate-500">{app.applicant?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Briefcase size={18} className="text-slate-400" />
                      <span>{app.job?.title || "N/A"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-6 py-5 text-center">
                    {app.resumeUrl ? (
                      <a
                        href={`http://localhost:5000/${app.resumeUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        View Resume
                      </a>
                    ) : (
                      <span className="text-slate-400">No Resume</span>
                    )}
                  </td>
                  {userRole !== "jobseeker" && (
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => updateStatus(app._id, "accepted")}
                          className="text-green-600 hover:text-green-800"
                        >
                          <CheckCircle2 size={22} />
                        </button>
                        <button
                          onClick={() => updateStatus(app._id, "rejected")}
                          className="text-red-600 hover:text-red-800"
                        >
                          <XCircle size={22} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applicants;