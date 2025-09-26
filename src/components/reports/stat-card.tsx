// src/components/ui/stat-badge.tsx
import { ReactNode } from "react";

interface StatBadgeProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: "gray" | "red" | "green" | "blue" | "amber";
  description?: string;
}

export const StatBadge = ({ 
  title, 
  value, 
  icon, 
  color = "gray", 
  description 
}: StatBadgeProps) => {
  const colorClasses = {
    gray: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20", 
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20"
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${colorClasses[color]} backdrop-blur-sm hover:bg-opacity-20 transition-colors`}>
      <div className="flex items-center gap-2">
        {icon}
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-none">{value}</span>
          <span className="text-xs opacity-75 leading-none mt-0.5">{title}</span>
        </div>
      </div>
      {description && (
        <span className="text-xs opacity-60 border-l border-current/20 pl-2 ml-1">
          {description}
        </span>
      )}
    </div>
  );
};