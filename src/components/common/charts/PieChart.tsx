// src/components/PieChartWidget.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartWidget: React.FC = () => {
  const data = {
    labels: ['Cats', 'Dogs', 'Birds', 'Others'],
    datasets: [
      {
        label: 'Pet Types',
        data: [10, 20, 30, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
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
        text: 'Pet Type Distribution',
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex-1 max-h-72 lg:max-h-96">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartWidget;