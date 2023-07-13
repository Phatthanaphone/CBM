import React, { useState, useEffect, useRef,Fragment } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { ArcElement, Tooltip, Legend } from "chart.js";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ChartService from "../../services/ChartService";
import ManualService from "../../services/ManualService";
import './FS6.css'
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import { Dialog } from "@headlessui/react";
import { Menu, Transition } from "@headlessui/react";

Chart.register(ArcElement, Tooltip, Legend);
const ES6 = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();
  const { unit_id } = useParams();
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
    "rgba(0, 255, 0, 1)", // Bright Green
    "rgba(0, 0, 255, 1)", // Bright Blue
    "rgba(255, 255, 0, 1)", // Bright Yellow
    "rgba(255, 0, 255, 1)", // Magenta
    "rgba(0, 255, 255, 1)", // Cyan
    "rgba(128, 0, 0, 1)", // Maroon
    "rgba(0, 128, 0, 1)", // Green
    "rgba(0, 0, 128, 1)", // Navy
    "rgba(128, 128, 0, 1)", // Olive
    "rgba(128, 0, 128, 1)", // Purple
    "rgba(0, 128, 128, 1)", // Teal
    "rgba(128, 128, 128, 1)", // Gray
  ];

  const initDataTesthold =  {
    "FS6_testhold_id" : 0,
    "high1" : '',
    "high2" : '',
    "high3" : '',
    "low1" : '',
    "low2" : '',
    "low3" : '',
    "unit_id" : '',
     "phase" : ''
  }
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  // const [testholds, setTestholds] = useState([]);
  const [dataTesthold, setDataTesthold] = useState([])
  const [lineColors, setLineColors] = useState(
    JSON.parse(localStorage.getItem('lineColors')) || {}
  )

  const handleColorChange = (label, event) => {
    setLineColors((prevColors) => ({
      ...prevColors,
      [label]: event.target.value,
    }));
  };

  let result = data3.map((r) => {
    return <>{r[0]}</>;
  });

  const label1 = [];
  const testhold = [];
  const labelValue = [];
  const labelTesthold = [];
  const labelRemark = []

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
   
const initial = {
  lable :'',
  value : '',
  message : ''
}

const [comment, setComment] = useState({...initial})
const [showModal, setShowmodal] = useState(false)
const [dataMessage, setDatamessage] = useState([])

  const fetchData = async () => {
    const result = await ChartService.getLine(unit_id);
    let resultTeshold = await ManualService.getTesthold(unit_id);
    let RTesthold = resultTeshold.data
    // console.log(RTesthold)
    // for (let i = 0 ; i < result.)
    setDataTesthold(RTesthold)
    
 

    for (let i = 0; i < result.data.length; i++) {
      if (!label1) {
        label1 = [];
        testhold = [];
        labelValue = [];
        // labelTesthold = [];
        labelRemark = []
      }
      label1.push(result.data[i].time);
      labelRemark.push(result.data[i].remark)
      var a = result.data[i].value.replace(/'/g, '"');
      // var b = result.data[i].testhold.replace(/'/g, '"');
      a = JSON.parse(a);
      // b = JSON.parse(b);
       
      // labelTesthold.push(b);
      labelValue.push(a);
    }
    setData2(label1);
    setDatamessage(labelRemark)
    setData3(labelValue);
    // setTestholds(labelTesthold);
    // console.log(labelTesthold);
  };
      
 

  const handleDataClick = (event, elements) => {
    if (elements.length > 0) {
      const dataIndex = elements[0].index;
      const messageIndex = elements[0].index;
      const datasetIndex = elements[0].datasetIndex;
 
      const label = filteredData.labels[dataIndex];
      const message = filteredData.message[messageIndex];

      const value = filteredData.datasets[datasetIndex].data[dataIndex]
      setShowmodal(true)
      setComment({...comment, value: value, label: label, message: message})

      console.log(`Click data point : label = ${label}, value = ${value}, message= ${message}`)
    }
  }

  const options = {

    onClick: (event, elements) => {
      if (elements.length > 0) {
        const element = elements[0];
        handleDataClick(event, [element]);
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#393E41 ",
          font: {
            size: 13,
            weight: "bold",
            family: "Arial",
          },
        },
      },
      y: {
        ticks: {
          color: "#393E41  ",
          font: {
            size: 20,
            weight: "bold",
            family: "Arial",
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "My Chart Title",
        color: "#006699",
        font: {
          size: 16,
          weight: "bold",
          family: "Arial",
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


 const pointRadiusColor = 5
 const pointhoverRadiusColor = 10
  const data = {
    message : dataMessage,
    labels: data2,

    datasets: [
      {
        label: 'Pharse A gaz',
        fill: false,
        data: data3.map((r) => {
          return r[0];
        }),
        borderColor: lineColors['Pharse A gaz'] || "rgba(75,192,192,1)",
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "Pharse A Counter",
        fill: false,
        data: data3.map((r) => {
          return r[1];
        }),
        borderColor: lineColors['Pharse A Counter'] || borderColorValues[0],
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },

      {
        label: "Pharse B Gaz",
        fill: false,
        data: data3.map((r) => {
          return r[2];
        }),
        borderColor: lineColors['Pharse B Gaz'] || borderColorValues[1],
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },

      {
        label: "Pharse B Counter",
        fill: false,
        data: data3.map((r) => {
          return r[3];
        }),
        borderColor: lineColors['Pharse B Counter'] || borderColorValues[2],
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },

      {
        label: "Pharse C Gaz",
        fill: false,
        data: data3.map((r) => {
          return r[4];
        }),
        borderColor: lineColors['Pharse C Gaz'] || borderColorValues[3],
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "Pharse C Counter",
        fill: false,
        data: data3.map((r) => {
          return r[5];
        }),
        borderColor: lineColors['Pharse C Counter'] || borderColorValues[4],
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
 
 

      {
        label: "PhaseA high1",
        fill: false,
        data: PhaseA_high1,
        borderColor: lineColors['PhaseA high1'] || 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseA high2",
        fill: false,
        data: PhaseA_high2,
        borderColor: lineColors['PhaseA high2'] || 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseA high3",
        fill: false,
        data: PhaseA_high3,
        borderColor: lineColors['PhaseA high3'] || 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseA low1",
        fill: false,
        data: PhaseA_low1,
        borderColor: lineColors['PhaseA low1'] || 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseA low2",
        fill: false,
        data: PhaseA_low2,
        borderColor: lineColors['PhaseA low2'] ||'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseA low3",
        fill: false,
        data: PhaseA_low3,
        borderColor: lineColors['PhaseA low3'] || 'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseB high1",
        fill: false,
        data: PhaseB_high1,
        borderColor: lineColors['PhaseB high1'] ||'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseB high2",
        fill: false,
        data: PhaseB_high2,
        borderColor: lineColors['PhaseB high2'] ||'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseB high3",
        fill: false,
        data: PhaseB_high3,
        borderColor: lineColors['PhaseB high3'] ||'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseB low1",
        fill: false,
        data: PhaseB_low1,
        borderColor: lineColors['PhaseB low1'] ||'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseB low2",
        fill: false,
        data: PhaseB_low2,
        borderColor: lineColors['PhaseB low2'] ||'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseB low3",
        fill: false,
        data: PhaseB_low3,
        borderColor: lineColors['PhaseB low3'] ||'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseC high1",
        fill: false,
        data: PhaseC_high1,
        borderColor: lineColors['PhaseC high1'] ||'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseC high2",
        fill: false,
        data: PhaseC_high2,
        borderColor: lineColors['PhaseC high2'] ||'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseC high3",
        fill: false,
        data: PhaseC_high3,
        borderColor: lineColors['PhaseC high3'] ||'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseC low1",
        fill: false,
        data: PhaseC_low1,
        borderColor: lineColors['PhaseC low1'] ||'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseC low2",
        fill: false,
        data: PhaseC_low2,
        borderColor: lineColors['PhaseC low2'] ||'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
      {
        label: "PhaseC low3",
        fill: false,
        data: PhaseC_low3,
        borderColor: lineColors['PhaseC low3'] ||'black',
        tension: 0.4,
        pointRadius: pointRadiusColor,
        pointHoverRadius: pointhoverRadiusColor,
        pointStyle: "circle",
      },
    ],
  };

  const renderModal = () =>  {
    if (showModal) {
      return (
      <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setShowmodal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Remark
                    </Dialog.Title>
                          
                    <p className="mt-2 text-sm text-gray-700">
                      Date and Time : {comment.label}
                    </p>
                    <p className="mt-2 text-sm text-gray-700">
                      Description : {comment.message}
                    </p>
                      </div>
                          
                    </div>
                
                
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3">

                  <button
                  style={{marginTop: '15px',backgroundColor:'rgb(79 70 229)'}}
                    type="button"
                    className=" w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={() => setShowmodal(false)}
                  >
                    OK
                  </button>
                  {/* <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setShowmodal(false)}
                    ref={cancelButtonRef}
                    style={{border: '1px solid rgb(192, 192, 192)'}}
                  >
                    Cancel
                  </button> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    )
    }
  }

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
    fetchData().catch((error) => {
      console.log(error);
      console.log("error");
    });
       localStorage.setItem('lineColors', JSON.stringify(lineColors));
  }, [lineColors]);

  return (
    <div>
        
      <button onClick={() => navigate(`/automanage/${unit_id}`)}
        style={{ float: "left", paddingRight: "1.5rem",marginLeft:'1.5rem',marginTop:'2rem',zoom:'67%' }}
        type="button" 
        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <ArrowLeftCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        back
      </button>
      <div
        style={{ width: "1000px", margin: "0 auto", textAlign: "center" }}
      >
        <p className="header-content" style={{zoom:'67%'}}>Unit {unit_id}</p>

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
          <div style={{float:'right',width:'500px',paddingRight:'100px',height:'1020px',zoom:'50%',paddingTop:'0',display:'grid', gridTemplateColumns:'repeat(2, 1fr)'}}>
            {
              filteredData.datasets.map((dataset) => (
                <div key={dataset.label} style={{paddingTop:'0'}}>
                    <label style={{whiteSpace:'nowrap'}}>{dataset.label}</label>
                    <input type="color"
                    value={lineColors[dataset.label] || ''}
                    onChange={(event) => {
                      handleColorChange(dataset.label, event)
                    }}
                    />
                </div>
              ))
            }
          </div>
          <Line
            data={filteredData}
            options={options}
            style={{ maxHeight: "700px" }}
          />
          <div style={{float:'right',width:'500px',paddingLeft:'200px'}}>
          {/* <button>testing</button>
          <button>testing</button>
          <button>testing</button> */}
          </div>
          {renderModal()}
        </div>
      </div>
    </div>
  );
};

export default ES6;
