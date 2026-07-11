import React from "react";

import { NavLink } from "react-router-dom";

import { Loader2 } from "lucide-react";

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

  FaPlusCircle,

} from "react-icons/fa";



interface SidebarProps {

  onClose?: () =>void;

}



const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {

  const { user, loading } = useAuth();



  if (loading) {

    return (

      <div className="flex h-full items-center justify-center">

        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />

      </div>

    );

  }



  const role = user?.role || "jobseeker";



  const linkClass = ({ isActive }: { isActive: boolean }) =>

    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${

      isActive

        ? "bg-blue-600 text-white shadow-lg"

        : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"

    }`;



  return (

    <aside className="flex h-full w-full flex-col bg-white border-r border-gray-200">



      {/* Logo */}

      <div className="border-b border-gray-200 p-6">

        <h1 className="text-2xl font-bold text-blue-600">

          CareerHub

        </h1>



        <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">

          {role === "admin" && "Admin Panel"}

          {role === "employer" && "Employer Dashboard"}

          {role === "jobseeker" && "Candidate Dashboard"}

        </p>

      </div>



      {/* Navigation */}

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">



        <NavLink

          to="/dashboard"

          end

          className={linkClass}

          onClick={onClose}

        >

          <FaTachometerAlt />

          Dashboard

        </NavLink>



        <NavLink

          to="/jobs"

          className={linkClass}

          onClick={onClose}

        >

          <FaBriefcase />

          Explore Jobs

        </NavLink>



        <NavLink

          to="/companies"

          className={linkClass}

          onClick={onClose}

        >

          <FaBuilding />

          Companies

        </NavLink>



        {/* Employer */}

        {(role === "employer" || role === "admin") && (

          <>

            <div className="my-3 border-t border-gray-200" />



            <NavLink

              to="/jobs/create"

              className={linkClass}

              onClick={onClose}

            >

              <FaPlusCircle />

              Post Job

            </NavLink>



            <NavLink

              to="/dashboard/jobs"

              className={linkClass}

              onClick={onClose}

            >

              <FaBriefcase />

              My Jobs

            </NavLink>



            <NavLink

              to="/dashboard/applicants"

              className={linkClass}

              onClick={onClose}

            >

              <FaUsers />

              Applicants

            </NavLink>



            <NavLink

              to="/dashboard/analytics"

              className={linkClass}

              onClick={onClose}

            >

              <FaChartLine />

              Analytics

            </NavLink>



            <NavLink

              to="/companies/my"

              className={linkClass}

              onClick={onClose}

            >

              <FaBuilding />

              Company Profile

            </NavLink>

          </>

        )}



        {/* Job Seeker */}

        {role === "jobseeker" && (

          <>

            <div className="my-3 border-t border-gray-200" />



            <NavLink

              to="/applications"

              className={linkClass}

              onClick={onClose}

            >

              <FaHistory />

              My Applications

            </NavLink>



            <NavLink

              to="/recommended"

              className={linkClass}

              onClick={onClose}

            >

              <FaBriefcase />

              Recommended Jobs

            </NavLink>



            <NavLink

              to="/resume"

              className={linkClass}

              onClick={onClose}

            >

              <FaFileAlt />

              Resume

            </NavLink>

          </>

        )}



        <div className="my-3 border-t border-gray-200" />



        <NavLink

          to="/profile"

          className={linkClass}

          onClick={onClose}

        >

          <FaUser />

          Profile

        </NavLink>

      </nav>



      {/* User */}

      <div className="border-t border-gray-200 p-5">

        <div className="text-sm font-semibold text-gray-800">

          {user?.name || "Guest"}

        </div>



        <div className="text-xs text-gray-500 capitalize">

          {role}

        </div>

      </div>



      {/* Footer */}

      <div className="border-t border-gray-200 py-3 text-center text-xs text-gray-400">

        © {new Date().getFullYear()} CareerHub

      </div>



    </aside>

  );

};



export default Sidebar; 

