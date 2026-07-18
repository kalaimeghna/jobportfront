import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";

import {
  Building2,
  MapPin,
  Globe,
  Edit,
  Plus,
  Briefcase,
} from "lucide-react";

import { EmployerProfileData } from "../../types/job.types";

const EmployerProfile = () => {
  const [profile, setProfile] = useState<EmployerProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get("/companies/my");

      console.log("COMPANY PROFILE RESPONSE:", data);

      setProfile(data.data || data.company || data);
    } catch (err: any) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          "Failed to load company profile"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 font-bold">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20">
        <p className="mb-4">Company profile not created.</p>

        <Link
          to="/create-company"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Create Company
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10">

      {/* Company Header */}
      <div className="bg-white rounded-2xl shadow p-8 flex gap-6">

        <div className="w-32 h-32 border rounded-xl overflow-hidden flex items-center justify-center">

          {profile.logo ? (
            <img
              src={
                typeof profile.logo === "string"
                  ? profile.logo
                  : profile.logo.url
              }
              alt="Company Logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <Building2
              size={50}
              className="text-gray-400"
            />
          )}

        </div>

        <div className="flex-1">

          <div className="flex justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                {profile.companyName}
              </h1>

              <div className="mt-4 space-y-2 text-gray-600">

                <p className="flex items-center gap-2">
                  <MapPin size={16} />
                  {profile.location || "Location not added"}
                </p>

                <p className="flex items-center gap-2">
                  <Building2 size={16} />
                  {profile.industry || "Industry not added"}
                </p>

                {profile.website && (
                  <a
                    href={
                      profile.website.startsWith("http")
                        ? profile.website
                        : `https://${profile.website}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-blue-600"
                  >
                    <Globe size={16} />
                    {profile.website}
                  </a>
                )}

              </div>

            </div>

            {/* FIXED ROUTE */}
            <Link
              to="/company/manage"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 h-fit"
            >
              <Edit size={18} />
              Edit
            </Link>

          </div>

          <p className="mt-6 text-gray-700">
            {profile.description || "No company description"}
          </p>

        </div>

      </div>

      {/* Jobs Section */}
      <div>

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Active Jobs
          </h2>

          {/* FIXED ROUTE */}
          <Link
            to="/jobs/create"
            className="bg-green-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} />
            Post Job
          </Link>

        </div>

        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">

          <Briefcase className="mx-auto mb-3" />

          <p className="mb-4">
            Manage your posted jobs from Employer Dashboard.
          </p>

          <Link
            to="/dashboard"
            className="text-blue-600 font-bold"
          >
            Go Dashboard
          </Link>

        </div>

      </div>

    </div>
  );
};

export default EmployerProfile;