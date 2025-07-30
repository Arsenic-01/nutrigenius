"use client";

import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";

Chart.register(...registerables);

const DataSourcesChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "Recipe1M+",
              "Food.com",
              "Kaggle Indian",
              "Bon Happetee API",
              "Web Scraped",
            ],
            datasets: [
              {
                label: "Number of Recipes (Log Scale)",
                data: [6, 5.4, 4, 4.5, 3],
                backgroundColor: [
                  "rgba(13, 148, 136, 0.7)",
                  "rgba(56, 189, 248, 0.7)",
                  "rgba(16, 185, 129, 0.7)",
                  "rgba(244, 63, 94, 0.7)",
                  "rgba(139, 92, 246, 0.7)",
                ],
                borderRadius: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: "y",
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "#334155",
                titleColor: "#FFFFFF",
                bodyColor: "#FFFFFF",
                padding: 12,
                cornerRadius: 6,
              },
            },
            scales: {
              y: {
                ticks: { color: "#475569" },
                grid: { color: "#e2e8f0" },
              },
              x: {
                ticks: { color: "#475569" },
                grid: { display: false },
                title: {
                  display: true,
                  text: "Relative Size (Logarithmic Scale)",
                  color: "#475569",
                },
              },
            },
          },
        });
        // When the component unmounts, destroy the chart to prevent memory leaks
        return () => chart.destroy();
      }
    }
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default DataSourcesChart;
