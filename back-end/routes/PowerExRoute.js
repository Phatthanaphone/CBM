var express = require("express");
const db = require("../database/dbPowerEx");
const dbConnect = require("../database/powerExConnect");
var router = express.Router();
const jwt = require("jsonwebtoken");
const authentication = require("../middlewares/authentication");


router.get("/", async function (req, res) {
  try {
    let data = await db.getTag();
     let result = data.recordset
     const table = result 
     const tables = table.map(obj => obj.TABLE_NAME);
     const tag = 'Y101KRN131AP_XSPD'
 
    

     let unionAllQuery ='';
     let queryParams = [];
     for (let i = 0 ; i < tables.length; i++) {
      const table = tables[i];
      const query = `SELECT Minute_Time,Minute_Value FROM [PowerEx].[dbo].[${table}] WHERE Minute_TagID = (SELECT Tag_ID FROM [PowerEx].[dbo].[Tag] WHERE Tag_Name ='${tag}') AND Minute_Time BETWEEN '2018-03-01 00:02:21.000' AND '2018-04-01 00:01:07.000' `;
      unionAllQuery += query;
      if (i < tables.length - 1) {
        unionAllQuery += ' UNION ALL '
      }
      queryParams.push({name:'tag', type: dbConnect.NVarchar, value: tag});
     }

     const results = await dbConnect.query(unionAllQuery, queryParams);
     res.json(results.recordset)
  } catch (error) {
    console.log(error);
    res.json(400).json(error);
  }
});


module.exports = router;
