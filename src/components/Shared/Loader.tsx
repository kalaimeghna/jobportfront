import React, { FC } from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const Loader: FC<LoaderProps> = ({
  size = "md",
  text = "Loading...",
  fullScreen = false,
  className = "",
}) => {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-14 w-14 border-4",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`
        flex flex-col items-center justify-center gap-4
        ${
          fullScreen
            ? "fixed inset-0 z-50 bg-white/80 backdrop-blur-sm"
            : "py-10"
        }
        ${className}
      `}
    >
      <div
        className={`
          ${sizes[size]}
          rounded-full
          border
          border-gray-200
          border-t-blue-600
          animate-spin
        `}
      />

      {text && (
        <p className="text-sm font-medium text-gray-500">
          {text}
        </p>
      )}

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;