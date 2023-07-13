const axios = require('axios');
let http = {}
let url = 'http://localhost:3001/get'
let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('token')
    },
  };


http.get = async (unit_id) => {
    return await axios.get(`http://localhost:3001/francis/get/${unit_id}`, config)
}
http.getTesthold = async (unit_id) => {
  //test
    return await axios.get(`http://localhost:3001/francis/getFrancis/${unit_id}`, config)
}


http.add = async (unit_id) => {
    return await axios.post(`http://localhost:3001/francis/addfrancis/${unit_id}`, config)
}
http.addDataMore = async (data) => {
    return await axios.post(`http://localhost:3001/francis/addfrancis`,data)
}
http.update = async (data) => {
  return await axios.put(`http://localhost:3001/francis/update`,data, config)
}
http.updateTesthold = async (dataTesthold) => {
  return await axios.put(`http://localhost:3001/francis/update/testhold`,dataTesthold)
}

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