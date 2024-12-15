import { CalendarCheck, Flame, TrendingUp } from "lucide-react";
import { QuickActionCard } from "../card/quickActionCard";

export const HotMetrics = () => {

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
                    description="11 AM - 2 PM"
                    color="bg-white/20"
                />
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                        <p className="text-white text-sm">High Traffic</p>
                        <p className="text-white text-lg font-bold">+45%</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                        <p className="text-white text-sm">Conversion</p>
                        <p className="text-white text-lg font-bold">32%</p>
                    </div>
                </div>
            </div>
        </div>
    )
} 