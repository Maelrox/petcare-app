import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartWidget: React.FC = () => {
  const data = {
    labels: ['Cat', 'Dog', 'Lizard', 'Chicken', 'Horse', 'Cow'],
    datasets: [
      {
        label: 'Species',
        data: [110, 94, 3, 5, 1, 0],
        backgroundColor: '#f43f5e',
        borderColor: '#e2e2e2',
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
        text: 'Chart',
      },
    },
  };

  return (
    <div className="bg-slate-50 p-4 rounded-lg shadow-md flex-1 max-h-200">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartWidget;