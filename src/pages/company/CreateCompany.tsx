import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";

const CreateCompany = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    industry: "",
    location: "",
    website: "",
    email: "",
    phone: "",
    companySize: "1-10", // Default value
    foundedYear: new Date().getFullYear(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "foundedYear") {
        const parsedValue = parseInt(value, 10);
        return {
          ...prev,
          [name]: isNaN(parsedValue) ? new Date().getFullYear() : parsedValue,
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/companies", formData);
      if (res.data?.success) {
        alert("Company created successfully");
        navigate("/company/manage");
      }
    } catch (error: any) {
      console.error("Create company error:", error);
      alert(error.response?.data?.message || "Failed to create company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-6">Create Company Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required className="w-full border p-3 rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full border p-3 rounded" />
        <input name="industry" placeholder="Industry" value={formData.industry} onChange={handleChange} required className="w-full border p-3 rounded" />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full border p-3 rounded" />
        <input name="website" placeholder="Website (e.g., https://example.com)" value={formData.website} onChange={handleChange} className="w-full border p-3 rounded" />
        <input name="email" type="email" placeholder="Company Email" value={formData.email} onChange={handleChange} className="w-full border p-3 rounded" />
        <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full border p-3 rounded" />
        
        {/* Dropdown for Company Size */}
        <label className="block text-sm font-medium text-gray-700">Company Size</label>
        <select
          name="companySize"
          value={formData.companySize}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="1-10">1-10 Employees</option>
          <option value="11-50">11-50 Employees</option>
          <option value="51-200">51-200 Employees</option>
          <option value="201-500">201-500 Employees</option>
          <option value="500+">500+ Employees</option>
        </select>

        <input name="foundedYear" type="number" placeholder="Founded Year" value={formData.foundedYear} onChange={handleChange} className="w-full border p-3 rounded" />
        
        <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          {loading ? "Creating..." : "Create Company"}
        </button>
      </form>
    </div>
  );
};

export default CreateCompany;