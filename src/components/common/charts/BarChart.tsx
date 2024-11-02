import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import type { BarChartWidgetProps } from '../../../types/BartChartTypes';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartWidget: React.FC<BarChartWidgetProps> = ({
  data = [],
  title = 'Chart',
  color = '#f43f5e',
  datasetLabel = 'Data'
}) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: datasetLabel,
        data: data.map(item => item.value),
        backgroundColor: color,
        borderColor: '#e2e2e2',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          padding: 8,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 8,
        },
      },
    },
  };

  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-50 p-4 rounded-lg shadow-md flex-1 h-64 flex items-center justify-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 p-4 rounded-lg shadow-md flex-1" style={{ height: '400px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChartWidget;