
// Updated Dashboard Component
import { useEffect, useState } from "react";
import BarChartWidget from "../../common/charts/BarChart";
import welcomeImage from "../../../assets/icons/dashboard-welcome.png";
import { getCompanyResume } from "../../../hooks/modules/useDashboard";
import type { CompanyResume, CompanyStatCardProps, StatCardProps } from "../../../types/DashboardType";
import { HotMetrics } from "../../common/charts/HotMetrics";
import QuickAction from "../../common/widgets/QuickAction";
import { BriefcaseBusiness, BookUser, PillBottle, Bone, HeartPulse, Headset } from "lucide-react";
import AttentionsCard from "./AttentionsCard";
import EmployeeCard from "./EmployeesCard";
import { useMeasure } from '@react-hookz/web';
import ServicesCard from "./ServicesCard";
import ProductsCard from "./ProductsCard";

const Dashboard = () => {
  const [userName, setUserName] = useState<string>();
  const [companyData, setCompanyData] = useState<CompanyResume>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [ref, bounds] = useMeasure();

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");
    console.log(storedData)
    try {
      if (storedData) {
        const userData = JSON.parse(storedData);
        setUserName(userData?.userDetails?.name);
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
    <div className="bg-color_brand shadow-sm p-6 flex flex-col">
      <h3 className="text-sm font-medium text-white_brand mb-2">{title}</h3>
      <p className="text-2xl font-bold text-white_brand">{value}</p>
      <p className="text-xs text-white_brand mt-1">{trend}</p>
    </div>
  );

  const CompanyCard = ({ title, value, icon }: CompanyStatCardProps) => (
    <div className="bg-gradient-to-br from-rose-600 to-color_brand shadow-xl p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xs font-bold flex items-center">
          {icon}
          {title}
        </h2>
      </div>

      <p className="text-sm font-extrabold text-white mb-3">{value}</p>
      <p className="text-sm font-extrabold text-white mb-3">Telephone: 12345678</p>
      <p className="text-sm font-extrabold text-white mb-3">Email: email@company.com</p>
      <p className="text-sm font-extrabold text-white mb-3">Address: Street #1 B45</p>
    </div>
  );

  const SupportCard = ({ title, value, icon }: CompanyStatCardProps) => (
    <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-6 shadow-lg flex flex-col">
      <h2 className="text-white text-xs font-bold flex items-center">
        {icon}
        {title}
      </h2>
      <p className="text-sm font-extrabold text-white mb-3">{value}</p>

      <div className="flex justify-center">
        <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-3 px-6 shadow-md transform transition-all hover:scale-105 hover:shadow-xl relative overflow-hidden group">
          <span className="absolute inset-0 bg-gradient-to-r from-white opacity-25 transform scale-110 group-hover:animate-shimmer"></span>
          <span className="relative z-10">Contact Support</span>
        </button>
      </div>
    </div>
  );

  const attentionsExampleData = [
    { date: "2024/12/22", value: 21 },
    { date: "2024/12/23", value: 32 },
    { date: "2024/12/24", value: 14 },
    { date: "2024/12/25", value: 30 },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white_brand">
      <div className="bg-white_brand shadow-sm">
        <div className="max-w-full mx-auto px-0 sm:px-0 lg:px-8 pt-0">
          <div className="flex items-center">
            <img src={welcomeImage.src} alt="Menu Icon" className="max-w-48 mr-0 lg:mr-4" />
            <div>
              <h1 className="text-2xl font-bold text-color_brand">
                {userName ? ` ${userName}` : ""}!
              </h1>
              <p className="text-sm text-color_brand mt-1">
                Free Veterinary Management System 0.9.5
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-full mx-auto px-0 sm:px-0 lg:px-0 py-0">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Monthly Customers"
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
            value={`${companyData?.inventorySales.currency} ${companyData?.inventorySales.amount}`}
            trend={`Increased by ${companyData?.inventoryTrend.percentage}%`}
          />
          <StatCard
            title="Today Appointments"
            value={companyData?.todayAppointments.toString() ?? "0"}
            trend={`${companyData?.todayAppointmentsTrend.percentage}% from ${companyData?.todayAppointmentsTrend.period}`}
          />
        </div>

        <div className="bg-white_brand shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-color_brand border-white_brand border">
              <HotMetrics />
            </div>
            <div className="bg-color_brand border-white_brand border">
              <BarChartWidget
                data={companyData?.chartData}
                title="Patient Statistics"
                datasetLabel="Monthly Data"
                color="#f1f1f1"
              />
            </div>
            <div className="border-white_brand border">
              <QuickAction />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-0.5 border-b-2">
            <CompanyCard
              title="Company Name"
              value="Doctor Pet"
              icon={<BriefcaseBusiness className="w-6 h-6 text-white mr-1" />}
            />
            <EmployeeCard
              title="Total Employees"
              data={attentionsExampleData}
              icon={<BookUser className="w-6 h-6 text-white mr-1" />}
            />
            <AttentionsCard
              title="Total Attentions"
              data={attentionsExampleData}
              icon={<PillBottle className="w-6 h-6 text-white mr-1" />}
            />
            <ProductsCard
              title={"Top Product"}
              data={[]}
              icon={<Bone className="w-6 h-6 text-white mr-1" />}
            />
            <ServicesCard
              title={"Services"}
              data={[]}
              icon={<HeartPulse className="w-6 h-6 text-white mr-1" />} />
            <SupportCard
              title="Support"
              value="Need any help contact our support team"
              icon={<Headset className="w-6 h-6 text-white mr-1" />}
            />
          </div>
        </div>

      </main>

    </div>
  );
};

export default Dashboard;
