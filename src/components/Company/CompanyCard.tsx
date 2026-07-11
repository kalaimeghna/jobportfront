import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Globe,
  Building2,
  Briefcase,
} from "lucide-react";

interface Company {
  _id: string;
  name?: string;
  companyName?: string;
  description?: string;
  location?: string;
  jobCount?: number;

  industry?: string;
  companySize?: string;
  website?: string;

  logo?:
    | string
    | {
        url: string;
        publicId?: string;
      };
}

interface CompanyProps {
  company: Company;
  showEditButton?: boolean;
}

const CompanyCard: React.FC<CompanyProps> = ({
  company,
  showEditButton = false,
}) => {
  const companyName =
    company.companyName ||
    company.name ||
    "Company";

  const logoUrl = useMemo(() => {
    if (typeof company.logo === "string") {
      return company.logo;
    }

    if (
      company.logo &&
      typeof company.logo === "object"
    ) {
      return company.logo.url;
    }

    return "/default-company.png";
  }, [company.logo]);

  const [imgSrc, setImgSrc] = useState(logoUrl);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* Header */}
      <div className="p-6">

        <div className="flex gap-4">

          <img
            src={imgSrc}
            alt={companyName}
            className="w-16 h-16 rounded-xl border object-cover bg-gray-100"
            onError={() =>
              setImgSrc("/default-company.png")
            }
          />

          <div className="flex-1">

            <h3 className="text-xl font-bold text-gray-900">
              {companyName}
            </h3>

            {company.industry && (
              <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
                <Building2 size={16} />
                {company.industry}
              </div>
            )}

            {company.location && (
              <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                <MapPin size={16} />
                {company.location}
              </div>
            )}

          </div>

        </div>

        {company.description && (
          <p className="mt-5 text-sm text-gray-600 line-clamp-3">
            {company.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-5">

          {company.companySize && (
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              {company.companySize} Employees
            </span>
          )}

          <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold flex items-center gap-1">
            <Briefcase size={14} />
            {company.jobCount ?? 0} Open Jobs
          </span>

        </div>

        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 mt-5 text-blue-600 hover:text-blue-800 text-sm"
          >
            <Globe size={16} />
            Visit Website
          </a>
        )}

      </div>

      {/* Footer */}
      <div className="border-t bg-gray-50 px-6 py-4 flex justify-between items-center">

        {showEditButton ? (
          <Link
            to={`/employer/edit-company/${company._id}`}
            className="text-gray-700 font-medium hover:text-black"
          >
            Edit
          </Link>
        ) : (
          <span />
        )}

        <Link
          to={`/companies/${company._id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default CompanyCard;