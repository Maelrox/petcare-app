
// Updated Dashboard Component
import { useEffect, useState } from "react";
import BarChartWidget from "../../common/charts/BarChart";
import welcomeImage from "../../../assets/icons/dashboard-welcome.png";
import { getCompanyResume } from "../../../hooks/modules/useDashboard";
import type { CompanyResume } from "../../../types/DashboardType";
import { HotMetrics } from "../../common/charts/HotMetrics";
import QuickAction from "../../common/widgets/QuickAction";
import { BriefcaseBusiness, BookUser, PillBottle, Bone, HeartPulse, Headset } from "lucide-react";
import AttentionsCard from "./AttentionsCard";
import EmployeeCard from "./EmployeesCard";
import { useMeasure } from '@react-hookz/web';
import ServicesCard from "./ServicesCard";
import ProductsCard from "./ProductsCard";
import StatCard from "./StatCard";
import CompanyCard from "./CompanyCard";
import SupportCard from "./SupportCard";

const Dashboard = () => {
  const [userName, setUserName] = useState<string>();
  const [companyData, setCompanyData] = useState<CompanyResume>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [ref, bounds] = useMeasure();

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");
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
                Free Veterinary Management System 0.9.6
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-full mx-auto px-0 sm:px-0 lg:px-0 py-0">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 border-b">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 border-b">
            <div className="bg-color_brand">
              <HotMetrics data={companyData?.hotMetric} />
            </div>
            <div className="bg-color_brand">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-0.5 border-b">
            <CompanyCard
              title="Company Name"
              company={companyData?.company}
              icon={<BriefcaseBusiness className="w-6 h-6 text-white" />}
            />
            <EmployeeCard
              title="Top Employees by Role"
              data={companyData?.employeeResume}
              icon={<BookUser className="w-6 h-6 text-white" />}
            />
            <AttentionsCard
              title="Attended Consultations"
              data={companyData?.attentionResume}
              icon={<PillBottle className="w-6 h-6 text-white" />}
            />
            <ProductsCard
              title={"Hot Products"}
              data={companyData?.productResume}
              icon={<Bone className="w-6 h-6 text-white" />}
            />
            <ServicesCard
              title={"Services"}
              data={companyData?.serviceResume}
              icon={<HeartPulse className="w-6 h-6 text-white" />} />
            <SupportCard
              title="Support"
              value="Need any help contact our support team"
              icon={<Headset className="w-6 h-6 text-white" />}
            />
          </div>
        </div>

      </main>

    </div>
  );
};

export default Dashboard;
