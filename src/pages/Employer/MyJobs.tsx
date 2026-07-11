import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Edit2, Trash2, Plus, Loader2, Briefcase } from "lucide-react";
import axiosInstance from "../../api/axios";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  applications: number;
  status: "Active" | "Closed";
}

const MyJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await axiosInstance.get("/employer/jobs");
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axiosInstance.delete(`/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      alert("Failed to delete job.");
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-950">My Jobs</h1>
          <p className="text-slate-500 mt-1">Manage, track, and edit your active job listings.</p>
        </div>
        <Link to="/employer/create-job" className="bg-blue-600 text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus size={18} /> Create Job
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Job Title</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Applications</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr key={job._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900 flex items-center gap-2">
                      <Briefcase size={16} className="text-slate-400" /> {job.title}
                    </p>
                    <p className="text-xs text-slate-500 ml-6">{job.company}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{job.location}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{job.applications}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${job.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <ActionButton to={`/jobs/${job._id}`} icon={<Eye size={16} />} color="text-slate-400 hover:text-blue-600" />
                      <ActionButton to={`/employer/edit-job/${job._id}`} icon={<Edit2 size={16} />} color="text-slate-400 hover:text-emerald-600" />
                      <button onClick={() => handleDelete(job._id)} className="p-2 text-slate-400 hover:text-rose-600 transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="py-16 text-center text-slate-400">No job listings found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ActionButton = ({ to, icon, color }: any) => (
  <Link to={to} className={`p-2 rounded-lg transition ${color}`}>
    {icon}
  </Link>
);

export default MyJobs;