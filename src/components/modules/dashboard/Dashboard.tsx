import { useEffect, useState } from "react";
import BarChartWidget from "../../common/charts/BarChart";
import welcomeImage from "../../../assets/icons/menu-main-icon.png";

const Dashboard = () => {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");
    try {
      if (storedData) {
        const userData = JSON.parse(storedData);
        setUserName(userData?.userDetailsDTO?.name);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const StatCard = ({ title, value, trend }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-600 mt-1">{trend}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome{userName ? `, ${userName}` : ""}!
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Free Open Source Solution 0.9.1
              </p>
            </div>
            <img src={welcomeImage.src} alt="Menu Icon" className="w-24 h-24 mr-4" />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Customers"
            value="351"
            trend="+12.3% from last month"
          />
          <StatCard
            title="Attentions"
            value="291"
            trend="+3.2% from last week"
          />
          <StatCard
            title="Inventory Sales"
            value="12.5M"
            trend="Increased by 4.3%"
          />
          <StatCard
            title="Today Attentions"
            value="12"
            trend="+2.4% from yesterday"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="w-full">
            <BarChartWidget />
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;