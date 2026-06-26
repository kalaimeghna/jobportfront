import { useState } from "react";

const ManageCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    industry: "",
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("website", formData.website);
      data.append("location", formData.location);
      data.append("industry", formData.industry);

      if (logo) {
        data.append("logo", logo);
      }

      console.log("Company Data:", formData);

      // Example:
      // await dispatch(createCompany(data)).unwrap();

      alert("Company saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-2">
          Manage Company
        </h1>

        <p className="text-gray-500 mb-8">
          Create or update your company profile.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Company Name */}
          <div>
            <label className="block font-medium mb-2">
              Company Name
            </label>

            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter company name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-2">
              Description
            </label>

            <textarea
              name="description"
              required
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Describe your company"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block font-medium mb-2">
              Website
            </label>

            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="https://yourcompany.com"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Company location"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block font-medium mb-2">
              Industry
            </label>

            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Technology, Finance, Healthcare..."
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block font-medium mb-2">
              Company Logo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Preview */}
          {logo && (
            <div>
              <img
                src={URL.createObjectURL(logo)}
                alt="Logo Preview"
                className="w-32 h-32 object-contain border rounded-lg"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Saving..." : "Save Company"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageCompany;