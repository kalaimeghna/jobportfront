import { useState } from "react";
import ApplicantCard from "./ApplicantCard";

interface Applicant {
  _id: string;
  name: string;
  email: string;
  resume?: string;
  status: "pending" | "accepted" | "rejected";
}

const ATSBoard = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      _id: "1",
      name: "John Doe",
      email: "john@mail.com",
      resume: "https://example.com/resume.pdf",
      status: "pending",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@mail.com",
      resume: "",
      status: "accepted",
    },
    {
      _id: "3",
      name: "Alex Brown",
      email: "alex@mail.com",
      resume: "",
      status: "rejected",
    },
  ]);

  const updateStatus = (
    id: string,
    status: "accepted" | "rejected"
  ) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant._id === id
          ? { ...applicant, status }
          : applicant
      )
    );

    // 👉 later here you will call backend API
    console.log("Updated:", id, status);
  };

  const filterByStatus = (status: string) =>
    applicants.filter((a) => a.status === status);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">ATS Board</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pending */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-yellow-600">
            Pending
          </h2>
          <div className="space-y-3">
            {filterByStatus("pending").map((applicant) => (
              <ApplicantCard
                key={applicant._id}
                applicant={applicant}
                onStatusChange={updateStatus}
              />
            ))}
          </div>
        </div>

        {/* Accepted */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-green-600">
            Accepted
          </h2>
          <div className="space-y-3">
            {filterByStatus("accepted").map((applicant) => (
              <ApplicantCard
                key={applicant._id}
                applicant={applicant}
                onStatusChange={updateStatus}
              />
            ))}
          </div>
        </div>

        {/* Rejected */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-red-600">
            Rejected
          </h2>
          <div className="space-y-3">
            {filterByStatus("rejected").map((applicant) => (
              <ApplicantCard
                key={applicant._id}
                applicant={applicant}
                onStatusChange={updateStatus}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ATSBoard;