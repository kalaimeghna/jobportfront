import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Company {
  _id: string;
  name?: string;
  companyName?: string;
  description: string;
  location: string;
  jobCount?: number;

  industry?: string;
  companySize?: string;
  website?: string;

  logo?: {
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


  const [imgSrc, setImgSrc] = useState(
  company.logo?.url || "/default-company.png"
);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300">

      {/* Company Header */}
      <div className="flex items-start gap-4">

        <img
          src={imgSrc}
          alt={`${companyName} logo`}
          className="w-16 h-16 rounded-lg object-cover border border-gray-100 bg-gray-50"
          onError={() =>
            setImgSrc("/default-company.png")
          }
        />


        <div className="flex-1">

  <h3 className="text-lg font-bold text-gray-900">
    {companyName}
  </h3>

  {/* Industry & Company Size */}
  <div className="mt-2 flex flex-wrap gap-2 text-xs">

    {company.industry && (
      <span className="px-2 py-1 bg-gray-100 rounded-full">
        {company.industry}
      </span>
    )}

    {company.companySize && (
      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
        {company.companySize}
      </span>
    )}

  </div>

  <p className="text-sm text-gray-500 mt-2">
    {company.location}
  </p>

</div>

      </div>



      {/* Description */}
      <p className="mt-4 text-gray-600 text-sm line-clamp-2 min-h-[48px]">
        {company.description}
      </p>



      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">


        <span className="rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">

          {company.jobCount ?? 0} Open{" "}

          {(company.jobCount ?? 0) === 1
            ? "Position"
            : "Positions"}

        </span>



        <div className="flex items-center gap-4">


          {showEditButton && (

            <Link
              to={`/employer/edit-company/${company._id}`}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Edit
            </Link>

          )}



          <Link
            to={`/companies/${company._id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View Details →
          </Link>


        </div>

      </div>


    </div>
  );
};


export default CompanyCard;