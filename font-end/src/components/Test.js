import React, { useState, useRef, useEffect } from "react";

import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import {  ArcElement} from "chart.js";

Chart.register(ArcElement)

const Test = () => {
  const [crossPosition, setCrossPosition] = useState(null);
  const chartRef = useRef(null);

  const handleHover = (event, chartElement) => {
    if (chartElement.length > 0) {
      const { x, y } = chartElement[0]._model;
      setCrossPosition({ x, y });
    } else {
      setCrossPosition(null);
    }
  };

  const drawCrossLine = (chart) => {
    if (crossPosition) {
      const { x, y } = crossPosition;

      chart.ctx.beginPath();
      chart.ctx.moveTo(x, 0);
      chart.ctx.lineTo(x, chart.chart.height);
      chart.ctx.moveTo(0, y);
      chart.ctx.lineTo(chart.chart.width, y);
      chart.ctx.strokeStyle = "red";
      chart.ctx.stroke();
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      console.log(chartInstance)
      chartInstance.plugins = chartInstance?.plugins || {};
      chartInstance.plugins.afterDraw = [drawCrossLine];
    }
  }, [crossPosition]);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Line
        ref={chartRef}
        data={data}
        onHover={handleHover}
        options={{ responsive: true }}
      />
    </div>
  );
};

export default Test;