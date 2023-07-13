import React, { useState, useEffect } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { ArcElement } from "chart.js";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ChartService from "../../services/ChartService";
import '../css/BearingChart.css'
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './FS6.css'
Chart.register(ArcElement);

const BearingChart = () => {
  const navigate = useNavigate();
  const { unit_id } = useParams();
  // const unit_id = 1
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [dataUGB, setUGB] = useState([]);
  const [dataTGB, setTGB] = useState([]);
  const [dataLGB, setLGB] = useState([]);
  const [testholds, setTestholds] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dataTesthold, setDataTesthold] = useState([])

  const borderColorValues = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(75, 192, 192, 0.8)",
  ];

  const label1 = [];
  const labeltesthold = [];
  const labelValue = [];

  const TGB = [];
  const UGB = [];
  const LGB = [];

  let PhaseA_high1 = []
  let PhaseA_high2 = []
  let PhaseA_high3 = []
  let PhaseA_low1 = []
  let PhaseA_low2 = []
  let PhaseA_low3 = []
  let PhaseB_high1 = []
  let PhaseB_high2 = []
  let PhaseB_high3 = []
  let PhaseB_low1 = []
  let PhaseB_low2 = []
  let PhaseB_low3 = []
  let PhaseC_high1 = []
  let PhaseC_high2 = []
  let PhaseC_high3 = []
  let PhaseC_low1 = []
  let PhaseC_low2 = []
  let PhaseC_low3 = []
  
  for (var i=0; i< data2.length; i++ ) {
    PhaseA_high1.push(dataTesthold[0].high1)
    PhaseA_high2.push(dataTesthold[0].high2)
    PhaseA_high3.push(dataTesthold[0].high3)
    PhaseA_low1.push(dataTesthold[0].low1)
    PhaseA_low2.push(dataTesthold[0].low2)
    PhaseA_low3.push(dataTesthold[0].low3)
    PhaseB_high1.push(dataTesthold[1].high1)
    PhaseB_high2.push(dataTesthold[1].high2)
    PhaseB_high3.push(dataTesthold[1].high3)
    PhaseB_low1.push(dataTesthold[1].low1)
    PhaseB_low2.push(dataTesthold[1].low2)
    PhaseB_low3.push(dataTesthold[1].low3)
    PhaseC_high1.push(dataTesthold[2].high1)
    PhaseC_high2.push(dataTesthold[2].high2)
    PhaseC_high3.push(dataTesthold[2].high3)
    PhaseC_low1.push(dataTesthold[2].low1)
    PhaseC_low2.push(dataTesthold[2].low2)
    PhaseC_low3.push(dataTesthold[2].low3)
}
   
  const fetchData = async () => {
    const result = await ChartService.bearingLine(unit_id);
    let resultTeshold = await ChartService.getTesholdBearing(unit_id);
    let RTesthold = resultTeshold.data
    console.log(result.data);
    setData1(result.data);
    // console.log(result.data)
    setDataTesthold(RTesthold)
    for (let i = 0; i < result.data.length; i++) {
      if (!label1) {
        label1 = [];
        labeltesthold = [];
        labelValue = [];
        UGB = [];
        LGB = [];
        TGB = [];
      }
      label1.push(result.data[i].time);
      var a = result.data[i].UGB.replace(/'/g, '"');
      var b = result.data[i].TGB.replace(/'/g, '"');
      var c = result.data[i].LGB.replace(/'/g, '"');
      var d = result.data[i].testhold.replace(/'/g, '"');
      a = JSON.parse(a);
      b = JSON.parse(b);
      c = JSON.parse(c);
      d = JSON.parse(d);

      UGB.push(a);
      TGB.push(b);
      LGB.push(c);
      labeltesthold.push(d);
    }
    setData2(label1);
    setUGB(UGB);
    setLGB(LGB);
    setTGB(TGB);
    setTestholds(labeltesthold);
    console.log(UGB);
    // console.log(label1)
  };

  const pointRadiusColor = 5
  const pointhoverRadiusColor = 10
  const data = {
    labels: data2,

    datasets: [
      {
        label: "TGB Oil level",
        fill: false,
        data: dataTGB.map((r) => {
          return r[0];
        }),
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle", 
      },
      {
        label: "TGB Refill oil",
        fill: false,
        data: dataTGB.map((r) => {
          return r[1];
        }),
        borderColor: borderColorValues[1],
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle", // Define pointStyle as 'triangle'
      },
      {
        label: "LGB Oil level",
        fill: false,
        data: dataLGB.map((r) => {
          return r[0];
        }),
        borderColor: borderColorValues[2],
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle", // Define pointStyle as 'triangle'
      },
      {
        label: "LGB Refill Oil",
        fill: false,
        data: dataLGB.map((r) => {
          return r[1];
        }),
        borderColor: borderColorValues[4],
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle", // Define pointStyle as 'triangle'
      },
      {
        label: "UGB Oil level",
        fill: false,
        data: dataUGB.map((r) => {
          return r[0];
        }),
        borderColor: borderColorValues[5],
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle", // Define pointStyle as 'triangle'
      },
      {
        label: "UGB Refill Oil",
        fill: false,
        data: dataUGB.map((r) => {
          return r[1];
        }),
        borderColor: borderColorValues[8],
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle", // Define pointStyle as 'triangle'
      },
      {
        label: "PhaseA high1",
        fill: false,
        data: PhaseA_high1,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseA high2",
        fill: false,
        data: PhaseA_high2,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseA high3",
        fill: false,
        data: PhaseA_high3,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseA low1",
        fill: false,
        data: PhaseA_low1,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseA low2",
        fill: false,
        data: PhaseA_low2,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseA low3",
        fill: false,
        data: PhaseA_low3,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseB high1",
        fill: false,
        data: PhaseB_high1,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseB high2",
        fill: false,
        data: PhaseB_high2,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseB high3",
        fill: false,
        data: PhaseB_high3,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseB low1",
        fill: false,
        data: PhaseB_low1,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseB low2",
        fill: false,
        data: PhaseB_low2,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseB low3",
        fill: false,
        data: PhaseB_low3,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseC high1",
        fill: false,
        data: PhaseC_high1,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseC high2",
        fill: false,
        data: PhaseC_high2,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseC high3",
        fill: false,
        data: PhaseC_high3,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseC low1",
        fill: false,
        data: PhaseC_low1,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseC low2",
        fill: false,
        data: PhaseC_low2,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseC low3",
        fill: false,
        data: PhaseC_low3,
        borderColor: 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
    ],
  };

  const options = {
    scales: {
        x: {
          ticks: {
            color: '#393E41 ',
            font: {
              size: 13,
              weight: 'bold',
              family: 'Arial',
            },
          },
        },
        y: {
          ticks: {
            color: '#393E41  ',
            font: {
              size: 20,
              weight: 'bold',
              family: 'Arial',
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: 'My Chart Title',
          color: '#006699',
          font: {
            size: 16,
            weight: 'bold',
            family: 'Arial',
          },
        },
      },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
        
      tooltip: {
        intersect: false,
        
      },
      legend: {
        display: true,
      },
    },
    
  };

  const filteredData = {
    ...data,
    labels: data.labels.filter((label) => {
      const date = new Date(label);
      return (
        (startDate == null || date >= startDate) &&
        (endDate == null || date <= endDate)
      );
    }),
    datasets: data.datasets.map((dataset) => {
      return {
        ...dataset,
        data: dataset.data.filter((value, index) => {
          const date = new Date(data.labels[index]);
          return (
            (startDate == null || date >= startDate) &&
            (endDate == null || date <= endDate)
          );
        }),
      };
    }),
  };

  useEffect(() => {
    console.log(data2);
    fetchData().catch((error) => {
      console.log(error);
      console.log("error");
    });
    // console.log(result)
    // alert(unit_id)
  }, []);
  return (
    <div>
            <button onClick={() => navigate(`/bearingManual/${unit_id}`)}
        style={{ zoom:'67%',float: "left", paddingRight: "1.5rem",marginLeft:'1.5rem',marginTop:'2rem' }}
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <ArrowLeftCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        back
      </button>
      <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center", }}>
      <h1 style={{zoom:'67%'}}>Unit {unit_id}</h1>
      <div className="" style={{zoom:'70%',display:'flex', justifyContent:'center',alignItems:'center',marginBottom:'5px'}}>
    
    
    <div style={{paddingRight:'20px'}}>
      <DatePicker
      
      className="custom-datepicker"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd/MM/yyyy HH:mm"
        showTimeSelect
        placeholderText="Start Date"
        timeFormat="HH:mm"
        timeIntervals={15}
        isClearable
        
      />
      </div>
      <div style={{paddingLeft:'20px'}}>
      {/* <span className="label">End Date</span> */}
      <DatePicker
      className="custom-datepicker"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        showTimeSelect
        dateFormat="dd/MM/yyyy HH:mm"
        placeholderText="End Date"
        timeFormat="HH:mm"
        timeIntervals={15}
        isClearable
        
      />
      </div>
    </div>
      <div
        className="chart-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Line data={filteredData} options={options} style={{maxHeight:'700px'}} />
      </div>
    </div>
    </div>


  );
};

export default BearingChart;
