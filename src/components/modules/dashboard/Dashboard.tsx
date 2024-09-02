// src/components/Dashboard.tsx
import React, { useEffect, useState } from "react";
import PieChartWidget from "../../common/charts/PieChart";
import BarChartWidget from "../../common/charts/BarChart";

const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");

    try {
      if (storedData) {
        const userData = JSON.parse(storedData);
        setUserName(userData?.userDetailsDTO?.name);
      } else {
        setUserName(undefined);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      setUserName(undefined);
    }
  }, []);

  return (
    <div className="w-full m-auto bg-color_brand">
      <div className="p-4 sm:p-2">
      <h2 className="text-3xl font-semibold mb-4 text-white">
        Welcome{userName ? `, ${userName}` : ""}!
      </h2>
      <p className="text-white">
        Free Open Source Solution 0.0.1
      </p>
      </div>
      <div className="mt-4 bg-white p-5">
        <h3 className="text-xl font-semibold mb-4 text-skyblue_dark">Company Overview</h3>
        <div className="flex justify-between items-center flex-wrap gap-12">
            <BarChartWidget/>
            <PieChartWidget />
        </div>


      </div>
    </div>
  );
};

export default Dashboard;