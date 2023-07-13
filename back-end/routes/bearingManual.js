var express = require("express");
const db = require("../database/dbBearingManual");
var router = express.Router();
const jwt = require("jsonwebtoken");
const dbs = require("../database/connect");
const convertDate = require("../middlewares/formatDate");


router.get('/get/FS6/teshold/:unit_id/:name', async function (req,res) {
    try{
        const {unit_id,name} = req.params
        console.log(unit_id)
          const result = await db.gettesthold(unit_id,name)
         const results = result.recordset

        
          res.json(results)
    }
    catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})
router.put("/update/testhold", async function (req, res) {
    try {
      const {bearing_testhold_id,unit_id,high1,high2,high3,low1,low2,low3,name } = req.body
    console.log(bearing_testhold_id,unit_id,high1,high2,high3,low1,low2,low3,name )
      let result = []
       result = await db.updateTestholdData(bearing_testhold_id,high1,high2,high3,low1,low2,low3,unit_id,name);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  });

router.get('/get/:unit_id', async function (req,res) {
    try{
        const {unit_id} = req.params
        console.log(unit_id)
          const result = await db.getBearingManual(unit_id)
         const results = result.recordset
            // result = result.map((element) => {
            //     element.time = convertDate(element.time)
            // })
        
          res.json(results)
    }
    catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})


router.post('/add', async function(req,res)  {
    try{
        const { unit_id } = req.body
        const data = ["0","0"]
        const TGB = JSON.stringify(data)
        const LGB = JSON.stringify(data)
        const UGB = JSON.stringify(data)
        // const testhold = ["0","0","0"]
        // const testholdJson  = JSON.stringify(testhold)

         console.log(unit_id)
        let result = await db.addBearingManual(unit_id,TGB,LGB,UGB)
        res.json(result)
    }
    catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
})
router.post('/addMore', async function(req,res)  {
    try{
        const { unit_id,testhold } = req.body
        const data = ["0","0"]
        const TGB = JSON.stringify(data)
        const LGB = JSON.stringify(data)
        const UGB = JSON.stringify(data)
      
        const testholdJson  = JSON.stringify(testhold)

         console.log(unit_id)
         console.log(testhold)
        let result = await db.addBearingManual(unit_id,TGB,LGB,UGB,testholdJson)
        res.json(result)
    }
    catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
})


router.put('/update', async function (req,res) {
    try {
        const bearing_id = req.body[0].bearing_id
        const unit_id = req.body[0].unit_id
        const time = req.body[0].time
        const TGB = req.body[0].TGB
        const LGB = req.body[0].LGB
        const UGB = req.body[0].UGB
        // const testhole = req.body[0].testhold
        const remark = req.body[0].remark

         console.log(req.body)
        const TGBstr = JSON.stringify(TGB)
        const LGBstr = JSON.stringify(LGB)
        const UGBstr = JSON.stringify(UGB)
        // const testholdStr = JSON.stringify(testhole)

        let dates = new Date(req.body[0].time)
        let newDate = dates.toString()
        let newDates = JSON.stringify(newDate)
        let lastDate = convertDate(newDates)

          
        // console.log(lastDate)
       

         const result = await db.updateBearingManual(bearing_id,lastDate,TGBstr,LGBstr,UGBstr,remark);
         res.json(result)
        
    }
    catch(error) {
        console.log(error)
        res.json(400).json(error)
    }
})


module.exports = router;