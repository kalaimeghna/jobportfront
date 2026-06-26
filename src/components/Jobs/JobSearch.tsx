import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";

const JobSearch: FC = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to jobs page with query params
    navigate(
      `/jobs?keyword=${keyword}&location=${location}`
    );
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row gap-3 items-center">

      {/* Keyword */}
      <input
        type="text"
        placeholder="Job title or keyword..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full md:w-1/2 border p-2 rounded-lg focus:outline-blue-500"
      />

      {/* Location */}
      <input
        type="text"
        placeholder="Location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full md:w-1/3 border p-2 rounded-lg focus:outline-blue-500"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Search
      </button>

    </div>
  );
};

export default JobSearch;