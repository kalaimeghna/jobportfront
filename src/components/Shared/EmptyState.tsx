import React, { FC, ReactNode } from "react";
import Button from "../Shared/Button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;

  actionText?: string;
  onAction?: (data?: unknown) => void;
  actionData?: unknown;

  secondaryActionText?: string;
  onSecondaryAction?: () => void;

  className?: string;
}

const EmptyState: FC<EmptyStateProps> = ({
  title = "No Data Found",
  description = "There is nothing to display right now.",
  icon,

  actionText,
  onAction,
  actionData,

  secondaryActionText,
  onSecondaryAction,

  className = "",
}) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl shadow-sm p-10 text-center ${className}`}
    >
      {icon && (
        <div className="flex justify-center text-6xl text-gray-300 mb-6">
          {icon}
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-800">
        {title}
      </h2>

      <p className="mt-3 text-gray-500 max-w-md mx-auto">
        {description}
      </p>

      {(actionText || secondaryActionText) && (
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">

          {actionText && onAction && (
            <Button
              variant="primary"
              onClick={() => onAction(actionData)}
            >
              {actionText}
            </Button>
          )}

          {secondaryActionText && onSecondaryAction && (
            <Button
              variant="outline"
              onClick={onSecondaryAction}
            >
              {secondaryActionText}
            </Button>
          )}

        </div>
      )}
    </div>
  );
};

export default EmptyState;