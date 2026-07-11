import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Route Guards
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// Public Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Jobs from "../pages/Jobs/Jobs";
import JobDetails from "../pages/Jobs/JobDetails";

// Protected Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import ApplyJob from "../pages/Jobs/ApplyJob";
import CreateJob from "../pages/Employer/CreateJob";

// Employer Pages
import Applicants from "../pages/Employer/Applicants";
import Analytics from "../pages/Dashboard/Analytics";
import ATS from "../pages/Dashboard/ATS";
import CompanyProfile from "../pages/Profile/EmployerProfile";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/jobs" element={<Jobs />} />

        {/* Keep this AFTER /jobs/create */}
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Route>

      {/* ================= PROTECTED ROUTES ================= */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* ================= EMPLOYER ROUTES ================= */}
          <Route
            element={<RoleRoute allowedRoles={["employer", "admin"]} />}
          >
            {/* Create Job */}
            <Route
              path="/jobs/create"
              element={<CreateJob />}
            />

            {/* Applicants */}
            <Route
              path="/dashboard/applicants"
              element={<Applicants />}
            />

            {/* Analytics */}
            <Route
              path="/dashboard/analytics"
              element={<Analytics />}
            />

            {/* ATS */}
            <Route
              path="/dashboard/ats"
              element={<ATS />}
            />

            {/* Company Profile */}
            <Route
              path="/company/profile"
              element={<CompanyProfile />}
            />
          </Route>

          {/* ================= JOBSEEKER ROUTES ================= */}
          <Route
            element={<RoleRoute allowedRoles={["jobseeker"]} />}
          >
            <Route
              path="/apply/:jobId"
              element={<ApplyJob />}
            />
          </Route>

        </Route>
      </Route>

      {/* ================= 404 ================= */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;