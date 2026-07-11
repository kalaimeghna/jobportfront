import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { Upload, X, Loader2 } from "lucide-react";
import { CreateCompanyPayload } from "../../types/job.types";

const ManageCompany: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateCompanyPayload>({
    companyName: "",
    description: "",
    website: "",
    location: "",
    industry: "",
    email: "",
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchCompany = async () => {
      try {
        const { data } = await axiosInstance.get(`/companies/${id}`);
        const company = data.data || data;
        setFormData({
          companyName: company.companyName || "",
          description: company.description || "",
          website: company.website || "",
          location: company.location || "",
          industry: company.industry || "",
          email: company.email || "",
        });
        if (company.logo) setPreviewUrl(company.logo);
      } catch {
        setErrorMessage("Failed to load company profile.");
      }
    };
    fetchCompany();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return setErrorMessage("Logo must be under 2MB.");
    
    setLogo(file);
    setPreviewUrl(URL.createObjectURL(file));
    setErrorMessage("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) payload.append(key, value as string);
      });
      if (logo) payload.append("logo", logo);

      if (id) await axiosInstance.put(`/companies/${id}`, payload);
      else await axiosInstance.post("/companies", payload);

      navigate("/companies");
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || "Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
        <h1 className="text-2xl font-black mb-8">{id ? "Edit Company" : "Register Your Company"}</h1>

        {errorMessage && (
          <div className="mb-6 p-4 bg-rose-50 text-rose-700 rounded-xl font-bold text-sm border border-rose-100">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} required />
          <InputField label="Contact Email" name="email" type="email" value={formData.email || ""} onChange={handleChange} required />
          
          <div>
            <label className="block text-xs font-bold uppercase mb-2 text-slate-500">Description</label>
            <textarea name="description" rows={4} required value={formData.description} onChange={handleChange} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField label="Website" name="website" value={formData.website || ""} onChange={handleChange} />
            <InputField label="Industry" name="industry" value={formData.industry || ""} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-2 text-slate-500">Company Logo</label>
            <label className="cursor-pointer bg-slate-50 border-2 border-dashed border-slate-200 p-4 rounded-xl flex items-center gap-3 hover:border-blue-400 transition">
              <Upload size={20} className="text-slate-400" />
              <span className="text-sm font-medium text-slate-600">Choose File</span>
              <input type="file" hidden accept="image/*" onChange={handleLogoChange} />
            </label>

            {previewUrl && (
              <div className="relative mt-4 inline-block">
                <img src={previewUrl} alt="logo" className="w-20 h-20 object-contain border rounded-lg" />
                <button type="button" onClick={() => { setPreviewUrl(null); setLogo(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md">
                  <X size={12} />
                </button>
              </div>
            )}
          </div>

          <button disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex justify-center gap-2 hover:bg-blue-700 transition">
            {loading && <Loader2 className="animate-spin" />}
            {id ? "Update Profile" : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, ...props }: any) => (
  <div>
    <label className="block text-xs font-bold uppercase mb-2 text-slate-500">{label}</label>
    <input {...props} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition" />
  </div>
);

export default ManageCompany;