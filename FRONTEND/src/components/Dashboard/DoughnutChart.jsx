import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const DoughnutChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item._id),
    datasets: [
      {
        label: "Books Sold",
        data: data.map((item) => item.totalBooksSold),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF5733",
          "#9C27B0",
        ],
        borderColor: ["#fff", "#fff", "#fff", "#fff", "#fff"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} books`,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
      animateRotate: true,
      animateScale: true,
      delay: (context) => {
        return context.dataIndex * 700;
      },
    },
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg xl:px-0 xl:w-60 dark:bg-white">
      <div className="text-center font-semibold text-lg mb-4 text-black">
        Books Sold
      </div>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default DoughnutChart;
