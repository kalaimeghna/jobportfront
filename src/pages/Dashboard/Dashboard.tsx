import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaUsers,
  FaBuilding,
  FaChartLine,
} from "react-icons/fa";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Jobs",
      value: 24,
      icon: <FaBriefcase size={24} />,
      color: "bg-blue-500",
      link: "/dashboard/jobs",
    },
    {
      title: "Applications",
      value: 156,
      icon: <FaUsers size={24} />,
      color: "bg-green-500",
      link: "/dashboard/ats",
    },
    {
      title: "Companies",
      value: 8,
      icon: <FaBuilding size={24} />,
      color: "bg-purple-500",
      link: "/companies",
    },
    {
      title: "Analytics",
      value: "View",
      icon: <FaChartLine size={24} />,
      color: "bg-orange-500",
      link: "/dashboard/analytics",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's an overview of your job portal.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div
              className={`${stat.color} text-white w-12 h-12 rounded-lg flex items-center justify-center`}
            >
              {stat.icon}
            </div>

            <h3 className="mt-4 text-gray-500">
              {stat.title}
            </h3>

            <p className="text-3xl font-bold text-gray-800">
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent Jobs */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          Recent Jobs
        </h2>

        <div className="space-y-4">
          <div className="border-b pb-3">
            <h3 className="font-medium">
              Frontend Developer
            </h3>

            <p className="text-sm text-gray-500">
              Remote • Full Time
            </p>
          </div>

          <div className="border-b pb-3">
            <h3 className="font-medium">
              Backend Developer
            </h3>

            <p className="text-sm text-gray-500">
              Bangalore • Full Time
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              UI/UX Designer
            </h3>

            <p className="text-sm text-gray-500">
              Chennai • Hybrid
            </p>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          Recent Applications
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">
                  Candidate
                </th>
                <th className="text-left py-3">
                  Position
                </th>
                <th className="text-left py-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">John Doe</td>
                <td>Frontend Developer</td>
                <td>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    Pending
                  </span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Jane Smith</td>
                <td>Backend Developer</td>
                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Accepted
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3">Alex Johnson</td>
                <td>UI/UX Designer</td>
                <td>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    Rejected
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

export default Dashboard;