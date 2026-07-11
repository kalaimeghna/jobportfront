import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { Building2, MapPin, Globe, Edit, Plus, Trash2, Briefcase } from "lucide-react";
import { EmployerProfileData } from "../../types/job.types";

const EmployerProfile = () => {
  const [profile, setProfile] = useState<EmployerProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/companies/my/company");
        if (isMounted) setProfile(data.data || data);
      } catch (err) {
        if (isMounted) setError("Failed to load company profile.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProfile();
    return () => { isMounted = false; };
  }, []);

  if (loading) return <div className="text-center py-20 text-slate-400 font-bold">Loading dashboard...</div>;
  if (error) return <div className="text-center py-20 text-rose-500 font-bold">{error}</div>;
  if (!profile) return <div className="text-center py-20">Profile not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Card */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm mb-10 flex flex-col md:flex-row gap-8">
        <div className="w-32 h-32 rounded-3xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
          {profile.logo ? (
            <img src={profile.logo} alt={profile.companyName} className="w-full h-full object-cover rounded-3xl" />
          ) : (
            <Building2 size={40} className="text-slate-300" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-black text-slate-950 tracking-tighter">{profile.companyName}</h1>
              <div className="flex flex-wrap gap-4 mt-3 text-slate-500 font-bold text-sm">
                <span className="flex items-center gap-1.5"><MapPin size={16} className="text-slate-400" /> {profile.location}</span>
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 transition">
                    <Globe size={16} className="text-slate-400" /> Website
                  </a>
                )}
              </div>
            </div>
            <Link to="/manage-company" className="flex items-center gap-2 text-sm font-bold bg-slate-100 px-5 py-2.5 rounded-xl hover:bg-slate-200 transition">
              <Edit size={14} /> Edit Profile
            </Link>
          </div>
          <p className="mt-6 text-slate-600 leading-relaxed max-w-2xl">{profile.description}</p>
        </div>
      </div>

      {/* Jobs Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-950">Active Postings</h2>
            <p className="text-slate-500 font-medium">Manage your open vacancies and candidates.</p>
          </div>
          <Link to="/post-job" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
            <Plus size={18} /> Post New Job
          </Link>
        </div>

        <div className="grid gap-4">
          {profile.jobs?.length > 0 ? profile.jobs.map((job) => (
            <div key={job._id} className="bg-white border border-slate-100 rounded-2xl p-6 flex justify-between items-center hover:shadow-md transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-950">{job.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-500 font-medium">
                    <span>{job.jobType}</span>
                    <span className="text-slate-300">•</span>
                    <span>{job.salary || "Competitive"}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"><Edit size={18} /></button>
                <button className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"><Trash2 size={18} /></button>
              </div>
            </div>
          )) : (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-3xl text-slate-500 font-medium">
              You haven't posted any jobs yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EmployerProfile;