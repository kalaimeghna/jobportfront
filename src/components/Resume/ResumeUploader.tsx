import React, { FC, useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaFileWord,
  FaTimes,
} from "react-icons/fa";

interface Props {
  onUpload: (file: File) => void;
  isUploading?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ResumeUploader: FC<Props> = ({
  onUpload,
  isUploading = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const processFile = (selectedFile?: File) => {
    if (!selectedFile) return;

    setError("");

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only PDF, DOC and DOCX files are allowed.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("Maximum file size is 5 MB.");
      return;
    }

    setFile(selectedFile);
    onUpload(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    processFile(e.dataTransfer.files[0]);
  };

  const removeFile = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    setFile(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-300 rounded-2xl p-8 bg-white cursor-pointer hover:border-blue-500 transition"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => processFile(e.target.files?.[0])}
      />

      {!file ? (
        <div className="text-center">
          <FaCloudUploadAlt className="mx-auto text-5xl text-blue-500 mb-4" />

          <h3 className="text-lg font-semibold">
            Upload Resume
          </h3>

          <p className="text-gray-500 mt-2">
            Drag & Drop or Click to Browse
          </p>

          <p className="text-sm text-gray-400 mt-1">
            PDF, DOC, DOCX (Max 5 MB)
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-4">
          {file.type === "application/pdf" ? (
            <FaFilePdf className="text-red-500 text-3xl" />
          ) : (
            <FaFileWord className="text-blue-600 text-3xl" />
          )}

          <div className="flex-1">
            <p className="font-semibold truncate">
              {file.name}
            </p>

            <p className="text-sm text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <button
            type="button"
            onClick={removeFile}
            className="text-gray-500 hover:text-red-500"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {isUploading && (
        <p className="mt-4 text-center text-blue-600 font-semibold">
          Uploading resume...
        </p>
      )}
    </div>
  );
};

export default ResumeUploader;