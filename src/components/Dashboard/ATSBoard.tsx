import React, { useState } from "react";
import ApplicantCard, { Applicant } from "./ApplicantCard";

const ATSBoard: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      _id: "1",
      name: "John Doe",
      email: "john@mail.com",
      resume: "#",
      status: "pending",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@mail.com",
      status: "accepted",
    },
    {
      _id: "3",
      name: "Alex Brown",
      email: "alex@mail.com",
      status: "rejected",
    },
  ]);

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusChange = async (
    id: string,
    newStatus: "accepted" | "rejected"
  ) => {
    setLoadingId(id);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant._id === id
            ? { ...applicant, status: newStatus }
            : applicant
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const columns = [
    {
      title: "Pending",
      status: "pending" as const,
      color: "text-yellow-600",
    },
    {
      title: "Accepted",
      status: "accepted" as const,
      color: "text-green-600",
    },
    {
      title: "Rejected",
      status: "rejected" as const,
      color: "text-red-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Applicant Tracking System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.status}>
            <h2
              className={`mb-4 text-sm font-bold uppercase ${column.color}`}
            >
              {column.title}
            </h2>

            <div className="space-y-4">
              {applicants
                .filter(
                  (applicant) => applicant.status === column.status
                )
                .map((applicant) => (
                  <ApplicantCard
                    key={applicant._id}
                    applicant={applicant}
                    onStatusChange={handleStatusChange}
                    isProcessing={loadingId === applicant._id}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ATSBoard;