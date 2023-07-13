const axios = require('axios');
let http = {}
let url = `http://localhost:3001/bearingManual/add`
let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('token')
    },
  };
// http.get = async () =>  {
//     return await axios.get(url, config);
// }
http.addBearingManual = async (data) => {
    return await axios.post(`http://localhost:3001/bearingManual/add`,data)
}
http.addBearingManualMore = async (data) => {
    return await axios.post(`http://localhost:3001/bearingManual/addMore`,data)
}
http.getBearingManual = async (unit_id) =>  {
    return await axios.get(`http://localhost:3001/bearingManual/get/${unit_id}`);
}
http.getTestholdBearingManual = async (unit_id,name) =>  {
    return await axios.get(`http://localhost:3001/bearingManual/get/FS6/teshold/${unit_id}/${name}`);
}

http.updateBearingManual = async (data) => {
    return await axios.put(`http://localhost:3001/bearingManual/update`,data)
}
http.updateBearingManualTesthold = async (data) => {
    return await axios.put(`http://localhost:3001/bearingManual/update/testhold`,data)
}

// http.update = async (id,data) => {
//     return await axios.put(`http://localhost:3001/update/${id}`,data,config)
// }

// //Auto manage

// http.getAllUnit = async () => {
//     return await axios.get(`http://localhost:3001/manual/getAllUnit`, config)
// }
// //getByUnit_id
// http.getUnit = async (unit_id) => {
//     return await axios.get(`http://localhost:3001/manual/getunit/${unit_id}`, config)
// }
// http.getData = async () => {
//     return await axios.get(`http://localhost:3001/manual/getdata`, config)
// }

// http.addData = async (data) => {
//     return await axios.post('http://localhost:3001/manual/addata',data,config)
// }
// http.updateData = async (data) => {
//     return await axios.put(`http://localhost:3001/manual/update`,data, config)
// }
// http.getDataById = async (unit_id) => {
//     return await axios.get(`http://localhost:3001/manual/getDataById/${unit_id}`, config)
// }



export default http;