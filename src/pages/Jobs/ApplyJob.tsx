import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import {
  Loader2,
  Send,
  CheckCircle,
  AlertCircle,
  FileText,
  MessageSquare,
} from "lucide-react";

const ApplyJob = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const [coverLetter, setCoverLetter] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeName, setResumeName] = useState("");

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Load uploaded resume automatically
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axiosInstance.get("/resume/my");

        if (
          res.data.success &&
          res.data.data &&
          res.data.data.length > 0
        ) {
          const resume =
            res.data.data.find((r: any) => r.isDefault) ||
            res.data.data[0];

          setResumeUrl(resume.fileUrl);
          setResumeName(resume.fileName);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchResume();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!jobId) return;

    if (!resumeUrl) {
      setStatus({
        type: "error",
        text: "Please upload your resume first.",
      });

      return;
    }

    try {
      setLoading(true);

      await axiosInstance.post(`/applications/apply/${jobId}`, {
        resumeUrl,
        coverLetter,
      });

      setStatus({
        type: "success",
        text: "Application submitted successfully!",
      });

      setTimeout(() => {
        navigate("/applications");
      }, 2000);
    } catch (err: any) {
      setStatus({
        type: "error",
        text:
          err.response?.data?.message ||
          "Application failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black">
          Apply for this Job
        </h2>

        <p className="text-slate-500 mt-2">
          Submit your application below.
        </p>
      </div>

      {status && (
        <div
          className={`mb-6 p-4 rounded-xl flex gap-2 items-center ${
            status.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}

          {status.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-lg border p-8 space-y-6"
      >
        {/* Resume */}

        <div>
          <label className="block text-sm font-bold mb-2">
            Resume
          </label>

          <div className="border rounded-xl p-4 flex items-center gap-3 bg-slate-50">
            <FileText className="text-blue-600" />

            {resumeName ? (
              <span className="font-medium">
                {resumeName}
              </span>
            ) : (
              <span className="text-red-500">
                No resume uploaded
              </span>
            )}
          </div>

          {!resumeName && (
            <p className="text-sm text-red-500 mt-2">
              Upload your resume before applying.
            </p>
          )}
        </div>

        {/* Cover Letter */}

        <div>
          <label className="block text-sm font-bold mb-2">
            Cover Letter
          </label>

          <textarea
            rows={6}
            required
            value={coverLetter}
            onChange={(e) =>
              setCoverLetter(e.target.value)
            }
            placeholder="Write your cover letter..."
            className="w-full border rounded-xl p-4 resize-none focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        <button
          disabled={loading || !resumeUrl}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 disabled:bg-gray-400"
        >
          {loading ? (
            <>
              <Loader2
                className="animate-spin"
                size={20}
              />
              Applying...
            </>
          ) : (
            <>
              <Send size={18} />
              Apply Now
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;