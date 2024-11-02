
// Updated Dashboard Component
import { useEffect, useState } from "react";
import BarChartWidget from "../../common/charts/BarChart";
import welcomeImage from "../../../assets/icons/menu-main-icon.png";
import { getCompanyResume } from "../../../hooks/useDashboard";
import type { CompanyResume, StatCardProps } from "../../../types/DashboardType";

const Dashboard = () => {
  const [userName, setUserName] = useState<string>();
  const [companyData, setCompanyData] = useState<CompanyResume>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

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

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setIsLoading(true);
        const data = await getCompanyResume();
        if (data) {
          setCompanyData(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  const StatCard = ({ title, value, trend }: StatCardProps) => (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-600 mt-1">{trend}</p>
    </div>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header section */}
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
            value={companyData?.totalCustomers.toString() ?? "0"}
            trend={`${companyData?.customersTrend.percentage}% from ${companyData?.customersTrend.period}`}
          />
          <StatCard
            title="Attentions"
            value={companyData?.totalAttentions.toString() ?? "0"}
            trend={`${companyData?.attentionsTrend.percentage}% from ${companyData?.attentionsTrend.period}`}
          />
          <StatCard
            title="Inventory Sales"
            value={`${companyData?.inventorySales.currency} ${companyData?.inventorySales.amount}M`}
            trend={`Increased by ${companyData?.inventoryTrend.percentage}%`}
          />
          <StatCard
            title="Today Appointments"
            value={companyData?.todayAppointments.toString() ?? "0"}
            trend={`${companyData?.todayAppointmentsTrend.percentage}% from ${companyData?.todayAppointmentsTrend.period}`}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="w-full">
            <BarChartWidget
              data={companyData?.chartData}
              title="Patient Statistics"
              datasetLabel="Monthly Data"
              color="#0d2b35" 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;