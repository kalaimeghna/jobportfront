import React, { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

const JobSearch: FC = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("keyword", keyword.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    navigate(`/jobs?${params.toString()}`);

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-3"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        {/* Keyword */}

        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Job title, skills..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}

        <div className="relative">
          <MapPin
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition disabled:opacity-70"
        >
          {loading ? "Searching..." : "Search Jobs"}
        </button>

      </div>
    </form>
  );
};

export default JobSearch;