var express = require("express");
const db = require("../database/dbManual2");
var router = express.Router();
const jwt = require("jsonwebtoken");
const dbs = require("../database/connect");
const authentication = require("../middlewares/authentication");
var timezone = require('timezone')
const moment = require("moment");
const convertDate = require("../middlewares/formatDate");

router.get("/getDataById/:unit_id", async function (req, res) {
  try {
    const { unit_id } = req.params;
    let result = [];
    result = await db.getDataById(unit_id);
    console.log(unit_id)
    //     result = result.map((element) => {
    //       element.time = convertDate(element.time);
    //   return element;
    // });
    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
router.post("/createfill", async function (req, res) {
  try {
    let result = await db.createFill();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
router.put("/update/testhold", async function (req, res) {
  try {
    const {FS6_testhold_id,unit_id,high1,high2,high3,low1,low2,low3,phase } = req.body
  console.log(FS6_testhold_id,unit_id,high1,high2,high3,low1,low2,low3,phase )
    let result = []
     result = await db.updateTestholdDataFS6(FS6_testhold_id,high1,high2,high3,low1,low2,low3,unit_id,phase);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/getdata", async function (req, res) {
  try {
    let result = await db.getData();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
router.get("/getdata", async function (req, res) {
  try {
    let result = await db.getData();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/getTesthold/:unit_id/:phase", async function (req, res) {
  try {
    const {unit_id,phase} = req.params
    // const {phase} = req.body
    console.log(unit_id)
    console.log(phase)
    
    // console.log(req.body)
   
    let result = await db.getTestholdTTT(unit_id,phase);
    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/getAllUnit", async function (req, res) {
  try {
    const result = await db.getAllUnit();
    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/getunit/:unit_id", async function (req, res) {
  try {
    const { unit_id } = req.params;
    let result = await db.getUnit(unit_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
router.post("/add", async function (req, res) {
  try {
    let { unit_id, phase_id, gc_id, date_and_time, valuee } = req.body;
    console.log(req.body);
    // let result = await db.addData(
    //   unit_id,
    //   phase_id,
    //   gc_id,
    //   date_and_time,
    //   valuee
    // );
    // res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.put("/update", async function (req, res) {
  try {
     
    console.log(req.body)
    const id = req.body[0].id;
    const unit_id = req.body[0].unit_id;
    const time = req.body[0].time;
    const valuee = req.body[0].valuee;
    // const testhold = req.body[0].testhold;
    const remark = req.body[0].remark

    const datas = JSON.stringify(valuee);
    // const testholds = JSON.stringify(testhold);
    
    let dates = new Date(req.body[0].time)

     let newDate = dates.toString()
     let newDates = JSON.stringify(newDate)
     let lastDate = convertDate(newDates)
     console.log(req.body)


    const result = await db.updateData(id, unit_id,lastDate, datas,remark);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(400).json(error);
  }
});


router.post("/addata", async function (req, res) {
  try {
    const {id,unit_id,testhold} = req.body
    console.log(testhold)
    console.log(id)
    console.log(unit_id)
    // const { unit_id } = req.params;
    // console.log(unit_id)
    // const time = null
    console.log(req.body)
    const data = JSON.stringify(['0','0','0','0','0','0',])
    const testholds = JSON.stringify(testhold)
    // console.log(testholds)
    let result = await db.addData(unit_id, data,testholds);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(400).json(error);
  }
});
router.post("/addata/:unit_id", async function (req, res) {
  try {
    const { unit_id } = req.params;
    console.log(unit_id)
    const time = null
    const data = JSON.stringify(['0','0','0','0','0','0',])
    // const testholds = JSON.stringify(['0','0','0','0','0','0',])
    // console.log(testholds)
    let result = await db.addData(unit_id, data);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(400).json(error);
  }
});

router.get('/updateTesthold', async function(req,res)  {
  try {
         const result = await db.getTesthold()
         res.json(result.recordset);
  }
  catch (error) {
    console.log(error);
    res.json(400).json(error);
  }
})
module.exports = router;
