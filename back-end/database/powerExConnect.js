const db = require('mssql/msnodesqlv8')

// let db = {}
const config = {
    user: 'LOCAL',
    password: 'Ntpc123#',
    server: 'CBM-SCADA', // You can use 'localhost\\instance' to connect to named instance
    trustServerCertificate: true,
    database: 'PowerEx',
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
