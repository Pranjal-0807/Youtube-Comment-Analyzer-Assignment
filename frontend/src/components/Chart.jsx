import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const Chart = () => {

  const comments = useSelector((state) => state.comments.data);

  const transformToMonthlyData = (comments) => {
    const monthCounts = {};

    comments.forEach(({ timestamp }) => {
      const month = new Date(timestamp).toLocaleString("en-US", { month: "short" });

      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });

    const sortedMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const labels = sortedMonths.filter((month) => monthCounts[month]);
    const values = labels.map((month) => monthCounts[month]);

    return { labels, values };
  }

  const monthlyData = transformToMonthlyData(comments);

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Monthly Distribution</h2>
      <div className="h-48">
        <Bar
          data={{
            labels: monthlyData.labels,
            datasets: [
              {
                label: "Comments",
                data: monthlyData.values,
                backgroundColor: "#8B5CF6",
              },
            ],
          }}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
};

export default Chart;
