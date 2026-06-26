import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import Jobs from "../pages/Dashboard/Dashboard";
import ATS from "../pages/Dashboard/ATS";
import Analytics from "../pages/Dashboard/Analytics";
import Applicants from "../pages/Dashboard/ATS";

import UpdateProfile from "../pages/Profile/UpdateProfile";

import CompanyList from "../pages/company/CompanyList";
import CompanyDetails from "../pages/company/CompanyDetails";
import ManageCompany from "../pages/company/ManageCompany";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/jobs" element={<Jobs />} />
        <Route path="dashboard/ats" element={<ATS />} />
        <Route path="dashboard/analytics" element={<Analytics />} />
        <Route path="dashboard/applicants" element={<Applicants />} />
        <Route path="dashboard/profile" element={<UpdateProfile />} />

        <Route path="companies" element={<CompanyList />} />
        <Route path="companies/manage" element={<ManageCompany />} />
        <Route path="companies/:id" element={<CompanyDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;