import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaUsers,
  FaUser,
  FaChartLine,
  FaFileAlt,
  FaBuilding,
  FaHistory,
} from "react-icons/fa";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { user, loading } = useAuth();
  
  // Return early if still loading to prevent incorrect UI rendering
  if (loading) return <div className="h-full w-full p-5 text-slate-400">Loading...</div>;

  const role = user?.role || "jobseeker";

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <aside className="h-full w-full bg-white p-5 flex flex-col">
      {/* Logo Section */}
      <div className="mb-6 px-2">
        <h1 className="text-xl font-bold text-blue-600">CareerHub</h1>
        <p className="text-xs uppercase tracking-wide text-slate-400 mt-1">
          {role === "employer" && "Recruiter Dashboard"}
          {role === "jobseeker" && "Candidate Dashboard"}
          {role === "admin" && "Admin Panel"}
        </p>
      </div>

      {/* Common Links */}
      <nav className="flex flex-col gap-1">
        <NavLink to="/dashboard" end className={linkClass} onClick={onClose}>
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink to="/jobs" className={linkClass} onClick={onClose}>
          <FaBriefcase />
          Explore Jobs
        </NavLink>

        {/* EMPLOYER & ADMIN MENU */}
        {(role === "employer" || role === "admin") && (
          <div className="mt-2 space-y-1 border-t border-slate-100 pt-2">
            <NavLink to="/dashboard/applicants" className={linkClass} onClick={onClose}>
              <FaUsers />
              Manage Applicants
            </NavLink>
            <NavLink to="/dashboard/analytics" className={linkClass} onClick={onClose}>
              <FaChartLine />
              Hiring Analytics
            </NavLink>
            <NavLink to="/companies/my" className={linkClass} onClick={onClose}>
              <FaBuilding />
              Company Profile
            </NavLink>
          </div>
        )}

        {/* JOBSEEKER MENU */}
        {role === "jobseeker" && (
          <div className="mt-2 space-y-1 border-t border-slate-100 pt-2">
            <NavLink to="/applications" className={linkClass} onClick={onClose}>
              <FaHistory />
              My Applications
            </NavLink>
            <NavLink to="/recommended" className={linkClass} onClick={onClose}>
              <FaBriefcase />
              Recommended Jobs
            </NavLink>
            <NavLink to="/resume" className={linkClass} onClick={onClose}>
              <FaFileAlt />
              My Resume
            </NavLink>
          </div>
        )}

        {/* PROFILE */}
        <div className="mt-2 border-t border-slate-100 pt-2">
          <NavLink to="/profile" className={linkClass} onClick={onClose}>
            <FaUser />
            Account Settings
          </NavLink>
        </div>
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 px-2 border-t border-slate-100 text-xs text-slate-400">
        © {new Date().getFullYear()} CareerHub Inc.
      </div>
    </aside>
  );
};

export default Sidebar;