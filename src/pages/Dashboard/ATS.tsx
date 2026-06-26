import { useState } from "react";

interface Applicant {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  status: "Pending" | "Accepted" | "Rejected";
}

const ATS = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      jobTitle: "Frontend Developer",
      status: "Pending",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      jobTitle: "Backend Developer",
      status: "Accepted",
    },
    {
      id: "3",
      name: "Alex Johnson",
      email: "alex@example.com",
      jobTitle: "UI/UX Designer",
      status: "Rejected",
    },
  ]);

  const updateStatus = (
    id: string,
    status: "Pending" | "Accepted" | "Rejected"
  ) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === id
          ? { ...applicant, status }
          : applicant
      )
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">ATS Board</h1>
        <p className="text-gray-500">
          Manage job applications and candidate status.
        </p>
      </div>

      {/* ATS Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-4">Candidate</th>
                <th className="text-left px-6 py-4">Email</th>
                <th className="text-left px-6 py-4">Job</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {applicants.map((applicant) => (
                <tr
                  key={applicant.id}
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
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        applicant.status === "Accepted"
                          ? "bg-green-100 text-green-600"
                          : applicant.status === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
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
                            applicant.id,
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
                            applicant.id,
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
                            applicant.id,
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
            <div className="text-center py-8 text-gray-500">
              No applications found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATS;