import React from "react";
// import ReactDOM from 'react-dom/client';
import ReactDOM from "react-dom";
import "./index.css";
import ManualAdd from "./ManualAdd";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import ManualManage from "./ManualManage";
import Sidebar from './Sidebar'
import ManualEdit from "./ManualEdit";
import AutoManage from "./AutoManage";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import DoughnutChart from "./components/DoughnutChart";
import PageNotFound from "./components/PageNotFound";
import Register from "./components/Register";
import Login from "./components/Login";
import Francis from "./components/Francis";
import InjecTailwind from "./InjectTailwind";
import { AuthProvider } from "./components/auth";
import { RequireAuth } from "./components/RequireAuth";
import ExitationChart from "./components/Chart/ExitationChart";
import BearingManualRecord from './components/BearingManualRecord'
import BearingChart from "./components/Chart/BearingChart";
import FS6 from "./components/Chart/FS6";
import Test from "./components/Test";
import PowerExChart from "./components/Chart/PowerExChart";
import './Route.css'
ReactDOM.render(
  <React.StrictMode>
     {/* <AuthProvider> */}
      <InjecTailwind>
     
        <Router >
          <Routes >
          {/* <Route  exact
              
              path="/PowerEx"
              element={
                <>
                  <RequireAuth>
                    <Navbar/>
                    <PowerExChart/>
                  </RequireAuth>
                </>
              }
            /> */}
          <Route  exact
              
              path="/FS6/:unit_id"
              element={
                <>
                  {/* <RequireAuth> */}
                    <Navbar/>
                    <FS6/>
                  {/* </RequireAuth> */}
                </>
              }
            />
          <Route exact
              
              path="/BearingChart/:unit_id"
              element={
                <>
                  {/* <RequireAuth> */}
                    <Navbar/>
                    <BearingChart/>
                  {/* </RequireAuth> */}
                </>
              }
            />
          <Route exact
              
              path="/ExiChart/:unit_id"
              element={
                <>
                  {/* <RequireAuth> */}
                    <Navbar/>
                    <ExitationChart/>
                  {/* </RequireAuth> */}
                </>
              }
            />
          <Route exact
              path="/barchart/:unit_id"
              element={
                <>
                  {/* <RequireAuth> */}
                    <Navbar/>
                    <BarChart/>
                  {/* </RequireAuth> */}
                </>
              }
            />
          <Route exact
              path="/doughnutchart/:unit_id"
              element={
                <>
                  {/* <RequireAuth> */}
                    <Navbar/>
                    <DoughnutChart/>
                  {/* </RequireAuth> */}
                </>
              }
            />
          <Route exact
              path="/linechart/:unit_id"
              element={
                <>
                  {/* <RequireAuth> */}
                    <Navbar/>
                    <LineChart/>
                  {/* </RequireAuth> */}
                </>
              }
            />
            <Route exact
              path="/login"
              element={
                <>
                    <Login />
                </>
              }
            />

            <Route exact
              path="/automanage/:unit_id"
              element={
                <>
                  {/* <RequireAuth> */}
                    <Navbar/>
                    <AutoManage/>
                  {/* </RequireAuth> */}
                </>
              }
            />
             <Route exact  path="/Test" element={<><Test/></>}/>
            <Route exact
              path="/bearingManual/:unit_id"
              element={
                <>
                  {/* <RequireAuth> */}
                    <Navbar/>
                    <BearingManualRecord/>
                  {/* </RequireAuth> */}
                </>
              }
            />
            <Route exact
              path="/register"
              element={
                <>
                  {/* <RequireAuth> */}
                    <Navbar/>
                    <Register/>
                  {/* </RequireAuth> */}
                </>
              }
            />
            <Route exact
              path="/bearingManual"
              element={
                <>
                  {/* <RequireAuth> */}
                    <Navbar/>
                    <BearingManualRecord />
                  {/* </RequireAuth> */}
                </>
              }
            />
            <Route exact
              path="/francis/:unit_id"
              element={
                <>
                  {/* <RequireAuth> */}
                    <Navbar/>
                    <Francis />
                  {/* </RequireAuth> */}
                </>
              }
            />


            <Route exact
              path="/editManual/:id"
              element={
                <>
                  {/* <RequireAuth> */}
                    <Navbar/>
                    <ManualEdit/>
                  {/* </RequireAuth> */}
                </>
              }
            />
            <Route exact
              path="/addManual"
              element={
                <>
                  {/* <RequireAuth> */}
                    <Navbar/>
                    <ManualAdd/>
                  {/* </RequireAuth> */}
                </>
              }
            />
            <Route exact
              path="/"
              exact
              element={
                <>
                  {/* <RequireAuth> */}
                  {/* <Sidebar /> */}
                    <Navbar/>
                    <Home/>
                  {/* </RequireAuth> */}
                </>
              }
            />
            {/* <Route exact component={PageNotFound} /> */}


          </Routes>
        </Router>
       
      </InjecTailwind>
      {/* </AuthProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
