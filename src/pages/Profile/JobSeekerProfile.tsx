import React, { useState, useEffect, ChangeEvent } from "react";
import axiosInstance from "../../api/axios";
import * as Lucide from "lucide-react";

// InputField Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
}

const InputField = ({ label, icon, ...props }: InputProps) => (
  <div>
    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{label}</label>
    <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
      <span className="text-slate-400">{icon}</span>
      <input {...props} className="w-full bg-transparent outline-none text-slate-900 font-medium" />
    </div>
  </div>
);

const JobSeekerProfile = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    skills: "",
    experience: 0,
    education: "",
  });

  const [imagePreview] = useState<string>("https://ui-avatars.com/api/?name=User&background=random");

  useEffect(() => {
    let isMounted = true;
    const fetchUserProfile = async () => {
      try {
        const { data } = await axiosInstance.get("/users/me");
        const user = data.data || data;
        
        if (isMounted) {
          setFormData({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            bio: user.bio || "",
            skills: Array.isArray(user.skills) ? user.skills.join(", ") : user.skills || "",
            experience: user.experience || 0,
            education: user.education || "",
          });
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        if (isMounted) setFetching(false);
      }
    };
    fetchUserProfile();
    return () => { isMounted = false; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(",").map((s: string) => s.trim()).filter(s => s !== ""),
        experience: Number(formData.experience)
      };
      await axiosInstance.put("/users/me", payload);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (fetching) return <div className="text-center py-20 text-slate-500 font-bold">Loading your profile...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-950 tracking-tighter">My Profile</h1>
        <p className="text-slate-500 font-medium mt-2">Manage your professional information and career preferences.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Card */}
        <div className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
          <img src={imagePreview} alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-slate-50" />
          <div>
            <h3 className="font-black text-xl text-slate-950">Profile Photo</h3>
            <p className="text-slate-500 text-sm">PNG, JPG up to 5MB. Max resolution 800x800px.</p>
            <button type="button" className="mt-3 text-blue-600 font-bold text-sm hover:underline">Change Photo</button>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid md:grid-cols-2 gap-6 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
          <InputField label="Full Name" icon={<Lucide.User size={18} />} name="name" value={formData.name} onChange={handleInputChange} />
          <InputField label="Email Address" icon={<Lucide.Mail size={18} />} name="email" value={formData.email} disabled />
          <InputField label="Phone Number" icon={<Lucide.Phone size={18} />} name="phone" value={formData.phone} onChange={handleInputChange} />
          <InputField label="Education" icon={<Lucide.BookOpen size={18} />} name="education" value={formData.education} onChange={handleInputChange} />
          <div className="md:col-span-2">
            <InputField label="Experience (Years)" icon={<Lucide.Briefcase size={18} />} name="experience" type="number" value={formData.experience} onChange={handleInputChange} />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Skills (Comma separated)</label>
            <input name="skills" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={formData.skills} onChange={handleInputChange} placeholder="e.g. React, Node.js, TypeScript" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Professional Bio</label>
            <textarea name="bio" rows={4} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={formData.bio} onChange={handleInputChange} />
          </div>
        </div>

        {/* Footer */}
        <button 
          disabled={loading} 
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 disabled:bg-slate-300"
        >
          {loading ? <Lucide.Loader2 className="animate-spin" size={20} /> : "Save Profile Changes"}
        </button>
      </form>
    </div>
  );
};

export default JobSeekerProfile;