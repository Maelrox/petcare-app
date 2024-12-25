import type { FC } from "react";


interface CompanyCardProps {
  title: string;
  companyName?: string;
  icon?: JSX.Element;
}

const CompanyCard: FC<CompanyCardProps> = ({ title, companyName, icon }) => (
   <div className="bg-gradient-to-br from-rose-600 to-color_brand shadow-xl p-6 flex flex-col">
        <div className="flex items-center mb-4">
          {icon}
          <h2 className="text-white text-xs font-bold flex items-center ml-2">
            {title}
          </h2>
        </div>
  
        <p className="text-sm font-extrabold text-white mb-3">{companyName}</p>
        <p className="text-sm font-extrabold text-white mb-3">Telephone: 12345678</p>
        <p className="text-sm font-extrabold text-white mb-3">Email: email@company.com</p>
        <p className="text-sm font-extrabold text-white mb-3">Address: Street #1 B45</p>
      </div>
);

export default CompanyCard;
