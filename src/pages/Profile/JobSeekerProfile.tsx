import { useState } from "react";

const JobSeekerProfile = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    location: "Pune, Maharashtra",
    title: "Frontend Developer",
    skills: "React, TypeScript, Node.js, MongoDB",
    experience: "2 Years",
    education: "B.E Computer Science",
    bio: "Passionate frontend developer with experience building modern web applications using React and TypeScript.",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
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

      console.log("Profile Updated:", formData);

      // Redux Example
      // await dispatch(updateProfile(formData)).unwrap();

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src="https://via.placeholder.com/120"
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white object-cover"
            />

            <div>
              <h1 className="text-3xl font-bold">
                Job Seeker Profile
              </h1>

              <p className="text-blue-100 mt-2">
                Manage your profile and career information.
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
              {/* Name */}
              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-medium">
                  Email
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

              {/* Job Title */}
              <div>
                <label className="block mb-2 font-medium">
                  Professional Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block mb-2 font-medium">
                  Experience
                </label>

                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Skills */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Skills
                </label>

                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                  placeholder="React, Node.js, MongoDB..."
                />
              </div>

              {/* Education */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Education
                </label>

                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block mb-2 font-medium">
                  LinkedIn
                </label>

                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* GitHub */}
              <div>
                <label className="block mb-2 font-medium">
                  GitHub
                </label>

                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block mb-2 font-medium">
                About Me
              </label>

              <textarea
                name="bio"
                rows={5}
                value={formData.bio}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            {/* Profile Image */}
            <div>
              <label className="block mb-2 font-medium">
                Profile Picture
              </label>

              <input
                type="file"
                accept="image/*"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block mb-2 font-medium">
                Resume
              </label>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
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

export default JobSeekerProfile;