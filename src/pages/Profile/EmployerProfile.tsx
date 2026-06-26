import { useState } from "react";

const EmployerProfile = () => {
  const [formData, setFormData] = useState({
    companyName: "Tech Solutions Pvt Ltd",
    email: "hr@techsolutions.com",
    phone: "+91 9876543210",
    website: "https://techsolutions.com",
    location: "Pune, Maharashtra",
    industry: "Information Technology",
    description:
      "Leading software development company specializing in web and mobile applications.",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Employer Profile:", formData);

      // Redux Example
      // await dispatch(updateEmployerProfile(formData)).unwrap();

      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src="https://via.placeholder.com/120"
              alt="Company Logo"
              className="w-28 h-28 rounded-full border-4 border-white"
            />

            <div>
              <h1 className="text-3xl font-bold">
                Employer Profile
              </h1>

              <p className="text-blue-100 mt-2">
                Manage company information and recruiter details
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label className="block mb-2 font-medium">
                  Company Name
                </label>

                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-medium">
                  Company Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 font-medium">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Website */}
              <div>
                <label className="block mb-2 font-medium">
                  Website
                </label>

                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block mb-2 font-medium">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block mb-2 font-medium">
                  Industry
                </label>

                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-medium">
                Company Description
              </label>

              <textarea
                name="description"
                rows={6}
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            {/* Upload Logo */}
            <div>
              <label className="block mb-2 font-medium">
                Company Logo
              </label>

              <input
                type="file"
                accept="image/*"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading
                ? "Updating..."
                : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;