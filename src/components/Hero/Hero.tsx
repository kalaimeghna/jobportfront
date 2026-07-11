import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState(
    "https://illustrations.popsy.co/gray/work-from-home.svg"
  );

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
              🚀 Your Career Starts Here
            </span>

            <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Find Your
              <span className="text-blue-600"> Dream Job </span>
              Faster & Smarter
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              Discover thousands of job opportunities from leading companies.
              Apply with confidence, track your applications, and build your
              career—all in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/jobs")}
                className="px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Browse Jobs
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-8 py-4 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
              >
                Get Started
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-blue-600">500+</h2>
                <p className="text-gray-500">Jobs</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-600">100+</h2>
                <p className="text-gray-500">Companies</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-600">2K+</h2>
                <p className="text-gray-500">Candidates</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src={imageSrc}
              alt="Job Search Illustration"
              onError={() => setImageSrc("/hero-image.png")}
              className="w-full max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;