import React from "react";

const JobSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-pulse">

      {/* Company Banner / Logo Placeholder */}
      <div className="h-40 bg-gray-200"></div>

      <div className="p-6">

        {/* Title */}
        <div className="h-6 w-3/4 rounded bg-gray-200 mb-3"></div>

        {/* Company */}
        <div className="h-4 w-1/2 rounded bg-gray-100 mb-6"></div>

        {/* Description */}
        <div className="space-y-3">
          <div className="h-3 rounded bg-gray-100"></div>
          <div className="h-3 rounded bg-gray-100"></div>
          <div className="h-3 w-4/5 rounded bg-gray-100"></div>
        </div>

        {/* Details */}
        <div className="mt-6 space-y-3">

          <div className="h-4 w-2/5 rounded bg-gray-100"></div>

          <div className="h-4 w-1/3 rounded bg-gray-100"></div>

          <div className="h-4 w-1/4 rounded bg-gray-100"></div>

        </div>

        {/* Button */}
        <div className="mt-8 h-12 rounded-xl bg-gray-200"></div>

      </div>

    </div>
  );
};

export default JobSkeleton;