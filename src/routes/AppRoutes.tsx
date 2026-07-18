import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Guards
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// ================= PUBLIC PAGES =================
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";

import Jobs from "../pages/Jobs/Jobs";
import JobDetails from "../pages/Jobs/JobDetails";

import CompanyList from "../pages/company/CompanyList";
import CompanyDetails from "../pages/company/CompanyDetails";

// ================= COMMON =================
import Dashboard from "../pages/Dashboard/Dashboard";

// ================= JOB SEEKER =================
import ApplyJob from "../pages/Jobs/ApplyJob";
import RecommendedJobs from "../pages/Jobs/RecommendedJobs";
import Applications from "../pages/Applications/Applications";

import JobSeekerProfile from "../pages/Profile/JobSeekerProfile";
import UpdateProfile from "../pages/Profile/UpdateProfile";

import UploadResume from "../pages/Resume/UploadResume";
import ResumeDetails from "../pages/Resume/ResumeDetails";

// ================= EMPLOYER =================
import CreateJob from "../pages/Employer/CreateJob";
import EditJob from "../pages/Employer/EditJob";
import MyJobs from "../pages/Employer/MyJobs";
import Applicants from "../pages/Employer/Applicants";
import CreateCompany from "../pages/company/CreateCompany"; // Added Import

import EmployerProfile from "../pages/Profile/EmployerProfile";
import EmployerPersonalProfile from "../pages/Profile/EmployerPersonalProfile";

import ManageCompany from "../pages/company/ManageCompany";

// ================= DASHBOARD =================
import Analytics from "../pages/Dashboard/Analytics";
import ATS from "../pages/Dashboard/ATS";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/:id" element={<CompanyDetails />} />
      </Route>

      {/* ================= PRIVATE ================= */}
      <Route element={<PrivateRoute />}>
        <Route
          element={<RoleRoute allowedRoles={["jobseeker"]} />}
        >
          <Route path="/apply/:jobId" element={<ApplyJob />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ================= JOB SEEKER ================= */}
          <Route element={<RoleRoute allowedRoles={["jobseeker"]} />}>
            <Route path="/profile" element={<JobSeekerProfile />} />
            <Route path="/profile/update" element={<UpdateProfile />} />
            <Route path="/resume" element={<UploadResume />} />
            <Route path="/resume/:id" element={<ResumeDetails />} />
            <Route path="/recommended-jobs" element={<RecommendedJobs />} />
            <Route path="/applications" element={<Applications />} />
          </Route>

          {/* ================= EMPLOYER ================= */}
          <Route element={<RoleRoute allowedRoles={["employer", "admin"]} />}>
            {/* Added Create Company Route */}
            <Route path="/company/create" element={<CreateCompany />} />
            
            <Route path="/company/profile" element={<EmployerProfile />} />
            <Route path="/company/manage" element={<ManageCompany />} />
            <Route path="/employer/profile" element={<EmployerPersonalProfile />} />
            <Route path="/jobs/create" element={<CreateJob />} />
            <Route path="/jobs/my" element={<MyJobs />} />
            <Route path="/jobs/edit/:id" element={<EditJob />} />
            <Route path="/dashboard/applicants" element={<Applicants />} />
            <Route path="/dashboard/ats" element={<ATS />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
          </Route>
        </Route>
      </Route>

      {/* ================= NOT FOUND ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;