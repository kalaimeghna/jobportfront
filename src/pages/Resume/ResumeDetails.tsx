import { useEffect, useState } from "react";
import { FileText, Download, Trash2, Loader2, UploadCloud } from "lucide-react";
import axiosInstance from "../../api/axios";

interface ResumeData {
  _id: string;
  fileName: string;
  uploadedAt: string;
  size: string;
  url: string;
}

const ResumeDetails = () => {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data } = await axiosInstance.get("/users/resume");
        setResume(data.data);
      } catch (err) {
        console.error("No resume found:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchResume();
  }, []);

  const handleDelete = async () => {
    if (!resume) return;
    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    setLoading(true);
    try {
      await axiosInstance.delete(`/users/resume/${resume._id}`);
      setResume(null);
    } catch (err) {
      alert("Failed to delete resume.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center py-20 text-slate-400 font-bold">Loading document...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-950 tracking-tighter">My Resume</h1>
        <p className="text-slate-500 font-medium mt-2">Manage your uploaded career documents.</p>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-8">
        {resume ? (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white rounded-2xl shadow-sm text-red-500">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="font-black text-slate-900">{resume.fileName}</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    Uploaded: {new Date(resume.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <a href={resume.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl font-bold text-sm text-slate-700 hover:text-blue-600 transition border border-slate-200">
                  <Download size={16} /> Download
                </a>
                <button onClick={handleDelete} disabled={loading} className="flex items-center gap-2 bg-rose-50 text-rose-600 px-5 py-3 rounded-xl font-bold text-sm hover:bg-rose-100 transition">
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
                  Delete
                </button>
              </div>
            </div>

            {/* Preview Container */}
            <div className="h-[600px] w-full bg-slate-100 rounded-3xl border-4 border-slate-50 overflow-hidden shadow-inner">
              <iframe src={resume.url} title="Resume Preview" className="w-full h-full border-none" />
            </div>
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl">
            <UploadCloud size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="font-black text-slate-900 text-lg">No resume uploaded</h3>
            <p className="text-slate-500 mt-2 font-medium">Upload a file to showcase your skills to employers.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeDetails;