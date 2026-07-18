import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUser,
  FaBriefcase,
  FaCheck,
  FaTimes,
  FaClock,
} from "react-icons/fa";
import { AppDispatch, RootState } from "../../app/store";
import {
  fetchApplications,
  updateApplicationStatus,
  ApplicationStatus,
} from "../../redux/application/applicationSlice";

const STATUS_CONFIG: Record<
  ApplicationStatus,
  { color: string; icon: React.ReactNode }
> = {
  pending: { color: "bg-amber-100 text-amber-800", icon: <FaClock /> },
  reviewed: { color: "bg-blue-100 text-blue-800", icon: <FaUser /> },
  interview: { color: "bg-purple-100 text-purple-800", icon: <FaClock /> },
  accepted: { color: "bg-emerald-100 text-emerald-800", icon: <FaCheck /> },
  rejected: { color: "bg-rose-100 text-rose-800", icon: <FaTimes /> },
};

const FILTERS: ("All" | ApplicationStatus)[] = [
  "All",
  "pending",
  "reviewed",
  "interview",
  "accepted",
  "rejected",
];

const ACTION_BUTTONS: ApplicationStatus[] = [
  "reviewed",
  "interview",
  "accepted",
  "rejected",
];

const ATS: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { applications, loading, error } = useSelector(
    (state: RootState) => state.applications
  );

  const [statusFilter, setStatusFilter] = useState<"All" | ApplicationStatus>("All");

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const filteredApplications = useMemo(() => {
    if (statusFilter === "All") return applications;
    return applications.filter((app) => app.status === statusFilter);
  }, [applications, statusFilter]);

  const handleStatusUpdate = (id: string, status: ApplicationStatus) => {
    dispatch(updateApplicationStatus({ id, status }));
  };

  if (error) {
    return <div className="p-10 text-center text-red-600 font-bold">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-950">ATS Pipeline</h1>
        <p className="text-slate-500">Manage candidate applications.</p>
      </header>

      {/* FILTERS */}
      <div className="flex gap-3 mb-8 overflow-x-auto">
        {FILTERS.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-5 py-2 rounded-full font-bold text-sm transition ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : filteredApplications.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((app) => (
            <div key={app._id} className="bg-white border rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="font-black">{app.applicant?.name || "Unknown"}</h3>
                  <p className="text-sm text-gray-500">{app.applicant?.email}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 ${
                    STATUS_CONFIG[app.status]?.color || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {STATUS_CONFIG[app.status]?.icon}
                  {app.status}
                </span>
              </div>

              <p className="text-sm mb-5 text-gray-600">
                <FaBriefcase className="inline mr-2" />
                {app.job?.title || "Job"}
              </p>

              <div className="grid grid-cols-2 gap-2">
                {ACTION_BUTTONS.map((status) => {
                  const isCurrentStatus = app.status === status;
                  return (
                    <button
                      key={status}
                      disabled={isCurrentStatus}
                      onClick={() => handleStatusUpdate(app._id, status)}
                      className={`rounded-lg py-2 text-xs font-bold transition-colors ${
                        isCurrentStatus
                          ? "bg-blue-600 text-white cursor-not-allowed"
                          : "bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-xl">No applications found.</div>
      )}
    </div>
  );
};

export default ATS;