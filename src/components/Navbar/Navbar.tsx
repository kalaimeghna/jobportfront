import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUserCircle,
  FaBriefcase,
  FaBuilding,
  FaTachometerAlt,
  FaHome,
  FaFileAlt,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const { user, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const getProfileRoute = () => {
    if (!user) return "/login";

    switch (user.role) {
      case "jobseeker":
        return "/profile";

      case "employer":
        return "/employer/profile";

      case "admin":
        return "/dashboard";

      default:
        return "/";
    }
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-100 text-blue-600"
        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
    }`;

  if (loading) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow border-b">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to={user ? "/dashboard" : "/"}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            C
          </div>

          <span className="text-xl font-bold">CareerHub</span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {/* Hide Home after login */}
          {!user && (
            <NavLink to="/" className={navClass}>
              <FaHome />
              Home
            </NavLink>
          )}

          {/* Jobs & Companies */}
          {(!user || user.role === "jobseeker") && (
            <>
              <NavLink to="/jobs" className={navClass}>
                <FaBriefcase />
                Jobs
              </NavLink>

              <NavLink to="/companies" className={navClass}>
                <FaBuilding />
                Companies
              </NavLink>
            </>
          )}

          {/* Dashboard */}
          {user && (
            <NavLink to="/dashboard" className={navClass}>
              <FaTachometerAlt />
              Dashboard
            </NavLink>
          )}

          {/* Job Seeker */}
          {user?.role === "jobseeker" && (
            <NavLink to="/applications" className={navClass}>
              <FaFileAlt />
              My Applications
            </NavLink>
          )}

          {/* Employer */}
          {user?.role === "employer" && (
            <NavLink to="/company/profile" className={navClass}>
              <FaBuilding />
              Company Profile
            </NavLink>
          )}
        </div>

        {/* Right Side */}
        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <h4 className="font-semibold">{user.name}</h4>

              <p className="text-xs text-gray-500 capitalize">
                {user.role}
              </p>
            </div>

            <Link to={getProfileRoute()}>
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border"
                />
              ) : (
                <FaUserCircle
                  size={36}
                  className="text-gray-500 hover:text-blue-600"
                />
              )}
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
            >
              <FaSignOutAlt />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;