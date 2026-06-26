import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResumeUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        resume: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const applicationData = new FormData();

      applicationData.append(
        "fullName",
        formData.fullName
      );
      applicationData.append("email", formData.email);
      applicationData.append("phone", formData.phone);
      applicationData.append(
        "coverLetter",
        formData.coverLetter
      );

      if (formData.resume) {
        applicationData.append(
          "resume",
          formData.resume
        );
      }

      console.log("Applying for Job:", id);

      // Example Redux
      // await dispatch(
      //   applyJob({
      //     jobId: id,
      //     data: applicationData,
      //   })
      // ).unwrap();

      alert("Application submitted successfully!");

      navigate("/jobs");
    } catch (error) {
      console.error(error);
      alert("Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2">
          Apply for Job
        </h1>

        <p className="text-gray-500 mb-8">
          Fill out the application form below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Resume */}
          <div>
            <label className="block mb-2 font-medium">
              Upload Resume
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block mb-2 font-medium">
              Cover Letter
            </label>

            <textarea
              name="coverLetter"
              rows={6}
              value={formData.coverLetter}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Tell the employer why you're a good fit..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading
              ? "Submitting..."
              : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyJob;