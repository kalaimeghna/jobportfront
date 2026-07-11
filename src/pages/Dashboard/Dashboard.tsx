import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBriefcase, FaUsers, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import axiosInstance from "../../api/axios";
import { RootState } from "../../app/store"; // Adjust path as needed

// --- Types ---
interface RecentApplication {
  _id: string;
  name: string;
  jobTitle: string;
  status: "pending" | "accepted" | "rejected" | "reviewed" | "interview";
}

interface DashboardData {
  totalApplications: number;
  pendingCount: number;
  acceptedCount: number;
  rejectedCount: number;
  recentApplications: RecentApplication[];
}

const STATUS_STYLES: Record<string, string> = {
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-100",
  rejected: "bg-rose-50 text-rose-700 border-rose-100",
  pending: "bg-amber-50 text-amber-700 border-amber-100",
  reviewed: "bg-blue-50 text-blue-700 border-blue-100",
  interview: "bg-purple-50 text-purple-700 border-purple-100",
  default: "bg-slate-50 text-slate-600 border-slate-100",
};

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch data if the user is an employer
    if (user?.role === "employer") {
      const fetchDashboardData = async () => {
        try {
          setLoading(true);
          const response = await axiosInstance.get("/analytics/metrics");
          setData(response.data);
        } catch (err: any) {
          setError(err.response?.data?.message || "Failed to load dashboard data.");
        } finally {
          setLoading(false);
        }
      };
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Loading state
  if (loading) return <div className="min-h-[40vh] flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8" /></div>;

  // Error state (only for Employers)
  if (error) return <div className="p-8 bg-rose-50 text-rose-700 rounded-xl m-6">{error}</div>;

  // Jobseeker View
  if (user?.role !== "employer") {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-slate-950">Welcome back, {user?.name}!</h1>
        <p className="text-slate-500 mt-2">Explore the latest job opportunities and track your applications.</p>
        <div className="mt-8">
           <Link to="/jobs" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
             Browse Jobs
           </Link>
        </div>
      </div>
    );
  }

  // Employer View
  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <header>
        <h1 className="text-3xl font-black text-slate-950">Dashboard</h1>
        <p className="text-slate-500">Welcome back! Here is your hiring metrics overview.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Applications", val: data?.totalApplications || 0, icon: <FaUsers />, color: "bg-indigo-500" },
          { title: "Pending Review", val: data?.pendingCount || 0, icon: <FaBriefcase />, color: "bg-amber-500" },
          { title: "Accepted", val: data?.acceptedCount || 0, icon: <FaCheckCircle />, color: "bg-emerald-500" },
          { title: "Rejected", val: data?.rejectedCount || 0, icon: <FaTimesCircle />, color: "bg-rose-500" },
        ].map((stat, i) => (
          <Link key={i} to="/dashboard/applicants" className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition">
            <div className={`${stat.color} text-white w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <h3 className="text-slate-500 text-xs font-bold uppercase">{stat.title}</h3>
            <p className="text-3xl font-black">{stat.val}</p>
          </Link>
        ))}
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm overflow-hidden">
        <h2 className="text-xl font-black mb-6">Recent Applications</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs uppercase font-bold border-b border-slate-100">
                <th className="py-3 text-left">Candidate</th>
                <th className="py-3 text-left">Position</th>
                <th className="py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentApplications && data.recentApplications.length > 0 ? (
                data.recentApplications.map((app) => (
                  <tr key={app._id} className="border-t border-slate-50 hover:bg-slate-50 transition">
                    <td className="py-4 font-bold text-slate-800">{app.name}</td>
                    <td className="py-4 text-slate-600">{app.jobTitle}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${STATUS_STYLES[app.status] || STATUS_STYLES.default}`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-slate-400">No recent applications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;