var express = require("express");
const db = require("../database/dbChart");
var router = express.Router();
const jwt = require("jsonwebtoken");
const dbs = require("../database/connect");
const authentication = require("../middlewares/authentication");
const moment = require("moment");
// const momentTz = require('moment-timezone');


router.get("/line/:unit_id", async function (req, res) {
  try {
    let result = []
    const { unit_id } = req.params
    console.log(unit_id)
     result = await db.getLineChart(unit_id);
    result = result.recordset.map((element) => {
      
      element.time = moment.utc(element.time).format('YYYY-MM-DD HH:mm');
      return element;
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(400).json(error);
  }
});

router.get("/Exitation/:unit_id", async function (req, res) {
  try {
    let result = []
    const { unit_id } = req.params
    console.log(unit_id)
     result = await db.getExitationLine(unit_id);
    result = result.recordset.map((element) => {
      
      element.time = moment.utc(element.time).format('YYYY-MM-DD HH:mm');
      return element;
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(400).json(error);
  }
});

router.get("/bearing/:unit_id", async function (req, res) {
  try {
    let result = []
    const { unit_id } = req.params
    console.log(unit_id)
     result = await db.getbearingLine(unit_id);
    result = result.recordset.map((element) => {
      
      element.time = moment.utc(element.time).format('YYYY-MM-DD HH:mm');
      return element;
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(400).json(error);
  }
});
router.get("/testholdFS6/:unit_id", async function (req, res) {
  try {
    let result = []
    const { unit_id } = req.params
    console.log(unit_id)
     result = await db.getTestholdFS6(unit_id);

    
    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.json(400).json(error);
  }
});
router.get("/testholdBearing/:unit_id", async function (req, res) {
  try {
    let result = []
    const { unit_id } = req.params
    console.log(unit_id)
     result = await db.getTestholdBearing(unit_id);

    
    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.json(400).json(error);
  }
});
module.exports = router;
