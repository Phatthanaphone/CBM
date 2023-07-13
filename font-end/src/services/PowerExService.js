const axios = require('axios');
let http = {}
let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('token'),
    },
  };

http.getDataFromPowerEx = async () =>  {
    return await axios.get(`http://localhost:3001/powerEx`);
}

export default http;