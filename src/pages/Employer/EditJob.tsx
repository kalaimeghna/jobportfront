import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";

const EditJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",

    location: "",

    salaryMin: "",
    salaryMax: "",

    experience: "",

    skills: "",

    jobType: "Full-Time",

    workMode: "Onsite",

    category: "",

    jobLevel: "Entry",

    education: "",

    vacancies: "1",

    applicationDeadline: "",
  });

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const { data } = await axiosInstance.get(`/jobs/${id}`);

      const job = data.data || data.job || data;

      setFormData({
        title: job.title || "",
        description: job.description || "",
        requirements: job.requirements || "",

        location: job.location || "",

        salaryMin: job.salaryMin?.toString() || "",
        salaryMax: job.salaryMax?.toString() || "",

        experience: job.experience?.toString() || "",

        skills: Array.isArray(job.skills)
          ? job.skills.join(", ")
          : "",

        jobType: job.jobType || "Full-Time",

        workMode: job.workMode || "Onsite",

        category: job.category || "",

        jobLevel: job.jobLevel || "Entry",

        education: job.education || "",

        vacancies: job.vacancies?.toString() || "1",

        applicationDeadline: job.applicationDeadline
          ? job.applicationDeadline.substring(0, 10)
          : "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to load job.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,

        location: formData.location,

        salaryMin: Number(formData.salaryMin),
        salaryMax: Number(formData.salaryMax),

        experience: Number(formData.experience),

        skills: formData.skills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        jobType: formData.jobType,

        workMode: formData.workMode,

        category: formData.category,

        jobLevel: formData.jobLevel,

        education: formData.education,

        vacancies: Number(formData.vacancies),

        applicationDeadline:
          formData.applicationDeadline || null,
      };

      const { data } = await axiosInstance.put(
        `/jobs/${id}`,
        payload
      );

      if (data.success) {
        alert("Job updated successfully.");
        navigate("/jobs/my");
      }
    } catch (err: any) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Failed to update job."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-8 mt-8">

      <h1 className="text-3xl font-bold mb-8">
        Edit Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>
          <label className="font-semibold block mb-2">
            Job Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Description
          </label>

          <textarea
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Requirements
          </label>

          <textarea
            rows={4}
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="font-semibold block mb-2">
              Minimum Salary
            </label>

            <input
              type="number"
              name="salaryMin"
              value={formData.salaryMin}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Maximum Salary
            </label>

            <input
              type="number"
              name="salaryMax"
              value={formData.salaryMax}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

        </div>

        <div>
          <label className="font-semibold block mb-2">
            Experience
          </label>

          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Skills
          </label>

          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="font-semibold block mb-2">
              Job Type
            </label>

            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
              <option>Contract</option>
              <option>Freelance</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Work Mode
            </label>

            <select
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option>Onsite</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>

        </div>

        <div>
          <label className="font-semibold block mb-2">
            Job Level
          </label>

          <select
            name="jobLevel"
            value={formData.jobLevel}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Entry</option>
            <option>Mid</option>
            <option>Senior</option>
          </select>
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Education
          </label>

          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Vacancies
          </label>

          <input
            type="number"
            name="vacancies"
            value={formData.vacancies}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Application Deadline
          </label>

          <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="flex gap-4">

          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {saving ? "Updating..." : "Update Job"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/jobs/my")}
            className="px-6 py-3 border rounded-lg"
          >
            Cancel
          </button>

        </div>

      </form>
    </div>
  );
};

export default EditJob;