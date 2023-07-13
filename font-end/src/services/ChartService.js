const axios = require('axios');
let http = {}
let url = 'http://localhost:3001/chart/line'
let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('token'),
    },
  };

http.getLine = async (unit_id) =>  {
    return await axios.get(`http://localhost:3001/chart/line/${unit_id}`,config);
}
http.ExitationLine = async (unit_id) =>  {
    return await axios.get(`http://localhost:3001/chart/exitation/${unit_id}`,config);
}
http.bearingLine = async (unit_id) =>  {
    return await axios.get(`http://localhost:3001/chart/bearing/${unit_id}`,config);
}
http.getTesholdBearing = async (unit_id) =>  {
    return await axios.get(`http://localhost:3001/chart/testholdBearing/${unit_id}`,config);
}
export default http;