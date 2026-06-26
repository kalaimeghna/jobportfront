import { useState } from "react";

interface Applicant {
  _id: string;
  name: string;
  email: string;
  jobTitle: string;
  resume: string;
  status: "Pending" | "Accepted" | "Rejected";
}

const Applicants = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      jobTitle: "Frontend Developer",
      resume: "#",
      status: "Pending",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      jobTitle: "Backend Developer",
      resume: "#",
      status: "Accepted",
    },
    {
      _id: "3",
      name: "Alex Johnson",
      email: "alex@example.com",
      jobTitle: "UI/UX Designer",
      resume: "#",
      status: "Rejected",
    },
  ]);

  const updateStatus = (
    id: string,
    status: "Pending" | "Accepted" | "Rejected"
  ) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant._id === id
          ? { ...applicant, status }
          : applicant
      )
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Applicants
        </h1>

        <p className="text-gray-500 mt-2">
          Manage applications submitted for your jobs.
        </p>
      </div>

      {/* Applicants Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-4">
                  Candidate
                </th>
                <th className="text-left px-6 py-4">
                  Email
                </th>
                <th className="text-left px-6 py-4">
                  Job
                </th>
                <th className="text-left px-6 py-4">
                  Resume
                </th>
                <th className="text-left px-6 py-4">
                  Status
                </th>
                <th className="text-left px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {applicants.map((applicant) => (
                <tr
                  key={applicant._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {applicant.name}
                  </td>

                  <td className="px-6 py-4">
                    {applicant.email}
                  </td>

                  <td className="px-6 py-4">
                    {applicant.jobTitle}
                  </td>

                  <td className="px-6 py-4">
                    <a
                      href={applicant.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        applicant.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : applicant.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {applicant.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() =>
                          updateStatus(
                            applicant._id,
                            "Accepted"
                          )
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            applicant._id,
                            "Rejected"
                          )
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            applicant._id,
                            "Pending"
                          )
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                      >
                        Pending
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {applicants.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No applicants found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applicants;