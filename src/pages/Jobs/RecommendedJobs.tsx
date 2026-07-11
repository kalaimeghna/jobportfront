import { useEffect, useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import axiosInstance from "../../api/axios";
import JobCard from "../../components/Jobs/JobCard";
import JobSkeleton from "../../components/Jobs/JobSkeleton";

const RecommendedJobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/recommendations/jobs");
      setJobs(data.data || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-950 tracking-tighter">Recommended For You</h1>
          <p className="text-slate-500 mt-2 font-medium">Curated opportunities matched to your skill profile.</p>
        </div>
        <button 
          onClick={fetchRecommendations}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-700 hover:border-blue-600 hover:text-blue-600 transition"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </header>

      {/* AI Banner */}
      <div className="relative bg-slate-950 text-white rounded-3xl p-10 mb-10 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest mb-3">
            <Sparkles size={16} /> AI-Powered Matching
          </div>
          <h2 className="text-3xl font-black tracking-tight">Smart Career Insights</h2>
          <p className="text-slate-400 mt-2 max-w-xl">
            Our algorithms analyze your experience and preferences to surface the positions where you have the highest probability of an interview.
          </p>
        </div>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => <JobSkeleton key={i} />)}
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <h3 className="text-xl font-black text-slate-900">No matches found yet</h3>
          <p className="text-slate-500 mt-2">Try updating your skills or profile to see better results.</p>
        </div>
      )}
    </div>
  );
};

export default RecommendedJobs;