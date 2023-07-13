import React ,{ useState,useEffect } from "react";
import { Bar,Line,Pie,Doughnut } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {  ArcElement} from "chart.js";
import { useParams, useLocation,useNavigate } from "react-router-dom";
import ManualService from '../services/ManualService'
import ChartService from '../services/ChartService'

Chart.register(ArcElement)

const DoughnutChart = () => {
  const navigate = useNavigate();
const { unit_id } = useParams();
// const unit_id = 1
       const [data1,setData1] = useState([]);
       const [data2, setData2] = useState([])
       const [data3, setData3] = useState([])
      
      let result = data3.map((r) => {
         return (
          <>
            {r[0]}
          </>
         )
      })
      // const dataArr1 = []
      // const value1 = [1,6,12,18,1];
      // const value2 = [2,7,13,19,12];
      // const value3 = [3,8,14,20,12];
      // const value4 = [4,9,15,21,12];
      // const value5 = [5,10,16,22,22];
      // const value6 = [6,11,17,23,21];
      // const date = ['2023-01-09','2023-01-09','2023-01-09','2023-01-13','2023/01/15']
      

      const label1 = [];
      const labelValue = []
      const labelValueAll = []
 
      


      
      // for(const dataObj of data1){
      //   label1.push(dataObj.time)
      //   dataArr1.push(dataObj.valuee)
      // }

      // for(const dataObj of data1){
      //   label1.push(dataObj.week)
      //   dataArr1.push(dataObj.valuee)
      // }


      const fetchData = async () => {
        const result = await ChartService.getLine(unit_id)
        
           setData1(result.data)
          // console.log(result.data)

          for (let i = 0; i <result.data.length; i++) {
            if(!label1){
              label1 = []
              labelValue = []
            }
            label1.push(result.data[i].time)
            var a = result.data[i].value.replace(/'/g, '"')
            a = JSON.parse(a)
            
            labelValue.push(a)
            

          }
          setData2(label1)
          console.log(label1)
          setData3(labelValue)
       
      };
    
    const data = {
            labels: data2 ,
          
            datasets: [
              {
                label: 'Pharse A gaz',
                fill: true,
                data: data3.map((r) => {
                  return r[0]
                }),
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
            },
              {
                label: 'Pharse A Counter',
                fill: true,
                data: data3.map((r) => {
                  return r[1]
                }),
                backgroundColor: "rgb(255, 255, 204)",
                borderColor: "rgb(255, 255, 102)",
            },

              {
                label: 'Pharse B Gaz',
                fill: true,
                data: data3.map((r) => {
                  return r[2]
                }),
                backgroundColor: "rgb(255, 255, 204)",
                borderColor: "rgb(119, 235, 69)",
            },

              {
                label: 'Pharse B Counter',
                fill: true,
                data: data3.map((r) => {
                  return r[3]
                }),
                backgroundColor: "rgb(255, 255, 204)",
                borderColor: "rgb(222, 66, 59)",
            },
            

              {
                label: 'Pharse B Counter',
                fill: true,
                data: data3.map((r) => {
                  return r[4]
                }),
                backgroundColor: "rgb(255, 255, 204)",
                borderColor: "black",
            },
              {
                label: 'Pharse B Counter',
                fill: true,
                data: data3.map((r) => {
                  return r[5]
                }),
                backgroundColor: "rgb(255, 255, 204)",
                borderColor: "orange",
            },

         ]
        }



        useEffect( () => {
          fetchData().catch((error) => {
            console.log(error);
            console.log("error");
          });
              console.log(result)
              
        },[])
  return (
    <div className="container" style={{width:'1200px',height:'1200px',marginTop:'6rem'}}>
     
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Line Chart</h1>
      <Doughnut data={data} />
   
    </div>
  );
};

export default DoughnutChart;





