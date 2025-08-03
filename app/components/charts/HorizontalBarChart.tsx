"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const HorizontalBarChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "Indian",
              "Continental",
              "North Indian",
              "South Indian",
              "Italian",
              "Maharashtrian",
              "Bengali",
              "Karnataka",
              "Tamil Nadu",
              "Kerala",
            ],
            datasets: [
              {
                label: "Number of Recipes",
                data: [1157, 1020, 936, 681, 235, 173, 175, 149, 156, 163],
                backgroundColor: [
                  "rgba(59, 130, 246, 0.7)",
                  "rgba(245, 158, 11, 0.7)",
                  "rgba(239, 68, 68, 0.7)",
                  "rgba(16, 185, 129, 0.7)",
                  "rgba(107, 114, 128, 0.7)",
                  "rgba(249, 115, 22, 0.7)",
                  "rgba(217, 70, 239, 0.7)",
                  "rgba(220, 38, 38, 0.7)",
                  "rgba(22, 163, 74, 0.7)",
                  "rgba(37, 99, 235, 0.7)",
                ],
                borderColor: "#ffffff",
                borderWidth: 1,
                borderRadius: 4,
              },
            ],
          },
          options: {
            indexAxis: "y", // This makes the bar chart horizontal
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: "#334155",
                titleColor: "#FFFFFF",
                bodyColor: "#FFFFFF",
                padding: 12,
                cornerRadius: 6,
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                grid: {
                  color: "#e2e8f0",
                },
                ticks: {
                  color: "#64748b",
                },
              },
              y: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: "#334155",
                  font: {
                    weight: 500,
                  },
                },
              },
            },
          },
        });

        return () => chart.destroy();
      }
    }
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default HorizontalBarChart;
