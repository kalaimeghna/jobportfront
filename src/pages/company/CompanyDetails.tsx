import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Company {
  _id: string;
  name: string;
  description: string;
  website?: string;
  location?: string;
  logo?: string;
  industry?: string;
}

const CompanyDetails = () => {
  const { id } = useParams();

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        // Replace with API call
        // const response = await API.get(`/companies/${id}`);

        const mockCompany: Company = {
          _id: id || "",
          name: "Google",
          description:
            "Google is a multinational technology company specializing in internet-related services and products.",
          website: "https://www.google.com",
          location: "California, USA",
          industry: "Technology",
          logo:
            "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        };

        setCompany(mockCompany);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <h2 className="text-lg font-semibold">Loading...</h2>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-red-500">
          Company not found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl p-6">
        
        {/* Company Header */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={
              company.logo ||
              "https://via.placeholder.com/150"
            }
            alt={company.name}
            className="w-32 h-32 object-contain border rounded-lg p-2"
          />

          <div>
            <h1 className="text-3xl font-bold">
              {company.name}
            </h1>

            <p className="text-gray-600 mt-2">
              {company.industry}
            </p>

            <p className="text-gray-500">
              📍 {company.location}
            </p>

            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">
            About Company
          </h2>

          <p className="text-gray-700 leading-relaxed">
            {company.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;