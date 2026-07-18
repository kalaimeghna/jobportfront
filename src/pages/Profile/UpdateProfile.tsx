import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Loader2,
  Save,
  User,
  Phone,
  BookOpen,
  Briefcase,
  Code,
} from "lucide-react";

import axiosInstance from "../../api/axios";
import { UserUpdatePayload } from "../../types/job.types";

const UpdateProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    skills: "",
    experience: 0,
    education: "",
  });

  useEffect(() => {
    let isMounted = true;
    const loadProfile = async () => {
      try {
        setFetching(true);
        const { data } = await axiosInstance.get("/users/me");
        const user = data.data || data;
        if (isMounted) {
          setProfile({
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            bio: user?.bio || "",
            skills: Array.isArray(user?.skills) ? user.skills.join(", ") : "",
            experience: user?.experience || 0,
            education: user?.education || "",
          });
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        if (isMounted) setFetching(false);
      }
    };
    loadProfile();
    return () => { isMounted = false; };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload: UserUpdatePayload = {
      name: profile.name,
      phone: profile.phone,
      bio: profile.bio,
      education: profile.education,
      skills: profile.skills.split(",").map(s => s.trim()).filter(s => s !== ""),
      experience: Number(profile.experience)
    };
    try {
      await axiosInstance.put("/users/me", payload);
      alert("Profile updated successfully!");
    } catch (err: any) {
      alert("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center py-20 font-bold text-slate-400">Loading your profile...</div>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-950 tracking-tighter">Edit Profile</h1>
        <p className="text-slate-500 font-medium mt-2">Update your information to get better job matches.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-blue-500/20">
              <User size={18} className="text-slate-400" />
              <input name="name" value={profile.name} onChange={handleChange} className="w-full bg-transparent outline-none font-bold text-slate-900" required />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Phone</label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-blue-500/20">
              <Phone size={18} className="text-slate-400" />
              <input name="phone" value={profile.phone} onChange={handleChange} className="w-full bg-transparent outline-none font-bold text-slate-900" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Experience (Years)</label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-blue-500/20">
              <Briefcase size={18} className="text-slate-400" />
              <input name="experience" type="number" value={profile.experience} onChange={handleChange} className="w-full bg-transparent outline-none font-bold text-slate-900" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Education</label>
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-blue-500/20">
            <BookOpen size={18} className="text-slate-400" />
            <input name="education" value={profile.education} onChange={handleChange} className="w-full bg-transparent outline-none font-bold text-slate-900" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Skills (Comma separated)</label>
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-blue-500/20">
            <Code size={18} className="text-slate-400" />
            <input name="skills" value={profile.skills} onChange={handleChange} className="w-full bg-transparent outline-none font-bold text-slate-900" placeholder="e.g. React, Node.js, TypeScript" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Professional Bio</label>
          <textarea name="bio" rows={4} value={profile.bio} onChange={handleChange} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium" />
        </div>

        <button 
          disabled={loading} 
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 disabled:bg-slate-300"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Save Changes</>}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;