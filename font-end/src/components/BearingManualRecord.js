import React,{useState,useEffect,Fragment,useRef} from 'react'
import './style.css'
import { Dialog } from "@headlessui/react";
import { useParams,useLocation,useNavigate } from 'react-router-dom'
import BearingService from "../services/BearingService";
import DatePicker from "react-datepicker";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Convert from '../functions/TimeZoneformat'
import '../Bearing.css'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
let idUp = 1;
function BearingManualRecord () {
    const {unit_id} = useParams()
    const navigate = useNavigate();
    const location = useLocation()



const initData = 
      {
    unit_id : unit_id,
  }

  const initDataTesthold =  {
    "bearing_testhold_id" : 0,
    "high1" : '',
    "high2" : '',
    "high3" : '',
    "low1" : '',
    "low2" : '',
    "low3" : '',
    "unit_id" : '',
    "name" : ''
  }



 const [data, setData] = useState([])
 const [dataOne, setDataOne] = useState([])
 const [infinity, setInfinity] = useState(0)
 const [dataTesthold, setDataTesthold] = useState({...initDataTesthold})
 const [open, setOpen] = useState(false)
 const cancelButtonRef = useRef(null);
function handleSubmit (bearing_id) {
  //  console.log(dataOne)
      const result =  dataOne.filter((e) => e.bearing_id == bearing_id)
       
      //condition
      if(result == '') {
        return alert('please fill date')
       }
       if (result) {
        if (result[0].time == null) {
          return alert('please fill date')
        }
      let TGB = result[0].TGB
      let UGB = result[0].UGB
      let LGB = result[0].LGB
      // let testhold = result[0].testhold
      
         if((result[0].time).getFullYear() <= 2010) {
          return alert ("Please fill date")
         }
         if (TGB[0] == '' || TGB[1] == '' || UGB[0] == '' || UGB[1] == '' || LGB[0] == '' || LGB[1] == '') {
          return alert ("Please fill value")
         }
         if (TGB[0] == 0 && TGB[1] == 0 && UGB[0] == 0 && UGB[1] == 0 && LGB[0] == 0 && LGB[1] == 0 ) {
          return alert ("Please fill value")
         }
        //  if (testhold == '') {
        //   return alert("Please fill testhold")
        //  }
         else {
           alert('create success')
           BearingService.updateBearingManual(result)
         }
     }
       BearingService.updateBearingManual(result)
    console.log(result)
}
  
const handleChange = (element) => {
  let key = element.target.id;
  let value = element.target.value;
  dataTesthold[key] = value;
  console.log(key, value);
  setDataTesthold({ ...dataTesthold });
};

async function handleAdd () {
  // if (data.length > 0) {
  //   let lastElement = data[data.length - 1]
  //   let element = {...lastElement}

  //   element.testhold = [...lastElement.testhold]

  //   element.value = [0,0,0,0,0,0]
  //   element.time = null

  //   element.id = element.id + 1;
  //   await BearingService.addBearingManualMore(element)
  // }
  // else {
  //   await BearingService.addBearingManual(initData)
  // }
  await BearingService.addBearingManual(initData)
    await fetchData()
}

function handleSubmitTesthold (event)  {
  event.preventDefault()

  if (dataTesthold.high1 == '') {
      dataTesthold.high1 = 0
  }

  if (dataTesthold.high2 == '') {
    dataTesthold.high2 = 0
  } 
  if (dataTesthold.high3 == '') {
    dataTesthold.high3 = 0
  } 
  if (dataTesthold.low1 == '') {
    dataTesthold.low1 =0
  }
  if (dataTesthold.low2 == '') {
    dataTesthold.low2=0
  }
  if (dataTesthold.low3 == '') {
    dataTesthold.low3 =0
  }


  // alert (dataTesthold.high1)
  BearingService.updateBearingManualTesthold(dataTesthold);
   console.log(dataTesthold)
   setOpen(false)
 }
const renderModal = () => {
  
  return (
<div className="modal-francis" >
                  <Transition.Root show={open} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      initialFocus={cancelButtonRef}
                      onClose={setOpen}
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
                                    Teshold Value
                                  </Dialog.Title>

                                      <div  style={{display:'flex',flexDirection:'row',marginTop:'25px',columnGap:'2rem'}}>
                                        <div style={{paddingLeft:'4rem'}}>
                                     <p className="mt-2 text-sm text-gray-700">high1</p>
                                      <input className="input-francis-modal"
                                         
                                        type="number"
                                        
                                        id="high1"
                                        onChange={handleChange}
                                        value={dataTesthold.high1}
                                        placeholder="High1...."
                                      />

                                       <p className="mt-2 text-sm text-gray-700">high2</p>
                                      <input className="input-francis-modal"
                                        
                                        type="number"
                                        id="high2"
                                        onChange={handleChange}
                                        value={dataTesthold.high2}
                                      
                                        placeholder="High2...."
                                      />

                                        <p className="mt-2 text-sm text-gray-700">high3</p>
                                      <input className="input-francis-modal"
                                       
                                        type="number"
                                        id="high3"
                                        onChange={handleChange}
                                        value={dataTesthold.high3}
                                        placeholder="High3...."
                                      />

                                      </div>
                                        <div style={{paddingRight:'4rem'}}>
                                        <p className="mt-2 text-sm text-gray-700">low1</p>
                                      <input className="input-francis-modal"
                                       
                                        type="number"
                                      
                                        id="low1"
                                        onChange={handleChange}
                                        value={dataTesthold.low1}
                                        placeholder="Low1..."
                                      />

                                       <p className="mt-2 text-sm text-gray-700">low2</p>
                                      <input className="input-francis-modal"
                                        
                                        type="number"
                                        id="low2"
                                        onChange={handleChange}
                                        value={dataTesthold.low2}
                                        placeholder="Low2..."
                                      />

                                      <p className="mt-2 text-sm text-gray-700">low3</p>
                                      <input className="input-francis-modal"
                    
                                        type="number"
                                        id="low3"
                                        onChange={handleChange}
                                        value={dataTesthold.low3}
                                        placeholder="Low3..."
                                      />

                                      </div>

                                    </div>
                                    </div>

                                  </div>
                              
                              
                              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
    
                                <button
                                style={{marginTop: '15px',backgroundColor:'rgb(79 70 229)'}}
                                  type="button"
                                  className=" w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                  onClick={handleSubmitTesthold}
                                >
                                  submit
                                </button>
                                <button
                                  type="button"
                                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                  onClick={() => setOpen(false)}
                                  ref={cancelButtonRef}
                                  style={{border: '1px solid rgb(192, 192, 192)'}}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition.Root>
                </div>
  )
}

const getTestholdAPI = async (name) => {
  setOpen(true)
  let responseTesthold = await BearingService.getTestholdBearingManual(unit_id,name);
  let RTesthold = responseTesthold.data
  console.log(RTesthold)
  setDataTesthold({...dataTesthold, bearing_testhold_id : RTesthold[0].bearing_testhold_id,high1: RTesthold[0].high1, high2: RTesthold[0].high2, high3: RTesthold[0].high3, low1: RTesthold[0].low1,low2: RTesthold[0].low2,
   low3: RTesthold[0].low3, unit_id : RTesthold[0].unit_id, name : RTesthold[0].name
 })
}

const fetchData = async () => {
    let result =[]
   let response = await BearingService.getBearingManual(unit_id);

   if (response.data) {
    result = response.data;
   }
   let results = []
    if (result.length > 0) {
      results = result.map((e) => ({
        ...e,
        TGB : JSON.parse(e.TGB), LGB: JSON.parse(e.LGB), UGB : JSON.parse(e.UGB),
        time: Convert(e.time),
   }))
    }
   
    // console.log(results)
  setData([...results]);
    // console.log(result)
  // setData(result);
  
 
  
};
useEffect(() => {
  fetchData().catch((error) => {
    console.log(error);
    console.log("error");
  });
  // console.log(data)
  // alert(unit_id)
}, [unit_id,infinity,setData] )


                    // index, [0], e.target.value
const onChangeHandlerTGB = (index,subIndex,newValue) => {
      const updatedData = [...data]
      updatedData[index]['TGB'][subIndex] = newValue;
     setDataOne([...updatedData])
     
}
const onChangeHandlerLGB = (index,subIndex,newValue) => {
      const updatedData = [...data]
      updatedData[index]['LGB'][subIndex] = newValue;
     setDataOne([...updatedData])
     
}
const onChangeHandlerUGB = (index,subIndex,newValue) => {
      const updatedData = [...data]
      updatedData[index]['UGB'][subIndex] = newValue;
     setDataOne([...updatedData])
     
}
const onChangeHandlerTime = (index,time) => {
      const updatedTime = [...data]
      updatedTime[index]['time'] = time;
      setDataOne([...updatedTime])
}
const onChangeHandlerRemark = (index,remark) => {
      const updateRemark = [...data]
      updateRemark[index]['remark'] = remark;
      setDataOne([...updateRemark])
}

// const onChangeHandlerTesthold = (index,subIndex,testhold ) => {
//   const updatedTesthold = [...data]
//   updatedTesthold[index]['testhold'][subIndex] = testhold
//   setDataOne([...updatedTesthold])
// }



 
    return (
        <div className="container-fluid pt-5" style={{zoom:'67%'}}>
      
  
        <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
    
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">

        <Menu as="div" className="relative inline-block text-left pr-5">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    Chart
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">

                      {/* <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => navigate(`/doughnutchart/${unit_id}`)}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Doughnut Chart
                          </button>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => navigate(`/BearingChart/${unit_id}`)}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Line Chart
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
        <div style={{paddingTop:'2rem'}}>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add table
          </button>
        </div>
        </div>
      </div>
      <div style={{overflowY: 'scroll',width:'100%', height:'650px'}} className=" mt-8 shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">


        
<table style={{ position:'relative',borderCollapse:'separate',borderSpacing: '0'}} className="table caption-top">
{/* <caption>List of users</caption> */}

<thead className="thead-table">



  <tr>
    <th className="date-time-bearing" rowSpan="3" scope="row">Date and time</th>
    <th style={{textAlign:'center'}} colSpan="6" scope="row">Unit {unit_id}</th>
    <th className="remark" style={{textAlign:'center'}} rowSpan="3">Remark</th>
    <th className="action" style={{textAlign:'center'}} rowSpan="3">Action</th>
  </tr>
  <tr>
    <th style={{textAlign:'center'}} colSpan="2">TGB</th>
    <th style={{textAlign:'center'}} colSpan="2">LGB</th>
    <th style={{textAlign:'center'}} colSpan="2">UGB</th>
    
  </tr>
  <tr style={{textAlign:'center',position:'sticky',top:'0',backgroundColor: "#F9F8F8"}}> 
    
    <th style={{textAlign:'center'}}>
    <td style={{border: 'none',padding:'0',whiteSpace:'nowrap'}}>Oil level</td>
    <td  style={{border:'none',padding:'0'}}>
    <button
        onClick={() => getTestholdAPI('TGB')}
        type="button"
        style={{fontSize: '14px',marginLeft:'6px'}}
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        testhold
      </button>
    </td>
    </th>
    <th style={{textAlign:'center',whiteSpace:'nowrap'}}>Refill oil</th>
    <th style={{textAlign:'center'}}>
    <td style={{border: 'none',padding:'0',whiteSpace:'nowrap'}}>Oil level</td>
    <td  style={{border:'none',padding:'0'}}>
    <button
   onClick={() => getTestholdAPI('LGB')}
        type="button"
        style={{fontSize: '14px',marginLeft:'6px'}}
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        testhold
      </button>
    </td>
    </th>
    <th style={{textAlign:'center',whiteSpace:'nowrap'}}>Refill oil</th>
    <th style={{textAlign:'center'}}>
    <td style={{border: 'none',padding:'0',whiteSpace:'nowrap'}}>Oil level</td>
    <td  style={{border:'none',padding:'0'}}>
    <button
   onClick={() => getTestholdAPI('UGB')}
        type="button"
        style={{fontSize: '14px',marginLeft:'6px'}}
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        testhold
      </button>
    </td>
    </th>
    <th style={{textAlign:'center',whiteSpace:'nowrap'}}>Refill oil</th>

  </tr>
  </thead>
  <tbody>
 {data.map((row,index) => {
   return (
    <tr key={row.bearing_id}>
                    <td style={{ textAlign: "center"}}>
                      <DatePicker
                       
                        className="border border-none"
                        selected={new Date(row.time).getFullYear() <= 2015 ? null : row.time}
                        onChange={(date) => onChangeHandlerTime(index, date)}
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        isClearable
                      />
                    </td>
        
         <td className="value-testhold-bearing">
         <div style={{display:'flex',marginRight:'0'}}>
           <input type="number" className="input-value-bearing border border-none"
           value={row.TGB[0]}
           onChange={(e) => onChangeHandlerTGB(index,0,e.target.value)}
           />



            {/* <input style={{width:'85px',marginLeft:'30px'}}
            type="number"
            required
            value={row.testhold[0]}
            onChange={(e) => onChangeHandlerTesthold(index,0,e.target.value)}
            className="input-value-bearing border border-none"

                      /> */}
           </div>   
         </td>
         <td className="value-notesthold-bearing">
           <input type="number" className="input-value-bearing border border-none"
           value={row.TGB[1]}
           onChange={(e) => onChangeHandlerTGB(index,1,e.target.value)}
           />
         </td>
         <td  className="value-testhold-bearing"> 
         <div style={{display:'flex',marginRight:'0'}}>
           <input type="number" className="input-value-bearing border border-none"
           value={row.LGB[0]}
           onChange={(e) => onChangeHandlerLGB(index,0,e.target.value)}
           />

{/* <input style={{width:'85px',marginLeft:'30px'}}
            type="number"
            required
            value={row.testhold[1]}
            onChange={(e) => onChangeHandlerTesthold(index,1,e.target.value)}
            className="input-value-bearing border border-none"

                      /> */}
             </div> 
         </td>
         <td  className="value-notesthold-bearing">
           <input type="number" className="input-value-bearing border border-none"
           value={row.LGB[1]}
           onChange={(e) => onChangeHandlerLGB(index,1,e.target.value)}
           />
           
         </td>
         <td  className="value-testhold-bearing">
         <div style={{display:'flex',marginRight:'0'}}>
           <input type="number" className="input-value-bearing border border-none"
           value={row.UGB[0]}
           onChange={(e) => onChangeHandlerUGB(index,0,e.target.value)}
           />

{/* <input style={{width:'85px',marginLeft:'30px'}}
            type="number"
            required
            value={row.testhold[2]}
            onChange={(e) => onChangeHandlerTesthold(index,2,e.target.value)}
            className="input-value-bearing border border-none"

                      /> */}
             </div> 
         </td>
         <td  className="value-notesthold-bearing"> 
           <input type="number" className="input-value-bearing border border-none"
           value={row.UGB[1]}
           onChange={(e) => onChangeHandlerUGB(index,1,e.target.value)}
           />
         </td>
         <td> 
         <textarea value={row.remark} onChange={(e) => onChangeHandlerRemark(index,e.target.value)} className="border border-none" style={{height:'43px'}}></textarea>
         </td>
        {/* <td><button className="btn btn-success" onClick={() => handleSubmit(row.id)}>Submit</button></td> */}
        <td>
        <button 
            type="button"
            onClick={() => handleSubmit(row.bearing_id)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            save
          </button>
          </td>
    </tr>
   )
 })}
   
</tbody>
</table> 

      </div>
      {renderModal()}
    </div>
</div>
    )
}

export default BearingManualRecord


