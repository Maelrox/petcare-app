import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartWidget: React.FC = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: '#50b0ec',
        borderColor: '#ff9e6b',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Sales Chart',
      },
    },
  };

  return (
    <div className="bg-slate-50 p-4 rounded-lg shadow-md flex-1 max-h-72 lg:max-h-96">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartWidget;