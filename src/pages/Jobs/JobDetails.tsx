import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { MapPin, Banknote, Briefcase, ChevronLeft, Building2, Tag } from "lucide-react";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const { data } = await axiosInstance.get(`/jobs/${id}`);
        setJob(data.job || data.data);
      } catch (err) {
        console.error("Error fetching job details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchJobDetails();
  }, [id]);

  if (loading) return <div className="p-20 text-center text-slate-500 font-bold">Fetching details...</div>;
  if (!job) return <div className="p-20 text-center text-rose-600 font-bold">Job not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/jobs" className="flex items-center gap-1 text-slate-400 hover:text-slate-900 font-bold mb-8 transition">
        <ChevronLeft size={20} /> Back to Listings
      </Link>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-10 shadow-sm">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
              <Building2 size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-950 tracking-tighter mb-1">{job.title}</h1>
              <p className="text-lg font-bold text-slate-500">{job.company?.companyName || "Company Name"}</p>
            </div>
          </div>
          <Link 
            to={`/apply/${id}`}
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 whitespace-nowrap"
          >
            Apply Now
          </Link>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 py-8 border-b border-slate-100 text-sm">
          <MetaItem icon={<MapPin size={16} />} text={job.location} color="text-rose-500" />
          <MetaItem
  icon={<Banknote size={16} />}
  text={
    job.salary
      ? `₹${job.salary}`
      : `₹${job.salaryMin ?? 0} - ₹${job.salaryMax ?? 0}`
  }
  color="text-emerald-500"
/>
          <MetaItem icon={<Briefcase size={16} />} text={job.jobType} color="text-blue-500" />
        </div>

        {/* Details */}
        <div className="space-y-10 mt-8">
          <Section title="Job Description" content={job.description} />
          <Section title="Requirements" content={job.requirements} />
          
          {job.skills && (
  <div>
    <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">
      Skills Required
    </h2>

    <div className="flex flex-wrap gap-2">
      {(Array.isArray(job.skills)
        ? job.skills
        : typeof job.skills === "string"
        ? job.skills.split(",")
        : []
      ).map((skill: string, index: number) => (
        <span
          key={index}
          className="px-4 py-2 bg-slate-50 text-slate-700 rounded-full text-xs font-bold flex items-center gap-2"
        >
          <Tag size={12} />
          {skill.trim()}
        </span>
      ))}
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

const MetaItem = ({ icon, text, color }: { icon: any, text: string, color: string }) => (
  <div className={`flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl font-bold ${color}`}>
    {icon} <span className="text-slate-700">{text}</span>
  </div>
);

const Section = ({ title, content }: { title: string, content: string }) => (
  <div>
    <h2 className="text-2xl font-black text-slate-950 mb-4">{title}</h2>
    <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">{content}</p>
  </div>
);

export default JobDetails;