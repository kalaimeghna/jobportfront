import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import { User, Mail, Lock, Loader2 } from "lucide-react";

type Role = "jobseeker" | "employer";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "jobseeker" as Role,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/auth/register", {
        name: formData.name.trim(),
        email: formData.email.toLowerCase(),
        password: formData.password,
        role: formData.role,
      });

      const { user, token } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      await login(user, token);

      const redirects: Record<string, string> = {
        employer: "/dashboard",
        jobseeker: "/jobs",
        admin: "/admin/dashboard",
      };

      navigate(redirects[user.role] || "/", { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* Branding */}
        <div className="hidden lg:flex flex-col justify-center bg-blue-600 text-white p-16">
          <h1 className="text-4xl font-black mb-6">CareerHub</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Join a thriving ecosystem of professionals and companies. Build your future, one application at a time.
          </p>
        </div>

        {/* Form */}
        <div className="p-10 md:p-14">
          <h2 className="text-2xl font-black text-slate-950">Create Account</h2>
          {error && (
            <div className="mt-6 p-4 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl border border-rose-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <InputField label="Full Name" name="name" icon={<User size={18} />} value={formData.name} onChange={handleChange} placeholder="John Doe" />
            <InputField label="Email Address" name="email" type="email" icon={<Mail size={18} />} value={formData.email} onChange={handleChange} placeholder="name@example.com" />

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Role</label>
              <div className="grid grid-cols-2 gap-3">
                {(["jobseeker", "employer"] as Role[]).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, role }))}
                    className={`py-3 rounded-xl font-bold capitalize transition ${formData.role === role ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <InputField label="Password" name="password" type="password" icon={<Lock size={18} />} value={formData.password} onChange={handleChange} placeholder="••••••••" />
            <InputField label="Confirm Password" name="confirmPassword" type="password" icon={<Lock size={18} />} value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />

            <button disabled={loading} className="w-full bg-slate-950 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2">
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? "Registering..." : "Complete Registration"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Already have an account? <Link to="/login" className="ml-1 text-blue-600 font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, type = "text", icon, value, onChange, placeholder }: any) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-3.5 text-slate-400">{icon}</div>
      <input name={name} type={type} required value={value} onChange={onChange} placeholder={placeholder} className="w-full pl-11 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition" />
    </div>
  </div>
);

export default Register;