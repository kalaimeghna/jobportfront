import { useState, FC } from "react";

interface Props {
  onUpload: (file: File) => void;
}

const ResumeUploader: FC<Props> = ({ onUpload }) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Only PDF allowed (you can extend later)
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed!");
      return;
    }

    setFileName(file.name);
    onUpload(file);
  };

  return (
    <div className="bg-white shadow rounded-xl p-5 flex flex-col gap-3">
      
      <h2 className="text-lg font-semibold text-gray-800">
        Upload Resume
      </h2>

      {/* Input */}
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="border p-2 rounded-lg"
      />

      {/* File Name */}
      {fileName && (
        <p className="text-sm text-green-600">
          Selected: {fileName}
        </p>
      )}

      {/* Info */}
      <p className="text-xs text-gray-500">
        Only PDF files are supported. Max recommended size: 2–5MB
      </p>
    </div>
  );
};

export default ResumeUploader;