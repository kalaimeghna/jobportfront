import { FaBriefcase, FaUsers, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Analytics = () => {
  const stats = [
    {
      title: "Total Jobs",
      value: 24,
      icon: <FaBriefcase className="text-blue-600 text-2xl" />,
      bg: "bg-blue-100",
    },
    {
      title: "Applications",
      value: 156,
      icon: <FaUsers className="text-green-600 text-2xl" />,
      bg: "bg-green-100",
    },
    {
      title: "Accepted",
      value: 42,
      icon: <FaCheckCircle className="text-emerald-600 text-2xl" />,
      bg: "bg-emerald-100",
    },
    {
      title: "Rejected",
      value: 18,
      icon: <FaTimesCircle className="text-red-600 text-2xl" />,
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Analytics Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Overview of jobs, applications, and hiring performance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.bg}`}
            >
              {item.icon}
            </div>

            <h3 className="mt-4 text-gray-500 text-sm">
              {item.title}
            </h3>

            <p className="text-3xl font-bold text-gray-800 mt-1">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          Recent Activity
        </h2>

        <div className="space-y-4">
          <div className="border-b pb-3">
            <p className="font-medium">
              New application received for Frontend Developer
            </p>
            <span className="text-sm text-gray-500">
              2 hours ago
            </span>
          </div>

          <div className="border-b pb-3">
            <p className="font-medium">
              Backend Developer job posted
            </p>
            <span className="text-sm text-gray-500">
              Yesterday
            </span>
          </div>

          <div>
            <p className="font-medium">
              Candidate accepted for UI/UX Designer role
            </p>
            <span className="text-sm text-gray-500">
              2 days ago
            </span>
          </div>
        </div>
      </div>

      {/* Top Jobs */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          Top Performing Jobs
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Job Title</th>
                <th className="text-left py-3">Applications</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">Frontend Developer</td>
                <td>56</td>
                <td>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Backend Developer</td>
                <td>43</td>
                <td>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3">UI/UX Designer</td>
                <td>29</td>
                <td>
                  <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                    Closing Soon
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;