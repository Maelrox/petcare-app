import type { FC } from "react";

interface SupportCardProps {
  title: string;
  value: string;
  icon?: JSX.Element;
}

const SupportCard: FC<SupportCardProps> = ({ title, value, icon }) => (
  <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-6 shadow-lg flex flex-col justify-between">
    <h2 className="text-white text-xs font-bold flex items-center gap-2">
      {icon}
      {title}
    </h2>
    <p className="text-sm font-extrabold text-white mb-3">{value}</p>

    <div className="flex justify-center">
      <a
        href="mailto:support@maelrox.dev"
        className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-3 px-6 shadow-md transform transition-all hover:scale-105 hover:shadow-xl relative overflow-hidden group"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-white opacity-25 transform scale-110 group-hover:animate-shimmer"></span>
        <span className="relative z-10">Contact Support</span>
      </a>
    </div>
  </div>
);

export default SupportCard;
