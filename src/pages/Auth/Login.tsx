import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const { data } = await axiosInstance.post(
        "/api/auth/login",
        formData
      );

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-14">

          <div className="flex items-center gap-3 mb-10">
            <Briefcase className="w-10 h-10" />
            <h1 className="text-4xl font-bold">
              Job Portal
            </h1>
          </div>

          <h2 className="text-5xl font-bold leading-tight">
            Welcome
            <br />
            Back!
          </h2>

          <p className="mt-6 text-lg text-blue-100 leading-8">
            Sign in to continue your journey.
            Apply for jobs, manage applications,
            upload resumes and connect with top
            companies.
          </p>

          <div className="mt-14 space-y-5">

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-white" />
              <span>Apply for thousands of jobs</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-white" />
              <span>Track your applications</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-white" />
              <span>Build your professional career</span>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="p-8 md:p-14">

          <div className="text-center">

            <h2 className="text-4xl font-bold text-gray-800">
              Login
            </h2>

            <p className="text-gray-500 mt-3">
              Welcome back! Please login to your account.
            </p>

          </div>

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {/* EMAIL */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>

              <div className="relative">

                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Password
              </label>

              <div className="relative">

                <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-3.5 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>
                        {/* Remember Me & Forgot Password */}

            <div className="flex items-center justify-between">

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Remember Me
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      opacity="0.25"
                    />
                    <path
                      d="M22 12a10 10 0 00-10-10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>

                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight size={20} />
                </>
              )}
            </button>

          </form>

          {/* Divider */}

          <div className="flex items-center gap-4 my-8">

            <div className="flex-1 h-px bg-gray-200" />

            <span className="text-sm text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-200" />

          </div>

          {/* Register */}

          <p className="text-center text-gray-600">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;