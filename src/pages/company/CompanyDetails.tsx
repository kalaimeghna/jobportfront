import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import {
  Globe,
  MapPin,
  Building,
  ArrowLeft,
  Loader2,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

const CompanyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCompany();
    }
  }, [id]);

  const fetchCompany = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/companies/${id}`);

      setCompany(res.data.data);
    } catch (error) {
      console.error("Error fetching company:", error);
      setCompany(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-4">Company Not Found</h2>

        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const logo = company.logo?.url || "/placeholder-logo.png";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Banner */}
        <div className="h-44 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

        <div className="px-8 pb-10">
          {/* Header */}
          <div className="-mt-16 flex flex-col md:flex-row gap-6 items-start">
            {/* Logo */}
            <div className="w-32 h-32 rounded-2xl bg-white border shadow-lg flex items-center justify-center overflow-hidden">
           <img
  src={logo}
  alt={company.companyName}
  className="w-full h-full object-contain"
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/placeholder-logo.png";
  }}
/>
            </div>

            {/* Company Name */}
            <div className="flex-1 pt-4">
              <h1 className="text-4xl font-bold">
                {company.companyName || "Company"}
              </h1>

              <div className="flex flex-wrap gap-5 mt-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Building size={18} />
                  <span>{company.industry || "N/A"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{company.location || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {/* Company Info */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-5">
                Company Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-blue-600" size={18} />
                  <span>{company.email || "N/A"}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-blue-600" size={18} />
                  <span>{company.phone || "N/A"}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Building className="text-blue-600" size={18} />
                  <span>{company.industry || "N/A"}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="text-blue-600" size={18} />
                  <span>
                    Founded: {company.foundedYear || "Not Available"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Building className="text-blue-600" size={18} />
                  <span>
                    Company Size: {company.companySize || "Not Available"}
                  </span>
                </div>
              </div>
            </div>

            {/* Website */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-5">Website</h2>

              {company.website ? (
                <a
                  href={
                    company.website.startsWith("http")
                      ? company.website
                      : `https://${company.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline break-all"
                >
                  <Globe size={18} />
                  {company.website}
                </a>
              ) : (
                <p className="text-gray-500">No website available</p>
              )}
            </div>
          </div>

          {/* About */}
          <div className="mt-10 bg-gray-50 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">About Company</h2>

            <p className="text-gray-700 leading-8">
              {company.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;