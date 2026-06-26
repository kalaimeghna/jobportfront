import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import JobCard from "../../components/Jobs/JobCard";

const Home = () => {
  const featuredJobs = [
    {
      _id: "1",
      title: "Frontend Developer",
      company: "Google",
      description:
        "Looking for a React developer with TypeScript experience.",
      location: "Remote",
      salary: "₹12 LPA",
      jobType: "Full Time",
    },
    {
      _id: "2",
      title: "Backend Developer",
      company: "Microsoft",
      description:
        "Build scalable APIs using Node.js and MongoDB.",
      location: "Bangalore",
      salary: "₹15 LPA",
      jobType: "Full Time",
    },
    {
      _id: "3",
      title: "UI/UX Designer",
      company: "Amazon",
      description:
        "Create modern and responsive user interfaces.",
      location: "Chennai",
      salary: "₹10 LPA",
      jobType: "Hybrid",
    },
  ];

  const categories = [
    "Software Development",
    "UI/UX Design",
    "Data Science",
    "Marketing",
    "Finance",
    "Human Resources",
    "Cyber Security",
    "Cloud Computing",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Jobs */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Featured Jobs
            </h2>
            <p className="text-gray-500 mt-2">
              Discover the latest opportunities from top companies.
            </p>
          </div>

          <Link
            to="/jobs"
            className="text-blue-600 font-semibold hover:underline"
          >
            View All Jobs →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">
              Why Choose Our Platform?
            </h2>

            <p className="text-gray-500 mt-3">
              Everything you need to find your dream job or hire
              top talent.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                Thousands of Jobs
              </h3>

              <p className="text-gray-600">
                Browse jobs from startups, MNCs, and remote-first
                companies.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                Easy Applications
              </h3>

              <p className="text-gray-600">
                Apply instantly with your uploaded resume and
                profile.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                Verified Employers
              </h3>

              <p className="text-gray-600">
                Connect directly with trusted companies and
                recruiters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            Popular Categories
          </h2>

          <p className="text-gray-500 mt-3">
            Explore opportunities by category.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-white border rounded-xl p-6 text-center shadow hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="font-semibold text-gray-700">
                {category}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            <div>
              <h3 className="text-4xl font-bold">5000+</h3>
              <p className="mt-2">Jobs Posted</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">2500+</h3>
              <p className="mt-2">Companies</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">15000+</h3>
              <p className="mt-2">Candidates</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">98%</h3>
              <p className="mt-2">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Career Journey?
          </h2>

          <p className="text-gray-600 mb-8">
            Join thousands of job seekers and employers on our
            platform today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/jobs"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;