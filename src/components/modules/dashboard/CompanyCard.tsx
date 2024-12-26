import type { FC } from "react";
import type { Company } from "../../../types/CompanyType";


interface CompanyCardProps {
  title: string;
  company?: Company;
  icon?: JSX.Element;
}

const CompanyCard: FC<CompanyCardProps> = ({ title, company, icon }) => (
   <div className="bg-gradient-to-br from-rose-600 to-color_brand shadow-xl p-6 flex flex-col">
        <div className="flex items-center mb-4">
          {icon}
          <h2 className="text-white text-xs font-bold flex items-center ml-2">
            {title}
          </h2>
        </div>
  
        <p className="text-sm font-extrabold text-white mb-3">{company?.name}</p>
        <p className="text-sm font-extrabold text-white mb-3">Telephone: {company?.phone}</p>
        <p className="text-sm font-extrabold text-white mb-3">Email: {company?.email}</p>
        <p className="text-sm font-extrabold text-white mb-3">Address: {company?.address}</p>
      </div>
);

export default CompanyCard;
