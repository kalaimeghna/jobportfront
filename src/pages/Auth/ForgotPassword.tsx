import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      setMessage("If an account exists with this email, a password reset link has been sent.");
      setEmail("");
    } catch (err: any) {
      console.error("Forgot Password Error:", err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-3xl p-8 border border-slate-100">
        <h1 className="text-3xl font-bold text-center mb-2">Forgot Password</h1>
        <p className="text-slate-500 text-center mb-6">
          Enter your email address to receive a password reset link.
        </p>

        {message && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;