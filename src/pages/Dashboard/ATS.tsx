import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaBriefcase, FaCheck, FaTimes, FaClock } from "react-icons/fa";
import { AppDispatch, RootState } from "../../app/store";
import { fetchApplications, updateApplicationStatus } from "../../redux/application/applicationThunk";
import { ApplicationStatus } from "../../types/job.types";

const STATUS_CONFIG: Record<ApplicationStatus, { color: string; icon: React.ReactNode }> = {
  Hired: { color: "bg-emerald-100 text-emerald-800", icon: <FaCheck /> },
  Shortlisted: { color: "bg-purple-100 text-purple-800", icon: <FaUser /> },
  Interview: { color: "bg-blue-100 text-blue-800", icon: <FaClock /> },
  Rejected: { color: "bg-rose-100 text-rose-800", icon: <FaTimes /> },
  Applied: { color: "bg-amber-100 text-amber-800", icon: <FaBriefcase /> },
};

const FILTERS: ("All" | ApplicationStatus)[] = ["All", "Applied", "Interview", "Shortlisted", "Rejected", "Hired"];
const ACTION_BUTTONS: ApplicationStatus[] = ["Interview", "Shortlisted", "Hired", "Rejected"];

const ATS: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { applications, loading, error } = useSelector((state: RootState) => state.applications);
  const [statusFilter, setStatusFilter] = useState<string>("All");

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const filteredApplications = useMemo(() => {
    return statusFilter === "All"
      ? applications
      : applications.filter((a) => a.status === statusFilter);
  }, [applications, statusFilter]);

  const handleStatusUpdate = (id: string, newStatus: ApplicationStatus) => {
    dispatch(updateApplicationStatus({ id, status: newStatus }));
  };

  if (error) return <div className="p-10 text-center text-red-600">Error loading applications: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-950">ATS Pipeline</h1>
        <p className="text-slate-500">Manage candidate progression effectively.</p>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition ${
              statusFilter === s ? "bg-blue-600 text-white shadow-lg" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => <div key={i} className="h-40 animate-pulse bg-slate-100 rounded-2xl" />)}
        </div>
      ) : filteredApplications.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((app) => (
            <div key={app._id} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-black text-slate-900">{app.applicant}</h3>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${STATUS_CONFIG[app.status]?.color}`}>
                  {STATUS_CONFIG[app.status]?.icon} {app.status}
                </span>
              </div>

              <p className="text-sm text-slate-600 font-medium mb-6">
                Applied for: <span className="text-blue-600 font-bold">{app.job}</span>
              </p>

              <div className="grid grid-cols-2 gap-2 border-t pt-4">
                {ACTION_BUTTONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusUpdate(app._id, s)}
                    className="bg-slate-50 hover:bg-blue-50 py-2 rounded-xl text-[10px] font-bold uppercase transition"
                  >
                    Set {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">No applications found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ATS;