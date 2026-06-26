import { FC } from "react";

interface Props {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState: FC<Props> = ({
  title = "No Data Found",
  description = "There is nothing to show here right now.",
  icon,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-xl shadow">
      
      {/* Icon */}
      {icon && (
        <div className="text-gray-400 text-5xl mb-4">
          {icon}
        </div>
      )}

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-700">
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-500 mt-2 text-sm max-w-md">
        {description}
      </p>

      {/* Action Button */}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;