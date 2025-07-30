"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ModelComparisonChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const chart = new Chart(ctx, {
          type: "radar",
          data: {
            labels: [
              "Handles Cold Start",
              "Serendipity",
              "Personalization",
              "Data Needs",
              "Transparency",
            ],
            datasets: [
              {
                label: "Content-Based",
                data: [5, 2, 4, 3, 5],
                fill: true,
                backgroundColor: "rgba(13, 148, 136, 0.2)",
                borderColor: "rgba(13, 148, 136, 0.7)",
                pointBackgroundColor: "rgba(13, 148, 136, 0.7)",
              },
              {
                label: "Collaborative",
                data: [1, 5, 5, 5, 2],
                fill: true,
                backgroundColor: "rgba(56, 189, 248, 0.2)",
                borderColor: "rgba(56, 189, 248, 0.7)",
                pointBackgroundColor: "rgba(56, 189, 248, 0.7)",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                labels: { color: "#475569" },
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
              r: {
                angleLines: { color: "#cbd5e1" },
                grid: { color: "#e2e8f0" },
                pointLabels: { font: { size: 12 }, color: "#475569" },
                ticks: { display: false },
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

export default ModelComparisonChart;
