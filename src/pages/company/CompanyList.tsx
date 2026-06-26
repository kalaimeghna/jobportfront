import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Company {
  _id: string;
  name: string;
  description: string;
  location?: string;
  website?: string;
  logo?: string;
}

const CompanyList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Replace with API call
        // const { data } = await API.get("/companies");

        const mockData: Company[] = [
          {
            _id: "1",
            name: "Google",
            description: "Leading technology company.",
            location: "California, USA",
            logo:
              "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
          },
          {
            _id: "2",
            name: "Microsoft",
            description: "Software and cloud solutions.",
            location: "Washington, USA",
            logo:
              "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
          },
          {
            _id: "3",
            name: "Amazon",
            description: "E-commerce and cloud computing.",
            location: "Seattle, USA",
            logo:
              "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
          },
        ];

        setCompanies(mockData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <h2 className="text-lg font-semibold">Loading companies...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Companies
        </h1>
        <p className="text-gray-500">
          Explore companies hiring now
        </p>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div
            key={company._id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <img
              src={
                company.logo ||
                "https://via.placeholder.com/120"
              }
              alt={company.name}
              className="w-20 h-20 object-contain mb-4"
            />

            <h2 className="text-xl font-semibold">
              {company.name}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              📍 {company.location}
            </p>

            <p className="text-gray-600 mt-3 line-clamp-3">
              {company.description}
            </p>

            <Link
              to={`/companies/${company._id}`}
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;