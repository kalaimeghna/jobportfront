import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { Loader2, Send, CheckCircle, AlertCircle, FileText, MessageSquare } from "lucide-react";

const ApplyJob = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ resume: "", coverLetter: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobId) return;

    setLoading(true);
    setStatus(null);

    try {
      await axiosInstance.post(`/applications/apply/${jobId}`, formData);
      setStatus({ type: "success", text: "Application submitted successfully! Redirecting..." });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err: any) {
      setStatus({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to submit application. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black text-slate-950 tracking-tighter">Apply for this role</h2>
        <p className="text-slate-500 mt-2">Your journey to a new career starts here.</p>
      </div>

      {status && (
        <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 border ${status.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-rose-50 border-rose-100 text-rose-800"}`}>
          {status.type === "success" ? <CheckCircle className="shrink-0" size={20} /> : <AlertCircle className="shrink-0" size={20} />}
          <span className="text-sm font-bold">{status.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <FileText size={14} /> Resume URL
          </label>
          <input
            type="url"
            required
            className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition"
            placeholder="https://drive.google.com/file/..."
            value={formData.resume}
            onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <MessageSquare size={14} /> Cover Letter
          </label>
          <textarea
            required
            rows={6}
            className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition resize-none"
            placeholder="Tell us why you are a perfect fit for this role..."
            value={formData.coverLetter}
            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-slate-950 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;