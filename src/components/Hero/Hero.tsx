import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Find Your Dream Job <br />
            <span className="text-blue-600">Faster & Smarter</span>
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Explore thousands of job opportunities from top companies and apply instantly with your profile.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate("/jobs")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse Jobs
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://illustrations.popsy.co/gray/work-from-home.svg"
            alt="Hero"
            className="w-full max-w-md"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;