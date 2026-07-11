import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import JobSkeleton from "../../components/Jobs/JobSkeleton";
import { MapPin, Briefcase, Banknote, Search, ArrowRight } from "lucide-react";

const Jobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/jobs");
      setJobs(data.jobs || data.data || []);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(filter.toLowerCase()) || 
    job.location.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-950 tracking-tighter">Explore Opportunities</h1>
          <p className="text-slate-500 mt-2 font-medium">Browse the latest listings curated for your career growth.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-4 text-slate-400" size={18} />
          <input 
            placeholder="Search by title or location..."
            className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-50/50 focus:border-blue-500 outline-none transition"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <JobSkeleton key={i} />)}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-400 font-bold">No jobs match your search criteria.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job._id} className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-950 mb-1">{job.title}</h2>
                <p className="text-blue-600 font-bold text-sm mb-6">{job.company?.companyName || "N/A"}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                    <MapPin size={16} className="text-slate-400" /> {job.location}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                    <Briefcase size={16} className="text-slate-400" /> {job.jobType}
                  </div>
                  <div className="flex items-center gap-3 text-slate-800 font-bold text-sm">
                    <Banknote size={16} className="text-emerald-500" /> {job.salary || "Competitive"}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-slate-50">
                <Link to={`/jobs/${job._id}`} className="flex-1 bg-slate-100 text-slate-900 py-3 rounded-xl font-bold text-center hover:bg-slate-200 transition text-sm">View</Link>
                <Link to={`/apply/${job._id}`} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold text-center hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm">
                  Apply <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;