import type { FC } from "react";

export interface StatCardProps {
    title: string;
    value: string;
    trend: string;
}

const StatCard: FC<StatCardProps> = ({ title, value, trend }) => (
    <div className="bg-color_brand shadow-sm p-6 flex flex-col border-r">
        <h3 className="text-sm font-medium text-white_brand mb-2">{title}</h3>
        <p className="text-2xl font-bold text-white_brand">{value}</p>
        <p className="text-xs text-white_brand mt-1">{trend}</p>
    </div>
);

export default StatCard