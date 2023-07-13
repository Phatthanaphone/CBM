import React, { useState, useEffect,Fragment,useRef } from "react";
import "./components/style.css";
import "react-calendar/dist/Calendar.css";
import { Dialog } from "@headlessui/react";
// import DatePicker from 'react-date-picker';
import DatePicker from "react-datepicker";
import number_format from "./components/number_format";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useLocation } from "react-router-dom";
import ManualService from "./services/ManualService";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useNavigate } from "react-router-dom";
import DateFormat from './functions/DateFormat'
import Convert from './functions/TimeZoneformat'
import './AutoMange.css'
// import './components/css/AutoManage.css'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
let idUp = 1;
function AutoManage() {
  const navigate = useNavigate();
  const { unit_id } = useParams();
  // const phase = 'A'
  const location = useLocation();

  const initData = {
    unit: unit_id,
    time: '',
    data: ["0", "0", "0", "0", "0", "0"],
  };

  const initTesthold = ["0", "0", "0", "0", "0", "0"]
  const [data, setData] = useState([]);
  // const [dataOne, setData] = useState([]);
  const [infinity, setInfinity] = useState(0);
  const [dataID, setDataID] = useState()
  const [newData, setNewData] = useState({})
  const [selectedDate, setSelectedDate] = useState();

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
  const [dataTesthold, setDataTesthold] = useState({...initDataTesthold})

  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null);



  async function handleAdd() {
    // alert(dataTesthold)

    // if(data.length > 0)
    // {
    //   let lastElement = data[data.length - 1]
    //   let element = {...lastElement};

      // not copy data [] but ref  


      // element.testhold = [...lastElement.testhold]
      // element.value = [0,0,0,0,0,0]
      // element.valuee = [0,0,0,0,0,0]
      // element.time = null
      // element.value = [...data[data.length - 1].value]
      // element.valuee = [...data[data.length - 1].valuee]
      
      // element.id = element.id + 1;
      // element.id = element.id + 1;
    //   console.log('new element')
    //   console.log(element)
    //   let newData = [...data, element]
    //   setData(newData)
      
    //   await ManualService.addDataMore(element);  
    // }
    // else {
      await ManualService.addData(unit_id);
    // setInfinity(idUp);
    // idUp += 1;
    // }

    
    await fetchData();
  }

  function handleSubmit(id) {

    let result = data.filter((e) => e.id == id);
    console.log('result:',result)

    // console.log(result)
     if(result == '') {
      return alert('Please fill date')
         
     }
     if (result) {
        if (result[0].time == null) {
          return alert('Please fill date')
        }
      let valuee = result[0].valuee
      // let testhold = result[0].testhold
    
         if((result[0].time).getFullYear() <= 2010) {
          return alert ("Please fill date")
         }
         if((result[0].time).getFullYear() <= 2010) {
          return alert ("Please fill date")
         }
          
         let isValueeNotFilled = valuee.every((e) => !e)
         if(isValueeNotFilled) {
          return alert ("Please fill values")
         }
        //  if (valuee[0] == '' || valuee[1] == '' || valuee[2] == '' || valuee[3] == '' || valuee[4] == '' || valuee[5] == '') {
        //   return alert ("Please fill value")
        //  }
        //  if (valuee[0] == 0 && valuee[1] == 0 && valuee[2] == 0 && valuee[3] == 0 && valuee[4] == 0 && valuee[5] == 0 ) {
        //   return alert ("Please fill value")
        //  }
        //  if(testhold[0] == '' || testhold[1] == '' || testhold[2] == '' || testhold[3] == '' || testhold[4] =='' || testhold[5] == '') {
        //   return alert ("Please fill testhold")
        //  }
         else {
           alert('create success')
           ManualService.updateData(result);
         }
     }

    ManualService.updateData(result);
  }

const getTestholdAPI = async (phase) => {
  setOpen(true)
  let responseTesthold = await ManualService.getTestholdData(unit_id,phase);
  let RTesthold = responseTesthold.data
  console.log(RTesthold)
  setDataTesthold({...dataTesthold, FS6_testhold_id : RTesthold[0].FS6_testhold_id,high1: RTesthold[0].high1, high2: RTesthold[0].high2, high3: RTesthold[0].high3, low1: RTesthold[0].low1,low2: RTesthold[0].low2,
    low3: RTesthold[0].low3, unit_id : RTesthold[0].unit_id, phase : RTesthold[0].phase
  })
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
  ManualService.updateTestholdFS6(dataTesthold);
   console.log(dataTesthold)
   setOpen(false)
 }

 const handleChange = (element) => {
  let key = element.target.id;
  let value = element.target.value;
  dataTesthold[key] = value;
  console.log(key, value);
  setDataTesthold({ ...dataTesthold });
};

const renderModal = () => {
  
      return (
<div className="modal-francis">
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

  const fetchData = async () => {
    let result = [];
    let response = await ManualService.getDataById(unit_id);

    if(response.data){
      result = response.data;
    }
    // console.log(result);
    let results = [];
    if (result.length > 0) {
    results= result.map((e) => ({
      ...e,
      valuee: JSON.parse(e.value),
      time: Convert(e.time),
    }));

    }
    setData([...results]);
     
  };
  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
      console.log("error");
    });
  }, [unit_id]);

  // index, [0], e.target.value
  const onChangeHandlerTesthold = (index, subIndex, newValue) => {
    // const updatedData = [...data];

    const element = data[index];

   element["testhold"][subIndex] = newValue;
   data[index] = {...element}
    setData([...data]);
  };
  const onChangeHandler = (index, subIndex, newValue) => {

    const updatedData = [...data];
    updatedData[index]["valuee"][subIndex] = newValue;
    setData([...updatedData]);
  };
  const onChangeHandlerTime = (index, time) => {
    const updatedTime = [...data];
    updatedTime[index]["time"] = time;
    setData([...updatedTime]);
  };
  const onChangeHandlerRemark = (index, remark) => {
    const updateRemark = [...data];
    updateRemark[index]["remark"] = remark;
    setData([...updateRemark]);
  };
  // const onChangeHandlerTime = (index,time) => {
  //       const updatedTime = [...data]
  //       updatedTime[index]['time'] = time;
  //       setData([...updatedTime])
  // }

  return (
    <div className="container-fluid pt-5" style={{zoom : '67%'}}>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
        
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              title, email and role.
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
                            onClick={() => navigate(`/barchart/${unit_id}`)}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Bar Chart
                          </button>
                        )}
                      </Menu.Item> */}
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
                            onClick={() => navigate(`/FS6/${unit_id}`)}
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
        <div style={{overflowY: 'scroll',maxWidth:'', height:'650px'}} className=" mt-8  shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="table caption-top" style={{textAlign:"left",borderCollapse:"separate",borderSpacing: '0',width:'100%'}}>
            

            <thead className="header-body">
           
              
              <tr className="table-header-date-unit">
                <th className="date-and-time-header" style={{paddingBottom: '0'}} rowSpan="3" scope="row">
                 <td style={{border:'none'}}>
                 Date and time
                 </td>
                </th>
                <th style={{ textAlign: "center" }} colSpan="6" scope="row">
                  Unit {unit_id}
                </th>
                <th className="remark-FS6" style={{paddingBottom:'19px'}} rowSpan="3">
                  Remark
                  </th>
                <th className="action" rowSpan="3" style={{ paddingBottom:'19px' }}>Action</th>
              </tr>
              <tr className="table-phase">
                <th style={{ textAlign: "center" }} colSpan="2">
                  Phase A
                </th>
                <th style={{ textAlign: "center" }} colSpan="2">
                  Phase B
                </th>
                <th style={{ textAlign: "center" }} colSpan="2">
                  Phase C
                </th>
              </tr>
              <tr className="table-gaz-counter-FS6" style={{padding:'0'}}>
                <th className="table-gaz-counter" style={{}}>
                <td className="gaz-header-FS6"  style={{border:'none'}}>Gaz</td>
                <td className="gaz-header-FS6-button"  style={{border:'none'}}>
                <button
        type="button"
        onClick={() => getTestholdAPI('A')}
        style={{fontSize: '14px',padding:'0'}}
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        testholds
      </button>
                </td>
                </th>
                
                <th className="table-gaz-counter">
                  <td className="counter" style={{paddingBottom:'0'}}>Counter</td>
                </th>
                <th className="table-gaz-counter" style={{}}>
                <td className="gaz-header-FS6"  style={{border:'none'}}>Gaz</td>
                <td className="gaz-header-FS6-button"  style={{border:'none'}}>
                <button
        type="button"
        onClick={() => getTestholdAPI('B')}
        style={{fontSize: '14px',padding:'0'}}
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        testhold
      </button>
                </td>
                </th>
                <th className="table-gaz-counter">
                  <td className="counter" style={{paddingBottom:'0'}}>Counter</td>
                </th>
                <th className="table-gaz-counter" style={{}}>
                <td className="gaz-header-FS6"  style={{border:'none'}}>Gaz</td>
                <td className="gaz-header-FS6-button"  style={{border:'none'}}>
                <button
        type="button"
        onClick={() => getTestholdAPI('C')}
        style={{fontSize: '14px',padding:'0'}}
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        testhold
      </button>
                </td>
                </th>
                <th className="table-gaz-counter">
                  <td className="counter" style={{paddingBottom:'0'}}>Counter</td>
                </th>

              </tr>
              </thead>
              <tbody>
              {data.map((row, index) => {
                return (
                  <tr key={index}>
                    <td className="date-time-body">
                    <DatePicker
                        className="border border-none"
                        selected={new Date(row.time).getFullYear() <= 2015 ? null : row.time}
                        onChange={(date) => onChangeHandlerTime(index, date)}
                        dateFormat="dd/MM/yyyy HH:mm"
                        // locale="pt-BR"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        isClearable
                      />
                    </td>
                    
                    <td className="gaz-body-FS6" style={{width:'150px'}}>
                    <div style={{display:'flex',marginRight:'0'}}>
                      <input
                      
                        type="number"
                        required
                        className="FS6 border border-none"
                        value={row.valuee[0]}
                        onChange={(e) =>
                          onChangeHandler(index, 0, e.target.value)
                        }
                      />
                      
                      </div>
                    </td>
                    <td className="counter-body" style={{width:'150px'}}>
                      <input
                        type="number"
                        className="FS6 border border-none"
                        value={row.valuee[1]}
                        onChange={(e) =>
                          onChangeHandler(index, 1, e.target.value)
                        }
                      />
                    </td>
                    
                    <td className="gaz-body-FS6" style={{width:'150px'}}>
                    <div style={{display:'flex',marginRight:'0'}}>
                      <input
                        type="number"
                        required
                        className="FS6 border border-none"
                        value={row.valuee[2]}
                        onChange={(e) =>
                          onChangeHandler(index, 2, e.target.value)
                        }
                      />
                      

                      </div>
                    </td>
                    <td className="counter-body" style={{width:'150px'}}>
                      <input
                        type="number"
                        className="FS6 border border-none"
                        value={row.valuee[3]}
                        onChange={(e) =>
                          onChangeHandler(index, 3, e.target.value)
                        }
                      />
                    </td>
                    <td className="gaz-body-FS6" style={{width:'150px'}}>
                    <div style={{display:'flex',marginRight:'0'}}>
                      <input
                        type="number"
                        required
                        className="FS6 border border-none"
                        value={row.valuee[4]}
                        onChange={(e) =>
                          onChangeHandler(index, 4, e.target.value)
                        }
                      />
                      

                      </div>
                    </td>
                    <td className="counter-body" style={{width:'150px'}}>
                      <input
                        type="number"
                        className="FS6 border border-none"
                        value={row.valuee[5]}
                        onChange={(e) =>
                          onChangeHandler(index, 5, e.target.value)
                        }
                      />
                    </td>
                    <td style={{width:'100%'}}> 

<textarea style={{width:'100%'}} value={row.remark == null ? null : row.remark} onChange={(e) => onChangeHandlerRemark(index, e.target.value)} className="border border-none" ></textarea>
</td>
                    
                    {/* <td><button className="btn btn-success" onClick={() => handleSubmit(row.id)}>Submit</button></td> */}
                    <td>
                      <button
                        type="button"
                       style={{fontSize:'14px'}}
                        onClick={() => handleSubmit(row.id)}
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                      >
                        save
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {renderModal()}
      </div>
    </div>
  );
}

export default AutoManage;
