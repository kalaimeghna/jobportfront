import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface JobFormData {
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salaryRange: string;
  description: string;
  requirements: string;
}

const CreateJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    salaryRange: "",
    description: "",
    requirements: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await axiosInstance.post("/jobs", formData);
      setStatus({ type: "success", text: "Job posting created successfully!" });
      setTimeout(() => navigate("/jobs"), 2000);
    } catch (err: any) {
      setStatus({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to publish job. Please check your connection." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-950">Post a New Opportunity</h1>
        <p className="text-slate-500 mt-1">Define the role requirements and publish to your portal.</p>
      </div>

      {status && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${status.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-rose-50 border-rose-100 text-rose-800"}`}>
          {status.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <p className="text-sm font-bold">{status.text}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Job Title" name="title" required value={formData.title} onChange={handleInputChange} placeholder="e.g. Senior Frontend Developer" />
          <InputField label="Department" name="department" required value={formData.department} onChange={handleInputChange} placeholder="e.g. Engineering" />
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Job Type</label>
            <select name="type" value={formData.type} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-600 outline-none transition">
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          
          <InputField label="Location" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. New York, NY" />
          
          <div className="md:col-span-2">
            <InputField label="Salary Range" name="salaryRange" value={formData.salaryRange} onChange={handleInputChange} placeholder="e.g. $100k - $130k" />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
            <textarea name="description" required rows={4} value={formData.description} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition" />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Requirements</label>
            <textarea name="requirements" required rows={3} value={formData.requirements} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition" />
          </div>
        </div>

        <button disabled={isSubmitting} type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition flex items-center justify-center gap-2">
          {isSubmitting && <Loader2 className="animate-spin" size={20} />}
          {isSubmitting ? "Publishing..." : "Publish Job Posting"}
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, ...props }: any) => (
  <div>
    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{label}</label>
    <input {...props} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition" />
  </div>
);

export default CreateJob;