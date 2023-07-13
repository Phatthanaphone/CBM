const axios = require('axios');
let http = {}
let url = 'http://localhost:3001/registerRouter'
let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('token'),
    },
  };

http.post = async (data) =>  {
    return await axios.post(`http://localhost:3001/registerRouter/register`,data);
}

export default http;