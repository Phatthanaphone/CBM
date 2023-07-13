var express = require("express");
const db = require("../database/dbManual");
var router = express.Router();
const jwt = require("jsonwebtoken");
const dbs = require("../database/connect");
const authentication = require("../middlewares/authentication");

const moment = require("moment");

router.get("/get", async function (req, res) {
  try {
    let result = [];
    result = await db.get();
    result = result.map((element) => {
      element.time = moment(element.time).format("DD-MM-YYYY H:mm");
      return element;
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("getByID/:id", async function (req, res) {
  try {
    const { id } = req.params;
    let result = await db.getByID(id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

//  router.post('/add', async function (req,res) {
//         //      let header = req.headers.authorization || "";
//         // let [type, token] = header.split(" ");
//         // let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         //     console.log(token)
//     const data = await dbs.query(`SELECT * FROM manual_table`)

//     const data1 = data.find(data1 => data1.id == req.body.id);
//     if (data1) {
//         return res.status(400).send('this ID is already exist')
//     }
//     try {
//             const {id,name,DES,unit,week,valuee} = req.body

//             let result = []
//                 result =  await db.addMaunual(id,name,DES,unit,week,valuee)
//                 res.json(result);
//     }
//     catch(error) {
//         console.log(error)
//         res.status(500)
//     }
// // }
//  })

router.post("/add", async function (req, res) {
  //      let header = req.headers.authorization || "";
  // let [type, token] = header.split(" ");
  // let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  //     console.log(token)
  const sql = `SELECT * FROM manual_table WHERE id = '${req.body.id}'`;

  const isExist = await dbs.query(sql);

  if (isExist.length > 0) {
    return res.status(400).send("this ID is already exist");
  } else {
    try {
      const { id,phase, name, DES, unit, week, valuee } = req.body;
   console.log(req.body)
      let result = [];
      result = await db.addMaunual(id,phase, name, DES, unit, week, valuee);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
});

router.delete("/delete/:id", async function (req, res) {
 
 
  try {
    let header = req.headers.authorization || "";
    let [type, token] = header.split(" ");
    let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(token);
    const { id } = req.params;
    let result = [];
    console.log(id);

    result = await db.delete(id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.put("/update/:id", async function (req, res) {


  const sql = `SELECT * FROM manual_table WHERE id = '${req.body.id}'`;
  const paramId = `SELECT * FROM manual_table WHERE id = '${req.params.id}'`;
  const compareId = await dbs.query(paramId);
  const isExist = await dbs.query(sql);

   console.log(req.params.id)
   console.log(req.body.id)
 
  // const data = await dbs.query(`SELECT * FROM manual_table`);
  // const data1 = data.find((data1) => data1.id == req.params.id);
   

  if (isExist.length > 0 && req.params.id != req.body.id ) {
    return res.status(400).send("this ID is already exist");
  }
     
  try {
    const { id,phase, name, DES, unit, week, valuee } = req.body;
    const main_id = req.params.id;
    console.log(req.body);
    
    let result = [];
    result = await db.update(id,phase, name, DES, unit, week, valuee, main_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

  router.get('/search/:search', async function (req,res) {
    try {
           const {search} = req.params
           let result = await db.searchManual(search)
           res.json(result);
    } 
    catch(error){
      console.log(error);
      res.status(400).json(error)
    }
  } )



  
module.exports = router;
