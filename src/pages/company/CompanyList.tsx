import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";

interface CompanyLogo {
  url: string;
  public_id?: string;
}

interface Company {
  _id: string;
  companyName: string;
  description?: string;
  location?: string;
  industry?: string;
  logo?: string | CompanyLogo;
}

interface CompanyListProps {
  companies: Company[];
}

const CompanyList = ({ companies }: CompanyListProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => {
        // Convert logo object/string into a usable string URL
        const logoUrl =
          typeof company.logo === "string"
            ? company.logo
            : company.logo?.url;

        return (
          <div
            key={company._id}
            className="bg-white rounded-xl shadow-md p-6 border"
          >
            <div className="flex items-center gap-4 mb-4">
              
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={company.companyName}
                  className="w-16 h-16 rounded-full object-cover border"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <Building2 size={30} />
                </div>
              )}

              <div>
                <h2 className="text-xl font-semibold">
                  {company.companyName}
                </h2>

                <p className="text-gray-500">
                  {company.location || "Location not available"}
                </p>
              </div>

            </div>


            <p className="text-gray-600 line-clamp-3">
              {company.description || "No description available"}
            </p>


            {company.industry && (
              <p className="mt-3 text-sm text-blue-600">
                {company.industry}
              </p>
            )}


            <Link
              to={`/companies/${company._id}`}
              className="inline-block mt-5 text-blue-600 hover:underline"
            >
              View Company
            </Link>

          </div>
        );
      })}
    </div>
  );
};

export default CompanyList;