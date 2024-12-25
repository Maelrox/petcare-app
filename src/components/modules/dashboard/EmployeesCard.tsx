import type { FC } from "react";

interface EmployeeCardProps {
  title: string;
  icon?: JSX.Element;
  data: { date: string; value: number }[];
}

const EmployeeCard: FC<EmployeeCardProps> = ({ title, icon, data }) => (
  <div className="bg-color_brand shadow-xl p-6 flex flex-col">
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-white text-xs font-bold flex items-center ml-2">
        {title}
      </h2>
    </div>
    <p className="text-sm font-extrabold text-white mb-3">Veterinaries: 7</p>
    <p className="text-sm font-extrabold text-white mb-3">Seller: 2</p>
    <p className="text-sm font-extrabold text-white mb-3">Managers: 2</p>
    <p className="text-sm font-extrabold text-white mb-3">Recepcionists: 3</p>

  </div>
);

export default EmployeeCard;
