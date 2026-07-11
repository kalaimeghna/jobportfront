import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Guards
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Jobs from "../pages/Jobs/Jobs";
import JobDetails from "../pages/Jobs/JobDetails";
import ApplyJob from "../pages/Jobs/ApplyJob";
import Dashboard from "../pages/Dashboard/Dashboard";
import Applicants from "../pages/Employer/Applicants";
import CompanyProfile from "../pages/Profile/EmployerProfile";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 1. Public Routes: Accessible to everyone */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetails />} />
      </Route>

      {/* 2. Protected Routes: Accessible to logged-in users */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          
          {/* Shared protected route (accessible by any logged-in user) */}
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Employer-only routes */}
          <Route element={<RoleRoute allowedRoles={["employer"]} />}>
            <Route path="dashboard/applicants" element={<Applicants />} />
            <Route path="company/profile" element={<CompanyProfile />} />
          </Route>

          {/* Jobseeker-only routes */}
          <Route element={<RoleRoute allowedRoles={["jobseeker"]} />}>
            <Route path="apply/:jobId" element={<ApplyJob />} />
          </Route>
          
        </Route>
      </Route>

      {/* 3. 404 Catch-all: Redirects unknown paths to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;