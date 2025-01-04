import type { FC } from "react";
import type { AttentionResume } from "../../../types/DashboardType";

interface AttentionsCardProps {
  title: string;
  icon?: JSX.Element;
  data: AttentionResume[] | undefined;
}

const AttentionsCard: FC<AttentionsCardProps> = ({ title, icon, data }) => (
  <div className="bg-color_brand shadow-xl flex flex-col p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-white text-xs font-bold flex items-center gap-2">
        {icon}
        {title}
      </h2>
    </div>
    <div className="text-white p-4">
      <table className="w-full text-left text-sm text-white">
        <thead>
          <tr>
            <th className="pb-2 border-b border-dotted text-xs font-bold">Date</th>
            <th className="pb-2 border-b border-dotted text-xs font-bold">Total</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((consultation, index) => (
            <tr key={index} className="border-b border-dotted">
              <td className="py-1 text-xs text-white">{consultation.date}</td>
              <td className="py-1 text-xs text-white font-bold">{consultation.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AttentionsCard;
