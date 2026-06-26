import JobCard from "../../components/Jobs/JobCard";

interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  salary: string;
  jobType: string;
}

const RecommendedJobs = () => {
  const recommendedJobs: Job[] = [
    {
      _id: "1",
      title: "Frontend Developer",
      company: "Google",
      description:
        "Develop modern web applications using React, TypeScript, and Tailwind CSS.",
      location: "Remote",
      salary: "₹12 LPA",
      jobType: "Full Time",
    },
    {
      _id: "2",
      title: "Backend Developer",
      company: "Microsoft",
      description:
        "Build scalable REST APIs with Node.js, Express, and MongoDB.",
      location: "Bangalore",
      salary: "₹15 LPA",
      jobType: "Full Time",
    },
    {
      _id: "3",
      title: "MERN Stack Developer",
      company: "Infosys",
      description:
        "Work on enterprise-level MERN applications and cloud deployment.",
      location: "Pune",
      salary: "₹10 LPA",
      jobType: "Hybrid",
    },
    {
      _id: "4",
      title: "UI/UX Designer",
      company: "Amazon",
      description:
        "Design intuitive user experiences and responsive interfaces.",
      location: "Chennai",
      salary: "₹9 LPA",
      jobType: "Hybrid",
    },
    {
      _id: "5",
      title: "Data Analyst",
      company: "TCS",
      description:
        "Analyze large datasets and create business intelligence reports.",
      location: "Hyderabad",
      salary: "₹8 LPA",
      jobType: "Remote",
    },
    {
      _id: "6",
      title: "DevOps Engineer",
      company: "Wipro",
      description:
        "Manage CI/CD pipelines, Docker containers, and cloud infrastructure.",
      location: "Bangalore",
      salary: "₹14 LPA",
      jobType: "Full Time",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Recommended Jobs
        </h1>

        <p className="text-gray-500 mt-2">
          Personalized job recommendations based on your profile and skills.
        </p>
      </div>

      {/* Recommendations Banner */}
      <div className="bg-blue-600 text-white rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold">
          Jobs Matching Your Skills
        </h2>

        <p className="mt-2">
          We've selected these opportunities based on your experience,
          interests, and recent activity.
        </p>
      </div>

      {/* Jobs Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recommendedJobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
          />
        ))}
      </div>

      {/* Empty State Example */}
      {recommendedJobs.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No Recommendations Available
          </h2>

          <p className="text-gray-500 mt-2">
            Complete your profile and upload your resume to get personalized
            recommendations.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecommendedJobs;