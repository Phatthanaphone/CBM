const jwt = require('jsonwebtoken')
var db = require('../database/connect')

const userAuthentication = async (req,res,next) =>  {
    let header = req.headers.authorization || "";
    let [type, token] = header.split(" ");
    // const user = await db.query(`SELECT * FROM user_table Where email = '${playload.email}'`)
    try {
        let payload = jwt.verify(token, secret);
        const user = await db.query(`SELECT * FROM user_table Where email = '${playload.email}'`)
        if (payload.name === user[0].name || payload.email === user[0].email) {
            req.user = payload
            next()
        }
    }
    catch(error) {
        console.log(error)
        res.status(400).json(error.message)
    }
}


module.exports = userAuthentication;