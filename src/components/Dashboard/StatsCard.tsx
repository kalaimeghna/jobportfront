import { FC } from "react";

interface Props {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: string;
}

const StatsCard: FC<Props> = ({ title, value, icon, color = "blue" }) => {
  return (
    <div className="bg-white shadow rounded-xl p-5 flex items-center justify-between hover:shadow-md transition">
      
      {/* Left Content */}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className={`text-2xl font-bold text-${color}-600`}>
          {value}
        </h2>
      </div>

      {/* Icon */}
      {icon && (
        <div className="text-3xl text-gray-400">
          {icon}
        </div>
      )}
    </div>
  );
};

export default StatsCard;