import { CalendarCheck, Flame, TrendingUp } from "lucide-react";
import { QuickActionCard } from "../card/quickActionCard";
import type { Hotmetric } from "../../../types/DashboardType";

interface HotmetricProps {
    data: Hotmetric | undefined;
  }

export const HotMetrics: React.FC<HotmetricProps> = ({data}) => {
    return (
        <div className="bg-gradient-to-br from-rose-600 to-orange-600 p-6 h-full flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl font-bold flex items-center">
                    <Flame className="mr-2" size={24} />
                    Hot Metrics
                </h2>
                <TrendingUp className="text-white" size={24} />
            </div>

            <div className="space-y-3">
                <QuickActionCard
                    icon={<CalendarCheck size={20} className="text-white" />}
                    title="Peak Hours"
                    description={data?.peakHours || "Not enough consultations this months"}
                    color="bg-white/20"
                />
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                        <p className="text-white text-sm">High Traffic</p>
                        <p className="text-white text-lg font-bold">{data?.highTraffic || 0}%</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                        <p className="text-white text-sm">Last Day Consultations</p>
                        <p className="text-white text-lg font-bold">{data?.consultations || 0}</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 