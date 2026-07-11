import React, { useEffect, useState, useMemo } from "react";
import { FaBriefcase, FaUsers, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import axiosInstance from "../../api/axios";

// --- Types ---
interface Application {
  _id: string;
  job?: { _id: string; title: string; status?: string };
  status: "pending" | "reviewed" | "interview" | "accepted" | "rejected";
}

interface AnalyticsData {
  stats: {
    totalJobs: number;
    totalApplications: number;
    acceptedApplications: number;
    rejectedApplications: number;
  };
  topJobs: Array<{ _id: string; title: string; applicationsCount: number; status: string }>;
}

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const { data: response } = await axiosInstance.get("/applications/employer");
        const applications: Application[] = response?.data || response || [];

        const jobMap: Record<string, any> = {};
        applications.forEach((app) => {
          if (!app.job) return;
          if (!jobMap[app.job._id]) {
            jobMap[app.job._id] = { _id: app.job._id, title: app.job.title, applicationsCount: 0, status: app.job.status || "active" };
          }
          jobMap[app.job._id].applicationsCount++;
        });

        setData({
          stats: {
            totalJobs: Object.keys(jobMap).length,
            totalApplications: applications.length,
            acceptedApplications: applications.filter((a) => a.status === "accepted").length,
            rejectedApplications: applications.filter((a) => a.status === "rejected").length,
          },
          topJobs: Object.values(jobMap),
        });
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const statCards = useMemo(() => {
    if (!data) return [];
    return [
      { title: "Total Jobs", value: data.stats.totalJobs, icon: <FaBriefcase />, color: "text-blue-600", bg: "bg-blue-50" },
      { title: "Applications", value: data.stats.totalApplications, icon: <FaUsers />, color: "text-indigo-600", bg: "bg-indigo-50" },
      { title: "Accepted", value: data.stats.acceptedApplications, icon: <FaCheckCircle />, color: "text-emerald-600", bg: "bg-emerald-50" },
      { title: "Rejected", value: data.stats.rejectedApplications, icon: <FaTimesCircle />, color: "text-rose-600", bg: "bg-rose-50" },
    ];
  }, [data]);

  if (loading) return <div className="min-h-[40vh] flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-blue-600" /></div>;
  if (error || !data) return <div className="p-8 bg-rose-50 text-rose-700 rounded-2xl border border-rose-100">{error || "No data available"}</div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black text-slate-950">Analytics Dashboard</h1>
        <p className="text-slate-500">Hiring pipeline performance overview</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.bg} ${item.color} text-xl mb-4`}>
              {item.icon}
            </div>
            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{item.title}</h3>
            <p className="text-3xl font-black mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl font-black mb-6">Top Jobs</h2>
        <table className="w-full text-sm">
          <thead className="text-left text-slate-400 text-xs uppercase">
            <tr>
              <th className="pb-4">Job Title</th>
              <th className="pb-4">Applications</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.topJobs.map((job) => (
              <tr key={job._id}>
                <td className="py-4 font-bold text-slate-800">{job.title}</td>
                <td className="py-4 text-slate-600">{job.applicationsCount}</td>
                <td className="py-4"><StatusBadge status={job.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700",
    closed: "bg-slate-100 text-slate-600",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${styles[status] || styles.active}`}>
      {status}
    </span>
  );
};

export default Analytics;