import { useState, useRef } from "react";
import { UploadCloud, FileText, X, Loader2 } from "lucide-react";
import axiosInstance from "../../api/axios";

const UploadResume = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large. Maximum allowed size is 5MB.");
        return;
      }
      setResume(file);
    }
  };

  const handleRemoveFile = () => {
    setResume(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resume) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", resume);

    try {
      await axiosInstance.put("/users/me/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Resume uploaded successfully!");
      handleRemoveFile();
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to upload resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-950 tracking-tighter">Upload Resume</h1>
        <p className="text-slate-500 font-medium mt-2">Update your document to ensure your profile is always current.</p>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
        <form onSubmit={handleSubmit}>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
          >
            <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition">
              <UploadCloud size={32} className="text-slate-400 group-hover:text-blue-600 transition" />
            </div>
            <h2 className="font-black text-slate-900 text-lg">Browse your file</h2>
            <p className="text-slate-500 text-sm mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
            <input type="file" ref={fileInputRef} accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
          </div>

          {resume && (
            <div className="mt-6 p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg text-red-500">
                  <FileText size={20} />
                </div>
                <span className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{resume.name}</span>
              </div>
              <button type="button" onClick={handleRemoveFile} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition">
                <X size={18} />
              </button>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading || !resume} 
            className="w-full mt-8 bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 disabled:bg-slate-300 disabled:shadow-none flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Save Resume"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadResume;