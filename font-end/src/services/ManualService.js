const axios = require('axios');
let http = {}
let url = 'http://localhost:3001/get'
let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('token')
    },
  };
http.getTestholdData = async (unit_id,phase) =>  {
    return await axios.get(`http://localhost:3001/manual/getTesthold/${unit_id}/${phase}`, config);
}
http.get = async () =>  {
    return await axios.get(url, config);
}
http.getByID = async (id) => {
    return await axios.post(`http://localhost:3001/getByID/${id}`, config)
}
http.post = async (data) =>  {
    return await axios.post('http://localhost:3001/add',data, config);
}

http.delete = async (id) => {
    return await axios.delete(`http://localhost:3001/delete/${id}`,config)
}

http.update = async (id,data) => {
    return await axios.put(`http://localhost:3001/update/${id}`,data,config)
}

//Auto manage

http.getAllUnit = async () => {
    return await axios.get(`http://localhost:3001/manual/getAllUnit`, config)
}
http.getUnit = async (unit_id) => {
    return await axios.get(`http://localhost:3001/manual/getunit/${unit_id}`, config)
}
http.getData = async () => {
    return await axios.get(`http://localhost:3001/manual/getdata`, config)
}

http.addData = async (unit_id) => {
    return await axios.post(`http://localhost:3001/manual/addata/${unit_id}`,config)
}
http.addDataMore = async (data) => {
    return await axios.post(`http://localhost:3001/manual/addata/`,data,config)
}



http.updateData = async (data) => {
    return await axios.put(`http://localhost:3001/manual/update`,data, config)
}
http.updateTestholdFS6 = async (data) => {
    return await axios.put(`http://localhost:3001/manual/update/testhold`,data, config)
}
http.getDataById = async (unit_id) => {
    return await axios.get(`http://localhost:3001/manual/getDataById/${unit_id}`, config)
}

http.getTesthold = async (unit_id) => {
    return await axios.get(`http://localhost:3001/chart/testholdFS6/${unit_id}`)

}
export default http;