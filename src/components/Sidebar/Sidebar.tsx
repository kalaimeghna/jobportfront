import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaUsers,
  FaUser,
} from "react-icons/fa";

const Sidebar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="h-full w-full bg-white border-r p-4 flex flex-col gap-2">
      
      {/* Logo / Title */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-blue-600">
          Job Portal
        </h1>
        <p className="text-xs text-gray-400">
          Recruiter Dashboard
        </p>
      </div>

      {/* Links */}
      <NavLink to="/dashboard" className={linkClass}>
        <FaTachometerAlt />
        Dashboard
      </NavLink>

      <NavLink to="/dashboard/jobs" className={linkClass}>
        <FaBriefcase />
        Jobs
      </NavLink>

      <NavLink to="/dashboard/applicants" className={linkClass}>
        <FaUsers />
        Applicants
      </NavLink>

      <NavLink to="/dashboard/profile" className={linkClass}>
        <FaUser />
        Profile
      </NavLink>

      {/* Footer section */}
      <div className="mt-auto pt-6 text-xs text-gray-400">
        © {new Date().getFullYear()} Job Portal
      </div>
    </div>
  );
};

export default Sidebar;