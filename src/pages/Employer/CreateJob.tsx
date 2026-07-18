import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";

const CreateJob: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",

    salaryMin: "",
    salaryMax: "",

    experience: "",

    skills: "",

    category: "",

    jobType: "Full-Time",
    workMode: "Onsite",

    jobLevel: "Entry",

    education: "",

    vacancies: "1",

    applicationDeadline: "",
  });


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    try {

      setLoading(true);


      const payload = {

        title: formData.title.trim(),

        description: formData.description.trim(),


        requirements:
          formData.requirements
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),


        location: formData.location.trim(),


        salaryMin: Number(formData.salaryMin),

        salaryMax: Number(formData.salaryMax),


        experience: Number(formData.experience),


        skills:
          formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),


        category:
          formData.category.trim(),


        jobType: formData.jobType,


        workMode: formData.workMode,


        jobLevel: formData.jobLevel,


        education:
          formData.education.trim(),


        vacancies:
          Number(formData.vacancies),


        applicationDeadline:
          formData.applicationDeadline || null,

      };


      console.log(
        "CREATE JOB PAYLOAD:",
        payload
      );


      const response = await axiosInstance.post(
        "/jobs",
        payload
      );


      if (response.data.success) {

        alert(
          "Job created successfully"
        );


        navigate(
          "/jobs/my"
        );

      }


    } catch (error: any) {

      console.error(
        "CREATE JOB ERROR:",
        error.response?.data || error
      );


      alert(
        error.response?.data?.message ||
        "Failed to create job"
      );


    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-8">

      <h1 className="text-3xl font-bold mb-8">
        Create New Job
      </h1>


      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >


        <div>
          <label className="font-semibold">
            Job Title
          </label>

          <input
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            placeholder="MERN Stack Developer"
          />
        </div>



        <div>
          <label className="font-semibold">
            Description
          </label>

          <textarea
            name="description"
            required
            rows={5}
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>



        <div>
          <label className="font-semibold">
            Requirements
          </label>

          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="w-full border p-3 rounded-lg"
          />
        </div>



        <div>
          <label className="font-semibold">
            Location
          </label>

          <input
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>



        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="number"
            name="salaryMin"
            placeholder="Minimum Salary"
            value={formData.salaryMin}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />


          <input
            type="number"
            name="salaryMax"
            placeholder="Maximum Salary"
            value={formData.salaryMax}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

        </div>




        <input
          type="number"
          name="experience"
          placeholder="Experience Years"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />




        <input
          name="skills"
          placeholder="React, Node.js, MongoDB"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />




        <input
          name="category"
          placeholder="Software Development"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />




        <div className="grid md:grid-cols-2 gap-4">

          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >

            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
            <option>Contract</option>

          </select>



          <select
            name="workMode"
            value={formData.workMode}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >

            <option>Onsite</option>
            <option>Remote</option>
            <option>Hybrid</option>

          </select>

        </div>





        <select
          name="jobLevel"
          value={formData.jobLevel}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >

          <option>Entry</option>
          <option>Mid</option>
          <option>Senior</option>

        </select>




        <input
          name="education"
          placeholder="B.E Computer Science"
          value={formData.education}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />




        <input
          type="number"
          min="1"
          name="vacancies"
          value={formData.vacancies}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />




        <input
          type="date"
          name="applicationDeadline"
          value={formData.applicationDeadline}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />




        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >

          {loading
            ? "Creating..."
            : "Create Job"}

        </button>


      </form>

    </div>

  );

};


export default CreateJob;