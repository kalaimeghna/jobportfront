import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import Button from "../../components/Shared/Button";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axiosInstance.post("/auth/login", formData);
      const { token, user } = data;

      if (!token || !user) throw new Error("Invalid response from server");

      // Save to localStorage and Context
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      await login(user, token);

      // Role-based redirection
      const roleRedirects: Record<string, string> = {
        admin: "/admin/dashboard",
        employer: "/dashboard",
        jobseeker: "/jobs",
      };

      navigate(roleRedirects[user.role] || "/", { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md flex flex-col gap-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-black text-slate-950">Welcome Back</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to your CareerHub account</p>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-700 text-xs font-bold p-4 rounded-xl border border-rose-100 text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition"
          />
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 py-4 font-bold text-white rounded-xl transition">
          Login
        </Button>

        <p className="text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-blue-600 hover:underline">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;