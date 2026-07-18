import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axios";

const EmployerPersonalProfile = () => {
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  headline: "",
  location: "",
  profilePicture: "",
});

const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPersonalProfile();
  }, []);

  const fetchPersonalProfile = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/users/me?t=${new Date().getTime()}`);
      setFormData(data.data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put("/users/me", formData);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile");
    }
  };
const handlePhotoUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const formDataData = new FormData();
  formDataData.append("profilePicture", file);

  try {
    setUploading(true);

    const { data } = await axiosInstance.post(
      "/users/upload-photo",
      formDataData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setFormData((prev) => ({
      ...prev,
      profilePicture: data.data.profilePicture,
    }));

    alert("Profile photo updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to upload photo");
  } finally {
    setUploading(false);
  }
};
  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-100">
      {/* Photo Section */}
      <div className="flex items-center gap-6 mb-8 p-4 border border-gray-100 rounded-xl">
        <div className="w-20 h-20 rounded-full overflow-hidden border">
  {formData.profilePicture ? (
    <img
      src={formData.profilePicture}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
      {formData.name?.charAt(0).toUpperCase()}
    </div>
  )}
</div>
        <div>
          <h2 className="font-bold text-lg">Profile Photo</h2>
          <p className="text-gray-500 text-sm">PNG, JPaG up to 5MB. Max resolution 800x800px.</p>
          <>
  <input
    ref={fileInputRef}
    type="file"
    accept="image/png,image/jpeg,image/jpg,image/webp"
    className="hidden"
    onChange={handlePhotoUpload}
  />

  <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    disabled={uploading}
    className="text-blue-600 font-semibold text-sm mt-1"
  >
    {uploading ? "Uploading..." : "Change Photo"}
  </button>
</>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Full Name</label>
          <input className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
          <input className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Phone Number</label>
          <input className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. +91..." value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Location</label>
          <input className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Headline</label>
          <input className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" value={formData.headline} onChange={e => setFormData({...formData, headline: e.target.value})} />
        </div>
      </div>

      <button 
        onClick={handleUpdate}
        className="mt-8 bg-blue-600 text-white w-full py-3 rounded-lg font-bold hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EmployerPersonalProfile;