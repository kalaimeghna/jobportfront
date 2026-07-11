import React from "react";

type CardColor = "blue" | "green" | "red" | "yellow";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: CardColor;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color = "blue",
  className = "",
}) => {
  const colorStyles: Record<CardColor, string> = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    red: "text-red-600 bg-red-50",
    yellow: "text-yellow-600 bg-yellow-50",
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        {icon && (
          <div className={`rounded-xl p-3 ${colorStyles[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;