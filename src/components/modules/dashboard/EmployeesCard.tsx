import type { FC } from "react";
import type { EmployeeResume } from "../../../types/DashboardType";

interface EmployeeCardProps {
  title: string;
  icon?: JSX.Element;
  data?: EmployeeResume;
}

const EmployeeCard: FC<EmployeeCardProps> = ({ title, icon, data }) => {
  const topRoles = data?.mapTotals
    ? Object.entries(data.mapTotals)
        .slice(0, 5)
        .map(([role, count]) => ({ role, count }))
    : [];

  return (
    <div className="bg-color_brand shadow-xl p-6 flex flex-col">
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-white text-xs font-bold flex items-center ml-2">
          {title}
        </h2>
      </div>
      {topRoles.length > 0 ? (
        topRoles.map(({ role, count }) => (
          <p key={role} className="text-sm font-extrabold text-white mb-3">
            {role}: {count}
          </p>
        ))
      ) : (
        <p className="text-sm font-extrabold text-white mb-3">No roles found</p>
      )}
    </div>
  );
};

export default EmployeeCard;