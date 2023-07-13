const axios = require('axios');
let http = {}
let url = 'http://localhost:3001/loginRouter/login'
let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('token'),
    },
  };

http.post = async (data) =>  {
    return await axios.post(url,data,config);
}
export default http;