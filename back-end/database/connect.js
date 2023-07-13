
// const mysql = require("mysql");


// let db = {};
// db.connect = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "cbm",
  
// });
// // db.query = db.connect.query;

// // * Important promise function
// db.query =(databaseQuery) => {
//   return new Promise(data => {
//       db.connect.query(databaseQuery, function (error, result) { // change db->connection for your code
//           if (error) {
//               console.log(error);
//               throw Error(error);
//           }
//           // try {
//           //     console.log(result);

//               data(result);

//           // } catch (error) {
//           //     data({});
//           //     throw Error(error);
//           // }

//       });
//   });

// }

// db.queryRes =(databaseQuery, response) => {
//   return new Promise(data => {
//       db.connect.query(databaseQuery, function (error, result) { // change db->connection for your code
//           if (error) {
//               console.log(error);
//               response.status(400).send(error.toString());
//               // throw error;
//           }
//           try {
//               data(result);

//           } catch (error) {
//             console.log('query err')
//               data({});
//               response.status(400).send(error.toString());
//               // throw error;
//           }

//       });
//   });

// }



// db.test = () => {
//   db.connect.connect((err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("connect databases success");
//     }
//   });
// };




const db = require('mssql/msnodesqlv8')

// let db = {}
const config = {
    user: 'LOCAL',
    password: 'Ntpc123#',
    server: 'CBM-SCADA', // You can use 'localhost\\instance' to connect to named instance
    trustServerCertificate: true,
    database: 'CBM',
    port: 1433
}


db.connect(config).then(pool => {
    // Query
    
    return pool.request()
}).then(result => {
    console.log('connect success')
}).catch(err => {
  console.log(err)
});




module.exports = db;
