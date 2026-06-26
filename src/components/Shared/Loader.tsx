import { FC } from "react";

interface Props {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const Loader: FC<Props> = ({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}) => {
  const sizeMap = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        fullScreen ? "h-screen" : "py-10"
      }`}
    >
      {/* Spinner */}
      <div
        className={`border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin ${sizeMap[size]}`}
      ></div>

      {/* Text */}
      {text && <p className="text-gray-500 text-sm">{text}</p>}
    </div>
  );
};

export default Loader;