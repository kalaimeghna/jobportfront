import { useEffect, useState } from "react";
import {
  FileText,
  Download,
  Trash2,
  Loader2,
  UploadCloud,
} from "lucide-react";
import axiosInstance from "../../api/axios";

interface ResumeData {
  _id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  createdAt: string;
}

const ResumeDetails = () => {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axiosInstance.get("/resumes/my");

      if (Array.isArray(data.data) && data.data.length > 0) {
        setResume(data.data.find((r: any) => r.isDefault) || data.data[0]);
      } else {
        setResume(null);
      }
    } catch (error) {
      console.error(error);
      setResume(null);
    } finally {
      setFetching(false);
    }
  };

  const deleteResume = async () => {
    if (!resume) return;

    if (!window.confirm("Delete this resume?")) return;

    try {
      setLoading(true);

      await axiosInstance.delete(`/resumes/${resume._id}`);

      setResume(null);

      alert("Resume deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to delete resume.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-2">
          My Resume
        </h1>

        <p className="text-gray-500 mb-8">
          Manage your uploaded resume.
        </p>

        {!resume ? (
          <div className="border-2 border-dashed rounded-2xl py-16 flex flex-col items-center">

            <UploadCloud
              size={60}
              className="text-gray-400 mb-5"
            />

            <h2 className="text-xl font-semibold">
              No Resume Uploaded
            </h2>

            <p className="text-gray-500 mt-2">
              Upload your resume to apply for jobs.
            </p>

          </div>
        ) : (
          <>
            <div className="bg-gray-50 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">

              <div className="flex items-center gap-4">

                <div className="bg-red-100 p-4 rounded-xl">
                  <FileText
                    className="text-red-600"
                    size={28}
                  />
                </div>

                <div>
                  <h2 className="font-bold text-lg">
                    {resume.fileName}
                  </h2>

                  <p className="text-gray-500">
                    Uploaded on{" "}
                    {new Date(resume.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-gray-500">
                    {(resume.fileSize / 1024).toFixed(2)} KB
                  </p>

                  <p className="text-gray-500 uppercase">
                    {resume.fileType}
                  </p>
                </div>

              </div>

              <div className="flex gap-3">

                <a
                  href={resume.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
                >
                  <Download size={18} />
                  Download
                </a>

                <button
                  onClick={deleteResume}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <Trash2 size={18} />
                  )}

                  Delete
                </button>

              </div>

            </div>

            <div className="mt-8 border rounded-2xl overflow-hidden h-[700px]">

              <iframe
                src={resume.fileUrl}
                title="Resume Preview"
                className="w-full h-full"
              />

            </div>

          </>
        )}

      </div>
    </div>
  );
};

export default ResumeDetails;