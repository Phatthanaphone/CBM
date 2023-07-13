var express = require("express");
const db = require("../database/dbFrancis");
var router = express.Router();
const jwt = require("jsonwebtoken");
const dbs = require("../database/connect");
const convertDate = require("../middlewares/formatDate");





router.get('/getFrancis/:unit_id', async function (req,res) {
    try {
         const { unit_id } = req.params
         let result = []
         console.log(unit_id)
         result = await db.gettestholdFrancis(unit_id)
       
         res.json(result.recordset)
    }
    catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
})

router.get('/get/:unit_id', async function (req,res) {
    try {
         const { unit_id } = req.params
         let result = []
         result = await db.getData(unit_id)
        //  ressult = result.map(e => ({...e, valuee: JSON.parse(e.valuee)}))
         res.json(result.recordset)
    }
    catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
})
router.put('/update/testhold', async function (req,res) {
    try {
         const {francis_testhold_id,unit_id,high1,high2,high3,low1,low2,low3 } = req.body
         
         let result = []
         console.log(req.body);
         result = await db.updateTesthold(francis_testhold_id,unit_id,high1,high2,high3,low1,low2,low3 )
         res.json(result);
         
    }
    catch(error) {
        console.log(error)
        res.status(400).json(error);
    }
})
router.put('/updateFrancis', async function (req,res) {
    try {
         const {francis_id, valuee } = req.body
         let result = []
         result = await db.updateFrancis(francis_id, valuee)
         res.json(result)
         
    }
    catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
})

router.post('/addfrancis/:unit_id', async function (req,res) {
    try{
          const { unit_id } = req.params
          console.log(unit_id)
         
            const data = 
            [
                ["<3", "Overall Vib velo3(mm/s)"],
                ["<3", "Overall Vib velo4(mm/s)"],
                [">28", "F0(Hz)"],
                ["<25000", "Operating hour(hrs.)"],
                ["<1.7", "Flap opening time(s)"],
                [">9.5", "Capacitor (µF)"],
                ["<1.4", "Current consumption(A)"],
                ["200<I<260", "Voltage (VAC)"],
            ]

            const arrayValuee = JSON.stringify(['0','0','0','0','0','0','0','0','0','0','0','0',])
            console.log(arrayValuee)
            for (var i = 0;i < data.length; i++ ) {
                let result = await db.addFrancis(unit_id,data[i][0],data[i][1],arrayValuee)
                console.log(unit_id)
            }
            res.send("success");

    }
   catch(error) {
       console.log(error)
       res.json(400).json(error)
   }
})
// router.post('/addfrancis', async function (req,res) {
//     try{

//           const { valuee,unit_id } = req.body
//             const data = 
//             [
//                 ["<3", "Overall Vib velo3(mm/s)"],
//                 ["<3", "Overall Vib velo4(mm/s)"],
//                 [">28", "F0(Hz)"],
//                 ["<25000", "Operating hour(hrs.)"],
//                 ["<1.7", "Flap opening time(s)"],
//                 [">9.5", "Capacitor (µF)"],
//                 ["<1.4", "Current consumption(A)"],
//                 ["200<I<260", "Voltage (VAC)"],
//             ]
//             console.log('francis')
        
//             const arrayValuee = JSON.stringify(valuee)
//             console.log(arrayValuee)
//             for (var i = 0;i < data.length; i++ ) {
//                 let result = await db.addFrancis(unit_id,data[i][0],data[i][1],arrayValuee)
//                 console.log(unit_id)
//             }
//             res.send("success");

//     }
//    catch(error) {
//        console.log(error)
//        res.json(400).json(error)
//    }
// })

router.put('/update', async function(req,res) {
    try {
       const francis_id = req.body[0].francis_id
       const valuee = req.body[0].valuee
    //    const testhold = req.body[0].testhold
       const remark = req.body[0].remark
       let dates = new Date(req.body[0].time)
       let newDate = dates.toString()
       let newDates = JSON.stringify(newDate)
       let lastDate = convertDate(newDates)
       const valuees = JSON.stringify(valuee)

    // console.log(testhold)
    let result = await db.updateFrancis(francis_id, valuees,lastDate,remark)
    res.json(result)
   }
   catch(error) {
       console.log(error)
       res.status(400).json(error)
   }
})


module.exports = router;