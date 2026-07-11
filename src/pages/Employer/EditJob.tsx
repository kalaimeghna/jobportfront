import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { Loader2, Save, X } from "lucide-react";

interface JobFormData {
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  experience: string;
  skills: string;
}

const EditJob = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<JobFormData>({
    title: "", description: "", company: "", location: "",
    salary: "", jobType: "Full Time", experience: "", skills: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setFetching(true);
        const { data } = await axiosInstance.get(`/jobs/${id}`);
        setFormData(data);
      } catch (err: any) {
        setError("Failed to load job details.");
      } finally {
        setFetching(false);
      }
    };
    if (id) fetchJob();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put(`/jobs/${id}`, formData);
      navigate("/employer/jobs");
    } catch (err) {
      alert("Failed to update job.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-20 text-center text-slate-500"><Loader2 className="animate-spin inline mr-2" /> Loading job...</div>;
  if (error) return <div className="p-20 text-center text-rose-600 font-bold">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-black text-slate-950 mb-6">Edit Job Listing</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Job Title" name="title" value={formData.title} onChange={handleChange} required />
          <Input label="Company Name" name="company" value={formData.company} onChange={handleChange} required />
          <Input label="Location" name="location" value={formData.location} onChange={handleChange} required />
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Job Type</label>
            <select name="jobType" value={formData.jobType} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition">
              {["Full Time", "Part Time", "Internship", "Contract"].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <Input label="Salary Package" name="salary" value={formData.salary} onChange={handleChange} />
          <Input label="Experience Needed" name="experience" value={formData.experience} onChange={handleChange} />
          
          <div className="md:col-span-2">
            <Input label="Skills Required" name="skills" value={formData.skills} onChange={handleChange} />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
            <textarea name="description" rows={5} value={formData.description} onChange={handleChange} required className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition" />
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
          <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition">
            <X size={18} /> Cancel
          </button>
          <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({ label, ...props }: any) => (
  <div>
    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{label}</label>
    <input {...props} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition" />
  </div>
);

export default EditJob;