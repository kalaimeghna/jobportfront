import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";

const ApplyJob = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    resume: "",
    coverLetter: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔴 Debug: ensure jobId is coming correctly
  useEffect(() => {
    console.log("Route jobId:", jobId);
  }, [jobId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // ✅ hard stop if jobId missing
      if (!jobId) {
        setError("Job ID is missing in URL");
        return;
      }

      console.log("Submitting application for jobId:", jobId);

      const response = await axiosInstance.post(
        `/api/applications/apply/${jobId}`,
        formData
      );

      console.log("Success:", response.data);

      alert("Application submitted successfully");

      navigate("/dashboard/jobs");
    } catch (err: any) {
      console.log("Apply error:", err);
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Apply for Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Resume */}
        <div>
          <label className="block font-medium mb-1">
            Resume Link
          </label>
          <input
            type="text"
            name="resume"
            value={formData.resume}
            onChange={handleChange}
            placeholder="Paste your resume URL"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block font-medium mb-1">
            Cover Letter
          </label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            placeholder="Write your cover letter..."
            className="w-full border p-2 rounded h-32"
            required
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 font-medium">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Applying..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;