import { useState } from "react";

const ApplyJob = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const validate = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      return "Please fill all required fields";
    }
    if (!resume) {
      return "Please upload your resume";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      // Step 1: Upload resume
      const formDataFile = new FormData();
      formDataFile.append("file", resume as File);

      const resumeRes = await fetch("http://localhost:5000/api/resumes", {
        method: "POST",
        body: formDataFile,
        credentials: "include",
      });

      const resumeData = await resumeRes.json();

      if (!resumeRes.ok) {
        throw new Error(resumeData.message || "Resume upload failed");
      }

      const jobId = window.location.pathname.split("/").pop();

      // Step 2: Apply for job
      const applyRes = await fetch(
        `http://localhost:5000/api/applications/${jobId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            coverLetter: formData.coverLetter,
            resumeUrl: resumeData.fileUrl,
          }),
        }
      );

      const applyData = await applyRes.json();

      if (!applyRes.ok) {
        throw new Error(applyData.message || "Application failed");
      }

      setMessage("Application submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        coverLetter: "",
      });
      setResume(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-2">Job Portal</h1>
        <h2 className="text-lg text-center text-gray-600 mb-6">
          Apply for Job
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Fill out the application form below.
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Enter your name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Resume */}
          <div>
            <label className="block mb-1 font-medium">Upload Resume</label>
            <input type="file" onChange={handleFileChange} />
          </div>

          {/* Cover Letter */}
          <textarea
            name="coverLetter"
            placeholder="Tell the employer why you're a good fit..."
            value={formData.coverLetter}
            onChange={handleChange}
            className="w-full p-2 border rounded h-32"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 Job Portal. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ApplyJob;