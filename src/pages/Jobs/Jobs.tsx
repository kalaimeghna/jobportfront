import { Link, useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaBuilding,
} from "react-icons/fa";

const JobDetails = () => {
  const { id } = useParams();

  // Dummy Data (Replace with API/Redux Data)
  const job = {
    _id: id,
    title: "Frontend Developer",
    company: "Google",
    location: "Remote",
    salary: "₹12 LPA",
    jobType: "Full Time",
    experience: "2+ Years",
    description:
      "We are looking for a skilled Frontend Developer with strong experience in React, TypeScript, and Tailwind CSS. You will work closely with designers and backend developers to build scalable web applications.",
    responsibilities: [
      "Develop responsive web applications",
      "Write clean and maintainable code",
      "Collaborate with backend developers",
      "Optimize application performance",
    ],
    requirements: [
      "2+ years of React experience",
      "Strong JavaScript and TypeScript skills",
      "Knowledge of Redux Toolkit",
      "Experience with REST APIs",
    ],
    postedDate: "2 Days Ago",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Job Header */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          {job.title}
        </h1>

        <div className="flex flex-wrap gap-6 mt-4 text-gray-600">
          <div className="flex items-center gap-2">
            <FaBuilding />
            <span>{job.company}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaMoneyBillWave />
            <span>{job.salary}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaBriefcase />
            <span>{job.jobType}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            to={`/jobs/apply/${job._id}`}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Apply Now
          </Link>

          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
            Save Job
          </button>
        </div>
      </div>

      {/* Job Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Job Description
            </h2>

            <p className="text-gray-600 leading-7">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Responsibilities
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              {job.responsibilities.map(
                (item, index) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Requirements
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              {job.requirements.map(
                (item, index) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Right Side */}
        <div>
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">
              Job Overview
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">
                  Company
                </p>
                <p className="font-medium">
                  {job.company}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Location
                </p>
                <p className="font-medium">
                  {job.location}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Salary
                </p>
                <p className="font-medium">
                  {job.salary}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Job Type
                </p>
                <p className="font-medium">
                  {job.jobType}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Experience
                </p>
                <p className="font-medium">
                  {job.experience}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Posted
                </p>
                <p className="font-medium">
                  {job.postedDate}
                </p>
              </div>
            </div>

            <Link
              to={`/jobs/apply/${job._id}`}
              className="block mt-6 text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Apply for this Job
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;