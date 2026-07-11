import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUserCircle,
  FaBriefcase,
  FaBuilding,
  FaTachometerAlt,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getProfileRoute = () => {
    if (user?.role === "employer") {
      return "/companies/my"; // Change if your project uses another route
    }
    return "/profile";
  };

  if (loading) {
    return (
      <nav className="h-16 bg-white border-b border-gray-200 shadow-sm" />
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            C
          </div>

          <span className="text-xl font-bold text-gray-900">
            CareerHub
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-6">

          <NavLink
            to="/jobs"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Jobs
          </NavLink>

          <NavLink
            to="/companies"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Companies
          </NavLink>

          {user && (
            <NavLink
              to="/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
            >
              <FaTachometerAlt />
              Dashboard
            </NavLink>
          )}
        </div>

        {/* User Section */}
        {user ? (
          <div className="flex items-center gap-4">

            <div className="hidden sm:block text-right">
              <p className="font-semibold text-gray-800">
                {user.name}
              </p>

              <p className="text-xs capitalize text-gray-500">
                {user.role}
              </p>
            </div>

            <Link
              to={getProfileRoute()}
              className="text-gray-500 hover:text-blue-600"
            >
              <FaUserCircle size={28} />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
            >
              <FaSignOutAlt />

              <span className="hidden sm:inline">
                Logout
              </span>
            </button>

          </div>
        ) : (
          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
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