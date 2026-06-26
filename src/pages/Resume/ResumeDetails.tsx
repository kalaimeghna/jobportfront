import { useState } from "react";
import { FaFilePdf, FaDownload, FaTrash } from "react-icons/fa";

const ResumeDetails = () => {
  const [resume] = useState({
    _id: "1",
    fileName: "John_Doe_Resume.pdf",
    uploadedAt: "24 June 2026",
    size: "1.8 MB",
    url: "#",
  });

  const handleDownload = () => {
    alert("Downloading Resume...");
    // window.open(resume.url, "_blank");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (confirmDelete) {
      alert("Resume Deleted Successfully");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-8">
          <h1 className="text-3xl font-bold">
            Resume Details
          </h1>

          <p className="mt-2 text-blue-100">
            View and manage your uploaded resume.
          </p>
        </div>

        {/* Resume Card */}
        <div className="p-8">
          <div className="border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <FaFilePdf
                size={50}
                className="text-red-500"
              />

              <div>
                <h2 className="text-xl font-semibold">
                  {resume.fileName}
                </h2>

                <p className="text-gray-500">
                  Uploaded: {resume.uploadedAt}
                </p>

                <p className="text-gray-500">
                  Size: {resume.size}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <FaDownload />
                Download
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">
              Resume Preview
            </h3>

            <div className="border rounded-lg overflow-hidden h-[600px]">
              <iframe
                src={resume.url}
                title="Resume Preview"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeDetails;