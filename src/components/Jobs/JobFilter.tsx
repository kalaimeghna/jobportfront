import { FC } from "react";

interface Props {
  search: string;
  location: string;
  type: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onReset: () => void;
}

const JobFilter: FC<Props> = ({
  search,
  location,
  type,
  onSearchChange,
  onLocationChange,
  onTypeChange,
  onReset,
}) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col md:flex-row gap-3 items-center">

      {/* Search */}
      <input
        type="text"
        placeholder="Search job title..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full md:w-1/3 border p-2 rounded-lg focus:outline-blue-500"
      />

      {/* Location */}
      <input
        type="text"
        placeholder="Location..."
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
        className="w-full md:w-1/3 border p-2 rounded-lg focus:outline-blue-500"
      />

      {/* Type */}
      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        className="w-full md:w-1/4 border p-2 rounded-lg focus:outline-blue-500"
      >
        <option value="">All Types</option>
        <option value="full-time">Full-Time</option>
        <option value="part-time">Part-Time</option>
        <option value="internship">Internship</option>
      </select>

      {/* Reset */}
      <button
        onClick={onReset}
        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        Reset
      </button>

    </div>
  );
};

export default JobFilter;