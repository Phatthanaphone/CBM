import React, { useState, useEffect, Fragment, useRef } from "react";
import "../components/style.css";
import FrancisService from "../services/FrancisService";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import DatePicker from "react-datepicker";
import Convert from "../functions/TimeZoneformat";
import "../Francis.css";
import { Dialog } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
let idUp = 1;
function Francis() {
  const { unit_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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
  const [data, setData] = useState([]);
  const [dataTesthold, setDataTesthold] = useState({...initDataTesthold})
  // const [dataOne, setDataOne] = useState([]);

  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const getTestholdAPI = async () => {
    setOpen(true);
    let responseTesthold = await FrancisService.getTesthold(unit_id);
    let RTesthold = responseTesthold.data
    console.log(unit_id)
    console.log(RTesthold)
    setDataTesthold({...dataTesthold, francis_testhold_id : RTesthold[0].francis_testhold_id,high1: RTesthold[0].high1, high2: RTesthold[0].high2, high3: RTesthold[0].high3, low1: RTesthold[0].low1,low2: RTesthold[0].low2,
      low3: RTesthold[0].low3, unit_id : RTesthold[0].unit_id
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
     FrancisService.updateTesthold(dataTesthold);
     console.log(dataTesthold)
     setOpen(false)
   }

  function handleSubmit(francis_id) {
    const result = data.filter((e) => e.francis_id == francis_id);
    if (result == "") {
      return alert("Please fill date");
    }

    if (result) {
      if (result[0].time == null) {
        return alert("Please fill date");
      }

      let valuee = result[0].valuee;
      // let testhold = result[0].testhold;

      if (result[0].time.getFullYear() <= 2010) {
        return alert("Please fill date");
      }

      let isValueeNotFilled = valuee.every((e) => !e);
      if (isValueeNotFilled) {
        return alert("Please fill valuee");
      }
      //  if(valuee[0] == '' || valuee[1] == '' || valuee[2] == '' || valuee[3] == '' || valuee[4] == '' ||valuee[5] == '' ||valuee[6] == '' ||valuee[7] == '' ||valuee[8] == '' || valuee[9] == '' ||valuee[10] == '' ||valuee[11] == '' ) {
      //   return alert ("Please fill value")
      // //  }
      // let isGazNotFilled = valuee.every((e) => !e)
      // if(isGazNotFilled) {
      //  return alert ("Please fill value")
      // }

       if (valuee[0] == 0 && valuee[1] == 0 && valuee[2] == 0 && valuee[3] == 0 &&valuee[4] == 0 && valuee[5] == 0 && valuee[6] == 0 && valuee[7] == 0 && valuee[8] == 0 && valuee[9] == 0 && valuee[10] == 0 && valuee[11] == 0 ) {
        return alert ("Please fill value")
       }
      // if (testhold === "") {
      //   return alert("Please fill testhold");
      // } else {
      //   alert("Create Success");
      //   // console.log(result)
      //   FrancisService.update(result);
      // }
      alert('success')
      FrancisService.update(result);

    }

    // console.log(result);
  }

  async function handleAdd() {
    // console.log(data);
    // if (data.length > 0) {
    //   let element = { ...data[data.length - 1] };
    //   element.testhold = data[data.length - 1].testhold;
    //   // element.value = [0,0,0,0,0,0,0,0,0,0,0,0]
    //   element.valuee = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    //   element.time = null;
    //   element.id = element.id + 1;
    //   console.log(element);
    //   setData([...data, element]);

    //   await FrancisService.addDataMore(element);
    // } else {
    //   await FrancisService.add(unit_id);
    // }
    await FrancisService.add(unit_id);   
    await fetchData();
  }
 
 
  const fetchData = async () => {
    let result = [];
    // let resultTesthold = [];
    let response = await FrancisService.get(unit_id);
        

      
    if (response.data) {
      result = response.data;
    }
    let results = [];

    if (result.length > 0) {
      results = result.map((e) => ({
        ...e,
        valuee: JSON.parse(e.valuee),
        time: Convert(e.time),
      }));
    }
    setData([...results]);
  };

  // const fetchTeshole = async () => {
  //   let result = [];
  //   let response = await FrancisService.getTesthold(unit_id);
    
  //   if (response.data) {
  //     result = response.data;

  //     //  console.log(result[0].high1)
  //   setDataTesthold({result)
  //   }
    
  // }
  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
      console.log("error");
    });

  
    //  console.log('test')
    console.log(dataTesthold)
  }, [unit_id]);

  // index, [0], e.target.value
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
    const updatedRemark = [...data];
    updatedRemark[index]["remark"] = remark;
    setData([...updatedRemark]);
  };

  const handleChange = (element) => {
    let key = element.target.id;
    let value = element.target.value;
    dataTesthold[key] = value;
    console.log(key, value);
    setDataTesthold({ ...dataTesthold });
  };


  return (
    <div className="container-fluid pt-5" style={{zoom:'67%'}}>
      <div className="px-4 sm:px-6 lg:px-8 ">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            {/* <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              title, email and role.
            </p> */}
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
 
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => navigate(`/ExiChart/${unit_id}`)}
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

            <div style={{ paddingTop: "7px" }}>
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
        <div>

               {/* <div>
                <input type="text" value={dataTesthold.high1}/>
               </div> */}
        </div>

        <div
          style={{ overflowY: "scroll", width: "100%", height: "670px" }}
          className="mx-4 mt-8 shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg "
        >
          <table
            className="table caption-top"
            style={{
              position: "relative",
              borderCollapse: "separate",
              borderSpacing: "0",
            }}
          >
            {/* <caption>List of users</caption> */}

            <thead className="thead-table">
              <tr
                style={{
                  position: "sticky",
                  bottom: "0",
                  top: "0",
                  backgroundColor: "#F9F8F8",
                }}
              >
                <th
                  className="date-time-expectval-francis"
                  rowSpan="3"
                  scope="row"
                >
                  Date & Time Expect Val
                </th>
                <th
                  className="measurement-value-francis"
                  rowSpan="3"
                  scope="row"
                >
                  Measurement value
                </th>
                <th className="date-time-francis" rowSpan="3" scope="row">
                  <td
                    style={{
                      border: "none",
                      whiteSpace: "nowrap",
                      padding: "0",
                    }}
                  >
                    Date and time
                  </td>
                  <td style={{ border: "none", padding: "0" }}>
                    <button
                      type="button"
                      onClick={getTestholdAPI}
                      style={{ fontSize: "14px", marginLeft: "6px" }}
                      className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      testhold
                    </button>
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
                                          {/* <button 
                                            
                                            type="button"
                                            style={{backgroundColor:'rgb(79 70 229)',height:'40px'}}
                                            className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                          >
                                            save
                                          </button> */}
                                           <p className="mt-2 text-sm text-gray-700">high2</p>
                                          <input className="input-francis-modal"
                                            
                                            type="number"
                                            id="high2"
                                            onChange={handleChange}
                                            value={dataTesthold.high2}
                                          
                                            placeholder="High2...."
                                          />
                                          {/* <button
                                            type="button"
                                            style={{backgroundColor:'rgb(79 70 229)',height:'40px'}}
                                            className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                          >
                                            save
                                          </button> */}
                                            <p className="mt-2 text-sm text-gray-700">high3</p>
                                          <input className="input-francis-modal"
                                           
                                            type="number"
                                            id="high3"
                                            onChange={handleChange}
                                            value={dataTesthold.high3}
                                            placeholder="High3...."
                                          />
                                          {/* <button
                                            type="button"
                                            style={{backgroundColor:'rgb(79 70 229)',height:'40px'}}
                                            className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                          >
                                            save
                                          </button> */}
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
                                          {/* <button
                                            type="button"
                                            style={{backgroundColor:'rgb(79 70 229)',height:'40px'}}
                                            className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                          >
                                            save
                                          </button> */}
                                           <p className="mt-2 text-sm text-gray-700">low2</p>
                                          <input className="input-francis-modal"
                                            
                                            type="number"
                                            id="low2"
                                            onChange={handleChange}
                                            value={dataTesthold.low2}
                                            placeholder="Low2..."
                                          />
                                          {/* <button
                                            type="button"
                                            style={{backgroundColor:'rgb(79 70 229)',height:'40px'}}
                                            className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                          >
                                            save
                                          </button> */}
                                          <p className="mt-2 text-sm text-gray-700">low3</p>
                                          <input className="input-francis-modal"
                        
                                            type="number"
                                            id="low3"
                                            onChange={handleChange}
                                            value={dataTesthold.low3}
                                            placeholder="Low3..."
                                          />
                                          {/* <button
                                            type="button"
                                            style={{backgroundColor:'rgb(79 70 229)',height:'40px'}}
                                            className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                          >
                                            save
                                          </button> */}
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
                  </td>
                </th>
                {/* <th className="header" rowSpan="3" scope="row">Testhold</th> */}
                <th colSpan="12" scope="row">
                  Unit {unit_id}
                </th>
                <th
                  className="remark-francis"
                  style={{ borderBottom: "1px solid black" }}
                  rowSpan="3"
                >
                  Remark
                </th>
                <th
                  className="header"
                  style={{ borderBottom: "1px solid black" }}
                  rowSpan="3"
                >
                  Action
                </th>
              </tr>
              <tr>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "0",
                    background: "white",
                  }}
                  colSpan="4"
                >
                  Converter 1
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "0",
                    background: "white",
                  }}
                  colSpan="4"
                >
                  Converter 2
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "0",
                    background: "white",
                  }}
                  colSpan="4"
                >
                  Converter 3
                </th>
              </tr>
              <tr>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#F9F8F8",
                  }}
                >
                  M1
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#F9F8F8",
                  }}
                >
                  M2
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#F9F8F8",
                  }}
                >
                  M3
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#F9F8F8",
                  }}
                >
                  M4
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#F9F8F8",
                  }}
                >
                  M1
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#F9F8F8",
                  }}
                >
                  M2
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#F9F8F8",
                  }}
                >
                  M3
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#F9F8F8",
                  }}
                >
                  M4
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#F9F8F8",
                  }}
                >
                  M1
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#F9F8F8",
                  }}
                >
                  M2
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#F9F8F8",
                  }}
                >
                  M3
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#F9F8F8",
                  }}
                >
                  M4
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                return (
                  <tr key={row.francis_id}>
                    <td className="measurement-value">
                      {row.measurement_value}
                    </td>
                    <td className="date-time">{row.date_time}</td>
                    <td>
                      <DatePicker
                        className="border border-none"
                        selected={
                          new Date(row.time).getFullYear() <= 2015
                            ? null
                            : row.time
                        }
                        onChange={(date) => onChangeHandlerTime(index, date)}
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        isClearable
                      />
                    </td>
                    {/* <td  >
        <input type="number" className="border border-none"
           value={row.testhold}
           onChange={(e) => onChangeTesthold(index,e.target.value)}
           />
         </td> */}

                    <td className="input-value-francis">
                      <input
                        type="number"
                        className="francis border border-none"
                        value={row.valuee[0]}
                        onChange={(e) =>
                          onChangeHandler(index, 0, e.target.value)
                        }
                      />
                    </td>
                    <td className="input-value-francis">
                      <input
                        type="number"
                        className="francis border border-none"
                        value={row.valuee[1]}
                        onChange={(e) =>
                          onChangeHandler(index, 1, e.target.value)
                        }
                      />
                    </td>
                    <td className="input-value-francis">
                      <input
                        type="number"
                        className="francis border border-none"
                        value={row.valuee[2]}
                        onChange={(e) =>
                          onChangeHandler(index, 2, e.target.value)
                        }
                      />
                    </td>
                    <td className="input-value-francis">
                      <input
                        type="number"
                        className="francis border border-none"
                        value={row.valuee[3]}
                        onChange={(e) =>
                          onChangeHandler(index, 3, e.target.value)
                        }
                      />
                    </td>
                    <td className="input-value-francis">
                      <input
                        type="number"
                        className="francis border border-none"
                        value={row.valuee[4]}
                        onChange={(e) =>
                          onChangeHandler(index, 4, e.target.value)
                        }
                      />
                    </td>
                    <td className="input-value-francis">
                      <input
                        type="number"
                        className="francis border border-none"
                        value={row.valuee[5]}
                        onChange={(e) =>
                          onChangeHandler(index, 5, e.target.value)
                        }
                      />
                    </td>
                    <td className="input-value-francis">
                      <input
                        type="number"
                        className="francis border border-none"
                        value={row.valuee[6]}
                        onChange={(e) =>
                          onChangeHandler(index, 6, e.target.value)
                        }
                      />
                    </td>
                    <td className="input-value-francis">
                      <input
                        type="number"
                        className="francis border border-none"
                        value={row.valuee[7]}
                        onChange={(e) =>
                          onChangeHandler(index, 7, e.target.value)
                        }
                      />
                    </td>
                    <td className="input-value-francis">
                      <input
                        type="number"
                        className="francis border border-none"
                        value={row.valuee[8]}
                        onChange={(e) =>
                          onChangeHandler(index, 8, e.target.value)
                        }
                      />
                    </td>
                    <td className="input-value-francis">
                      <input
                        type="number"
                        className="francis border border-none"
                        value={row.valuee[9]}
                        onChange={(e) =>
                          onChangeHandler(index, 9, e.target.value)
                        }
                      />
                    </td>
                    <td className="input-value-francis">
                      <input
                        type="number"
                        className="francis border border-none"
                        value={row.valuee[10]}
                        onChange={(e) =>
                          onChangeHandler(index, 10, e.target.value)
                        }
                      />
                    </td>
                    <td className="input-value-francis">
                      <input
                        type="number"
                        className="francis border border-none"
                        value={row.valuee[11]}
                        onChange={(e) =>
                          onChangeHandler(index, 11, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <textarea
                        value={row.remark}
                        onChange={(e) =>
                          onChangeHandlerRemark(index, e.target.value)
                        }
                        className="textarea-francis border border-none"
                        style={{ height: "43px" }}
                      ></textarea>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleSubmit(row.francis_id)}
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
      </div>
    </div>
  );
}

export default Francis;
