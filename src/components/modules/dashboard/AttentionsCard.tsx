import type { FC } from "react";

interface AttentionsCardProps {
  title: string;
  icon?: JSX.Element;
  data: { date: string; value: number }[];
}

const AttentionsCard: FC<AttentionsCardProps> = ({ title, icon, data }) => (
  <div className="bg-color_brand shadow-xl flex flex-col p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-white text-xs font-bold flex items-center gap-2">
        {icon}
        {title}
      </h2>
    </div>
    <div className="bg-white p-4">
      <table className="w-full text-left text-sm text-color_brand">
        <thead>
          <tr>
            <th className="pb-2 border-b border-dotted text-xs font-bold">Date</th>
            <th className="pb-2 border-b border-dotted text-xs font-bold">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index} className="border-b border-dotted">
              <td className="py-2 text-xs text-color_brand">{entry.date}</td>
              <td className="py-2 text-xs text-color_brand font-bold">{entry.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AttentionsCard;
