import React, { useState, useEffect, useRef,Fragment } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { ArcElement, Tooltip, Legend } from "chart.js";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import 'chartjs-plugin-zoom'
import "react-datepicker/dist/react-datepicker.css";
import ChartService from "../../services/ChartService";
import PowerExService from "../../services/PowerExService";
import './FS6.css'
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import { Dialog } from "@headlessui/react";
import { Menu, Transition } from "@headlessui/react";
import Plot from 'react-plotly.js'
Chart.register(ArcElement, Tooltip, Legend);
const PowerExChart = () => {
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [time1, setTime1] = useState([])

    const label1 = [];
    const date = []
    for (let i = 0; i <data.length; i++) {
        if(!label1){
          label1 = []
        }
        label1.push(data[i].Minute_Value)
        date.push(data[i].Minute_Time)

      }
    const fetchData = async () => {
        const result = await PowerExService.getDataFromPowerEx()
        setData(result.data)
        console.log(result.data)
        
      };

      const dataLabel = {
        labels: date,
    
        datasets: [
          {
            label: "y051MAC337DP_PT",
            fill: false,
            data: label1 ,
            borderColor: "rgba(75,192,192,1)",
            tension: 0.4,
            pointRadius: 2,
            pointHoverRadius: 1,
            pointStyle: "circle", 
          },
        ],
      };
      const option = {
        pan: {
            enabled: true,
            mode: 'xy',
            rangeMin: {
                x: null,
                y: null,
            },
            rangeMax: {
                x:null,
                y:null,
            }
        },
        zoom: {
            enabled: true,
            mode: 'xy'
        }
      }
      useEffect(() => {
        
        fetchData().catch((error) => {
          console.log(error);
          console.log("error");
        });
      }, []);
  return (
    <div>

<div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>

<div className="" style={{zoom:'70%',display:'flex', justifyContent:'center',alignItems:'center',marginBottom:'5px'}}>



</div>
<div
className="chart-container"
style={{
display: "flex",
justifyContent: "center",
alignItems: "center",
}}
>
<Line data={dataLabel} options={option} style={{maxHeight:'700px'}} />

</div>
</div>
</div>
  );
};

export default PowerExChart;
