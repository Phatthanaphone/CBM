import React ,{ useState,useEffect,Fragment,useRef } from "react";
import { Bar,Line,Pie,Doughnut } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {  ArcElement} from "chart.js";
import { useParams, useLocation,useNavigate } from "react-router-dom";
import ChartService from '../../services/ChartService'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import FrancisService from "../../services/FrancisService";
import { Menu, Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
Chart.register(ArcElement)

const ExitationChart = () => {
  const navigate = useNavigate();
const { unit_id } = useParams();
// const unit_id = 1
       const [data1,setData1] = useState([]);
       const [data2, setData2] = useState([])
       const [data3, setData3] = useState([])
       const [startDate, setStartDate] = useState(null);
       const [endDate, setEndDate] = useState(null);
       const [dataMessage, setDatamessage] = useState([])
      
      let result = data3.map((r) => {
         return (
          <>
            {r[0]}
          </>
         )
      })
      

      const label1 = [];
      const testhold = [];
      const labelValue = []
      const labelTesthold = []
      const labelRemark = []
 
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
        'rgba(0, 255, 0, 1)', // Bright Green
        'rgba(0, 0, 255, 1)', // Bright Blue
        'rgba(255, 255, 0, 1)', // Bright Yellow
        'rgba(255, 0, 255, 1)', // Magenta
        'rgba(0, 255, 255, 1)', // Cyan
        'rgba(128, 0, 0, 1)', // Maroon
        'rgba(0, 128, 0, 1)', // Green
        'rgba(0, 0, 128, 1)', // Navy
        'rgba(128, 128, 0, 1)', // Olive
        'rgba(128, 0, 128, 1)', // Purple
        'rgba(0, 128, 128, 1)', // Teal
        'rgba(128, 128, 128, 1)' // Gray
      ];


      const initDataTesthold =  {
        "francis_testhold_id" : 0,
        "high1" : '',
        "high2" : '',
        "high3" : '',
        "low1" : '',
        "low2" : '',
        "low3" : '',
        "unit_id" : ''
      }
      const [dataTesthold, setDataTesthold] = useState({...initDataTesthold})
      
       let high1 = []
       let high2 = []
       let high3 = []
       let low1 = []
       let low2 = []
       let low3 = []
        
       for (var i=0; i< data2.length; i++ ) {
              high1.push(dataTesthold.high1)
              high2.push(dataTesthold.high2)
              high3.push(dataTesthold.high3)
              low1.push(dataTesthold.low1)
              low2.push(dataTesthold.low2)
              low3.push(dataTesthold.low3)
       }
      
      const fetchData = async () => {
        const result = await ChartService.ExitationLine(unit_id)
        let resultTeshold = await FrancisService.getTesthold(unit_id);
        let RTesthold = resultTeshold.data
           setData1(result.data)
           setDataTesthold({...dataTesthold, francis_testhold_id : RTesthold[0].francis_testhold_id,high1: RTesthold[0].high1, high2: RTesthold[0].high2, high3: RTesthold[0].high3, low1: RTesthold[0].low1,low2: RTesthold[0].low2,
            low3: RTesthold[0].low3, unit_id : RTesthold[0].unit_id
          })
          
          for (let i = 0; i <result.data.length; i++) {
            if(!label1){
              label1 = []
              testhold = []
              labelValue = []
              labelTesthold = []
              labelRemark = []
            }

            label1.push(result.data[i].time)
            labelRemark.push(result.data[i].remark)
            var a = result.data[i].valuee.replace(/'/g, '"')
            a = JSON.parse(a)
           
            labelValue.push(a)

          }
          setData2(label1)
          setData3(labelValue)
          setDatamessage(labelRemark)
        // console.log(a)
        // console.log(label1)
       
      };
    
      const pointRadiusColor = 5
      const pointhoverRadiusColor = 10
    const data = {

            message : dataMessage,
            labels: data2 ,
          
            datasets: [
              {
                label: 'Converter1 M1',
                fill: false,
                data: data3.map((r) => {
                  return r[0]
                }),
                borderColor: "rgba(75,192,192,1)",
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
              {
                label: 'Converter1 M2',
                fill: false,
                data: data3.map((r) => {
                  return r[1]
                }),
                borderColor: borderColorValues[0],
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },

              {
                label: 'Converter1 M3',
                fill: false,
                data: data3.map((r) => {
                  return r[2]
                }),
                borderColor: borderColorValues[18],
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
              {
                label: 'Converter1 M4',
                fill: false,
                data: data3.map((r) => {
                  return r[3]
                }),
                borderColor: borderColorValues[3],
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
              {
                label: 'Converter2 M1',
                fill: false,
                data: data3.map((r) => {
                  return r[4]
                }),
                borderColor: borderColorValues[4],
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
              {
                label: 'Converter2 M2',
                fill: false,
                data: data3.map((r) => {
                  return r[5]
                }),
                borderColor: borderColorValues[5],
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
              {
                label: 'Converter2 M3',
                fill: false,
                data: data3.map((r) => {
                  return r[6]
                }),
                borderColor: borderColorValues[11],
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
              {
                label: 'Converter2 M4',
                fill: false,
                data: data3.map((r) => {
                  return r[7]
                }),
                borderColor: borderColorValues[8],
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
              {
                label: 'Converter3 M1',
                fill: false,
                data: data3.map((r) => {
                  return r[8]
                }),
                borderColor: borderColorValues[15],
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
              {
                label: 'Converter3 M2',
                fill: false,
                data: data3.map((r) => {
                  return r[9]
                }),
                borderColor: borderColorValues[10],
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
              {
                label: 'Converter3 M3',
                fill: false,
                data: data3.map((r) => {
                  return r[10]
                }),
                borderColor: borderColorValues[17],
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
              {
                label: 'Converter4 M4',
                fill: false,
                data: data3.map((r) => {
                  return r[11]
                }),
                borderColor: borderColorValues[16],
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
            
              {
                label: 'High1',
                fill: false,
                data: high1,
                borderColor: 'black',
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
              {
                label: 'High2',
                fill: false,
                data: high2,
                borderColor: 'black',
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
              {
                label: 'High3',
                fill: false,
                data: high3,
                borderColor: 'black',
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
              {
                label: 'Low1',
                fill: false,
                data: low1,
                borderColor: 'black',
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
              {
                label: 'Low2',
                fill: false,
                data: low2,
                borderColor: 'black',
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
              {
                label: 'Low3',
                fill: false,
                data: low3,
                borderColor: 'black',
                tension: 0.4,
                pointRadius: pointRadiusColor,
                pointHoverRadius: pointhoverRadiusColor,
                pointStyle: "circle",
            },
         ]
        }
 
        const initial = {
          lable :'',
          value : '',
          message : ''
        }
         const [showModal, setShowmodal] = useState(false)
         const [comment, setComment] = useState({...initial})
         const cancelButtonRef = useRef(null);
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
                    size: 16,
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
          message : data.message.filter((value, index) => {
            const date = new Date(data.labels[index])
            return (
              (startDate == null || date >= startDate) &&
              (endDate == null || date <= endDate)
            )
          })

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

        useEffect( () => {
            console.log(data2)
          fetchData().catch((error) => {
            console.log(error);
            console.log("error");
          });
              // console.log(result)
              // alert(unit_id)
        },[])
  return (
    <div>
            <button onClick={() => navigate(`/francis/${unit_id}`)}
        style={{zoom:'67%',float: "left", paddingRight: "1.5rem",marginLeft:'1.5rem',marginTop:'2rem' }}
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <ArrowLeftCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        back
      </button>
    <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
    <p style={{paddingTop: '20px',fontSize:'30px'}}>Unit {unit_id}</p>
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
      {renderModal()}
    </div>
  </div>
  </div>
  );
};

export default ExitationChart;
