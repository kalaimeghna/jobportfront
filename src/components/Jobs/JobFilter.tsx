import React from "react";

interface JobFilterProps {
  search: string;
  location: string;
  jobType: string;
  workMode: string;

  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onJobTypeChange: (value: string) => void;
  onWorkModeChange: (value: string) => void;

  onReset: () => void;
}

const JobFilter: React.FC<JobFilterProps> = ({
  search,
  location,
  jobType,
  workMode,
  onSearchChange,
  onLocationChange,
  onJobTypeChange,
  onWorkModeChange,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Job Type */}
        <select
          value={jobType}
          onChange={(e) => onJobTypeChange(e.target.value)}
          className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>

        {/* Work Mode */}
        <select
          value={workMode}
          onChange={(e) => onWorkModeChange(e.target.value)}
          className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Work Modes</option>
          <option value="On-site">On-site</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Remote">Remote</option>
        </select>

        {/* Reset */}
        <button
          onClick={onReset}
          className="bg-gray-900 hover:bg-blue-600 text-white rounded-xl px-5 py-3 font-semibold transition"
        >
          Reset Filters
        </button>

      </div>
    </div>
  );
};

export default JobFilter;