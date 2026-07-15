import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import {
  Building2,
  MapPin,
  Globe,
  Edit,
  Plus,
  Trash2,
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

      // ✅ Correct Backend Route
      const { data } = await axiosInstance.get("/companies/my");

      setProfile(data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load company profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20">
        Company profile not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Company Header */}
      <div className="bg-white rounded-2xl shadow p-8 flex gap-6">
        <div className="w-32 h-32 rounded-xl border flex items-center justify-center overflow-hidden">
          {profile.logo ? (
            <img
              src={
                typeof profile.logo === "string"
                  ? profile.logo
                  : profile.logo.url
              }
              alt={profile.companyName}
              className="w-full h-full object-cover"
            />
          ) : (
            <Building2 size={50} className="text-gray-400" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {profile.companyName}
              </h1>

              <div className="mt-4 space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {profile.location || "Location not provided"}
                </div>

                <div className="flex items-center gap-2">
                  <Building2 size={16} />
                  {profile.industry || "Industry not specified"}
                </div>

                {profile.website && (
                  <a
                    href={
                      profile.website.startsWith("http")
                        ? profile.website
                        : `https://${profile.website}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <Globe size={16} />
                    {profile.website}
                  </a>
                )}
              </div>
            </div>

            <Link
              to="/manage-company"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
            >
              <Edit size={18} />
              Edit
            </Link>
          </div>

          <p className="mt-6 text-gray-700">
            {profile.description || "No description available."}
          </p>
        </div>
      </div>

      {/* Jobs */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Active Jobs
          </h2>

          <Link
            to="/post-job"
            className="bg-green-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} />
            Post Job
          </Link>
        </div>

        {profile.jobs && profile.jobs.length > 0 ? (
          <div className="space-y-4">
            {profile.jobs.map((job: any) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
              >
                <div className="flex gap-4 items-center">
                  <Briefcase className="text-blue-600" />

                  <div>
                    <h3 className="font-semibold text-lg">
                      {job.title}
                    </h3>

                    <p className="text-gray-500">
                      {job.jobType}
                    </p>

                    <p className="text-gray-500">
                      {job.salary || "Competitive"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="p-2 rounded hover:bg-gray-100">
                    <Edit size={18} />
                  </button>

                  <button className="p-2 rounded hover:bg-gray-100 text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-10 text-center text-gray-500">
            No jobs posted yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerProfile;