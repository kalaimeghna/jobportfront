import { useState } from "react";
import { FaUpload, FaFilePdf } from "react-icons/fa";

const UploadResume = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!resume) {
      alert("Please select a resume file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);

      console.log("Uploading Resume:", resume.name);

      // Redux Example
      // await dispatch(uploadResume(formData)).unwrap();

      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-8">
          <h1 className="text-3xl font-bold">
            Upload Resume
          </h1>

          <p className="mt-2 text-blue-100">
            Upload your latest resume to apply for jobs faster.
          </p>
        </div>

        {/* Upload Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8"
        >
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
            <FaUpload
              size={50}
              className="mx-auto text-blue-600 mb-4"
            />

            <h2 className="text-xl font-semibold mb-2">
              Choose Resume File
            </h2>

            <p className="text-gray-500 mb-6">
              Supported formats: PDF, DOC, DOCX
            </p>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Selected File */}
          {resume && (
            <div className="mt-6 border rounded-lg p-4 flex items-center gap-3">
              <FaFilePdf
                className="text-red-500"
                size={24}
              />

              <div>
                <h3 className="font-medium">
                  {resume.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {(resume.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading
              ? "Uploading..."
              : "Upload Resume"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadResume;