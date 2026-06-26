import { FC } from "react";

const JobSkeleton: FC = () => {
  return (
    <div className="bg-white shadow rounded-xl p-5 animate-pulse flex flex-col gap-4">
      
      {/* Title */}
      <div className="h-5 bg-gray-300 rounded w-3/4"></div>

      {/* Company + Location */}
      <div className="flex gap-3">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>

      {/* Salary + Type */}
      <div className="flex justify-between">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>

      {/* Button */}
      <div className="h-10 bg-gray-300 rounded w-full"></div>
    </div>
  );
};

export default JobSkeleton;