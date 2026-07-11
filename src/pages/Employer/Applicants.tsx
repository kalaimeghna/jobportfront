import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { Loader2, CheckCircle2, XCircle, User, Briefcase } from "lucide-react";

interface ApplicationData {
  _id: string;
  job: { _id: string; title: string } | null;
  applicant: { _id: string; name: string; email: string } | null;
  status: "pending" | "reviewed" | "interview" | "accepted" | "rejected";
}

const Applicants = () => {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const endpoints: Record<string, string> = {
        employer: "/applications/employer/dashboard",
        jobseeker: "/applications/my",
        admin: "/applications",
      };
      
      const { data } = await axiosInstance.get(endpoints[user.role] || "/applications");
      setApplications(data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplicants(); }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await axiosInstance.patch(`/applications/${id}/status`, { status });
      setApplications((prev) => prev.map((app) => (app._id === id ? { ...app, status: status as any } : app)));
    } catch (err: any) {
      alert(err.response?.data?.message || "Unable to update application.");
    }
  };

  if (loading) return <div className="p-20 text-center flex justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;
  if (error) return <div className="p-10 text-rose-600 font-bold text-center">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-black text-slate-950 mb-6">Manage Applications</h2>

      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-black tracking-widest">
            <tr>
              <th className="p-4 text-left">Candidate</th>
              <th className="p-4 text-left">Job Position</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applications.map((app) => (
              <tr key={app._id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-bold text-slate-800 flex items-center gap-2">
                  <User size={16} className="text-slate-400" /> {app.applicant?.name || "N/A"}
                </td>
                <td className="p-4 text-slate-600 flex items-center gap-2">
                  <Briefcase size={16} className="text-slate-400" /> {app.job?.title || "N/A"}
                </td>
                <td className="p-4">
                  <StatusBadge status={app.status} />
                </td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => updateStatus(app._id, "accepted")} className="text-emerald-600 hover:text-emerald-700 p-2">
                    <CheckCircle2 size={20} />
                  </button>
                  <button onClick={() => updateStatus(app._id, "rejected")} className="text-rose-600 hover:text-rose-700 p-2">
                    <XCircle size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700",
    reviewed: "bg-blue-50 text-blue-700",
    accepted: "bg-emerald-50 text-emerald-700",
    rejected: "bg-rose-50 text-rose-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full font-black uppercase text-[10px] ${colors[status] || "bg-slate-100"}`}>
      {status}
    </span>
  );
};

export default Applicants;