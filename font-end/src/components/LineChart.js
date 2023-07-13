import React, { useState, useEffect, useRef } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { ArcElement,Tooltip,Legend } from "chart.js";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ManualService from "../services/ManualService";
import ChartService from "../services/ChartService";
import {
  ArrowLeftIcon,
  PlusIcon as PlusIconOutline,
  CheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
// Chart.register(ArcElement);
Chart.register(ArcElement, Tooltip, Legend);
const LineChart = () => {
  const [crossPosition, setCrossPosition] = useState(null);
  const chartRef = useRef(null);

  const handleHover = (event, chartElement) => {
    // console.log(event)
    setCrossPosition({ x: event.clientX, y: event.clientY });
    // if (chartElement.length > 0) {
    //   const { x, y } = chartElement[0]._model;
    //   setCrossPosition({ x, y });
    // } else {
    //   setCrossPosition(null);
    // }
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

  const navigate = useNavigate();
  const { unit_id } = useParams();
  // const unit_id = 1
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [testholds, setTestholds] = useState([]);

  let result = data3.map((r) => {
    return <>{r[0]}</>;
  });
  // const dataArr1 = []
  // const value1 = [1,6,12,18,1];
  // const value2 = [2,7,13,19,12];
  // const value3 = [3,8,14,20,12];
  // const value4 = [4,9,15,21,12];
  // const value5 = [5,10,16,22,22];
  // const value6 = [6,11,17,23,21];
  // const date = ['2023-01-09','2023-01-09','2023-01-09','2023-01-13','2023/01/15']

  const label1 = [];
  const testhold = [];
  const labelValue = [];
  const labelTesthold = [];

  // for(const dataObj of data1){
  //   label1.push(dataObj.time)
  //   dataArr1.push(dataObj.valuee)
  // }

  // for(const dataObj of data1){
  //   label1.push(dataObj.week)
  //   dataArr1.push(dataObj.valuee)
  // }

  const fetchData = async () => {
    const result = await ChartService.getLine(unit_id);

    setData1(result.data);
    // console.log(result.data)

    for (let i = 0; i < result.data.length; i++) {
      if (!label1) {
        label1 = [];
        testhold = [];
        labelValue = [];
        labelTesthold = [];
      }
      label1.push(result.data[i].time);
      var a = result.data[i].value.replace(/'/g, '"');
      var b = result.data[i].testhold.replace(/'/g, '"');
      a = JSON.parse(a);
      b = JSON.parse(b);

      labelTesthold.push(b);
      labelValue.push(a);
    }
    setData2(label1);

    setData3(labelValue);
    setTestholds(labelTesthold);
    console.log(labelTesthold);
  };

  const options = {
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  const data = {
    labels: data2,

    datasets: [
      {
        label: "Pharse A gaz",
        fill: true,
        data: data3.map((r) => {
          return r[0];
        }),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
      },
      {
        label: "Pharse A Counter",
        fill: true,
        data: data3.map((r) => {
          return r[1];
        }),
        backgroundColor: "rgb(255, 255, 204)",
        borderColor: "rgb(255, 255, 102)",
        tension: 0.4,
      },

      {
        label: "Pharse B Gaz",
        fill: true,
        data: data3.map((r) => {
          return r[2];
        }),
        backgroundColor: "rgb(255, 255, 204)",
        borderColor: "rgb(119, 235, 69)",
        tension: 0.4,
      },

      {
        label: "Pharse B Counter",
        fill: true,
        data: data3.map((r) => {
          return r[3];
        }),
        backgroundColor: "rgb(255, 255, 204)",
        borderColor: "rgb(222, 66, 59)",
        tension: 0.4,
      },

      {
        label: "Pharse B Counter",
        fill: true,
        data: data3.map((r) => {
          return r[4];
        }),
        // backgroundColor: "rgb(255, 255, 204)",
        borderColor: "black",
        tension: 0.4,
      },
      {
        label: "Pharse B Counter",
        fill: true,
        data: data3.map((r) => {
          return r[5];
        }),
        // backgroundColor: "rgb(255, 255, 204)",
        borderColor: "orange",
        tension: 0.4,
      },
      {
        label: "Pharse A up",
        fill: true,
        data: testholds.map((r) => {
          return r[0];
        }),
        // backgroundColor: "rgb(255, 255, 204)",
        borderColor: "orange",
        tension: 0.4,
      },
      {
        label: "Pharse A Low",
        fill: true,
        data: testholds.map((r) => {
          return r[1];
        }),
        // backgroundColor: "rgb(255, 255, 204)",
        borderColor: "orange",
        tension: 0.4,
      },
      {
        label: "Pharse B up",
        fill: true,
        data: testholds.map((r) => {
          return r[2];
        }),
        // backgroundColor: "rgb(255, 255, 204)",
        borderColor: "orange",
        tension: 0.4,
      },
      {
        label: "Pharse B Low",
        fill: true,
        data: testholds.map((r) => {
          return r[3];
        }),
        // backgroundColor: "rgb(255, 255, 204)",
        borderColor: "orange",
        tension: 0.4,
      },
      {
        label: "Pharse C Up",
        fill: true,
        data: testholds.map((r) => {
          return r[4];
        }),
        // backgroundColor: "rgb(255, 255, 204)",
        borderColor: "orange",
        tension: 0.4,
      },
      {
        label: "Pharse C Low",
        fill: true,
        data: testholds.map((r) => {
          return r[5];
        }),
        // backgroundColor: "rgb(255, 255, 204)",
        borderColor: "orange",
        tension: 0.4,
      },
    ],
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
      console.log("error");
    });
    // console.log(result)
    // alert(unit_id)
  }, []);
  useEffect(() => {
    console.log(crossPosition);
    if (chartRef.current) {
      const chartInstance = chartRef.current;
      // console.log(chartRef.current.ctx)
      // drawCrossLine(chartRef.current);
      // chartRef.current.options.plugins.afterDraw = [drawCrossLine]
      // chartInstance.plugins = chartInstance?.plugins || {};
      // chartInstance.plugins.afterDraw = [drawCrossLine];
    }
  }, [crossPosition]);
  return (
    <div className="container-fluid ">
      <button
        type="button"
        style={{ marginTop: "50px", marginLeft: "200px", marginBottom: "20px" }}
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <ArrowLeftIcon
          style={{ marginRight: "0.6rem" }}
          className="ml-2 -mr-1 h-5 w-5"
          aria-hidden="true"
        />
      </button>

      <div
        className="container"
        style={{ width: "1200px", height: "1200px", marginTop: "6rem" }}
      >
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          {" "}
          Unit {unit_id}
        </h1>

        <Line
          ref={chartRef}
          data={data}
          onPointerMove={(e) => handleHover(e)}
          options={options}
          plugins={[
            {
              id: "drawIntersaction",
              afterDraw: function (chart, easing) {
                if (chart.tooltip._active && chart.tooltip._active.length) {
                  const activePoint = chart.controller.tooltip._active[0];
                  const ctx = chart.ctx;
                  const x = activePoint.tooltipPosition().x;
                  const topY = chart.scales["y-axis-0"].top;
                  const bottomY = chart.scales["y-axis-0"].bottom;
                  ctx.save();
                  ctx.beginPath();
                  ctx.moveTo(x, topY);
                  ctx.lineTo(x, bottomY);
                  ctx.lineWidth = 2;
                  ctx.strokeStyle = "#e23fa9";
                  ctx.stroke();
                  ctx.restore();
                }
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default LineChart;
