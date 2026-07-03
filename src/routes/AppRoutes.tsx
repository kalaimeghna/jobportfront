import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// Auth
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/Dashboard";
import Jobs from "../pages/Jobs/Jobs";
import ATS from "../pages/Dashboard/ATS";
import Analytics from "../pages/Dashboard/Analytics";
import Applicants from "../pages/Employer/Applicants";

// Profile
import UpdateProfile from "../pages/Profile/UpdateProfile";
import JobSeekerProfile from "../pages/Profile/JobSeekerProfile";
import EmployerProfile from "../pages/Profile/EmployerProfile";

// Companies
import CompanyList from "../pages/company/CompanyList";
import CompanyDetails from "../pages/company/CompanyDetails";
import ManageCompany from "../pages/company/ManageCompany";

// Jobs
import JobDetails from "../pages/Jobs/JobDetails";
import ApplyJob from "../pages/Jobs/ApplyJob";
import RecommendedJobs from "../pages/Jobs/RecommendedJobs";

// Resume
import UploadResume from "../pages/Resume/UploadResume";
import ResumeDetails from "../pages/Resume/ResumeDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>

        {/* Home */}
        <Route index element={<Home />} />

        {/* Authentication */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />

        {/* Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/jobs" element={<Jobs />} />
        <Route path="dashboard/ats" element={<ATS />} />
        <Route path="dashboard/analytics" element={<Analytics />} />
        <Route path="dashboard/applicants" element={<Applicants />} />

        {/* Profile */}
        <Route path="dashboard/profile" element={<UpdateProfile />} />
        <Route path="profile/jobseeker" element={<JobSeekerProfile />} />
        <Route path="profile/employer" element={<EmployerProfile />} />

        {/* Companies */}
        <Route path="companies" element={<CompanyList />} />
        <Route path="companies/manage" element={<ManageCompany />} />
        <Route path="companies/:id" element={<CompanyDetails />} />

        {/* Jobs */}
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        <Route path="jobs/apply/:jobId" element={<ApplyJob />} />
        <Route path="recommended-jobs" element={<RecommendedJobs />} />

        {/* Resume */}
        <Route path="resume/upload" element={<UploadResume />} />
        <Route path="resume" element={<ResumeDetails />} />

      </Route>
    </Routes>
  );
};

export default AppRoutes;