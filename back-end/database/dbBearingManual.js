const { disable } = require("debug");
const db = require("./connect");


db.addBearingManual = (unit_id,TGB,LGB,UGB) => {
  return db.query(
    `INSERT INTO bearing_manual_record_table (unit_id,TGB,LGB,UGB,time) VALUES ('${unit_id}','${TGB}','${LGB}','${UGB}',null)`
  )
}

db.gettesthold = (unit_id,name) => {
  return db.query(
    `SELECT * FROM [dbo].[bearing_testhold_table] WHERE unit_id = ${unit_id} and name = '${name}'`
  )
}

db.updateTestholdData = (bearing_testhold_id,high1,high2,high3,low1,low2,low3,unit_id,name) => {  
  return db.query(
    `UPDATE bearing_testhold_table SET high1 = ${high1}, high2=${high2}, high3 = ${high3}, low1= ${low1}, low2=${low2}, low3=${low3} WHERE unit_id = ${unit_id} and name = '${name}' and bearing_testhold_id = ${bearing_testhold_id} `
  )
}

db.getBearingManual = (unit_id) => {

  return db.query(
    `SELECT * FROM bearing_manual_record_table WHERE unit_id =${unit_id} ORDER BY CASE WHEN time IS NULL THEN 1 ELSE 0 END, time ASC `
  )
}
db.updateBearingManual = (bearing_id,time,TGBstr,LGBstr,UGBstr,remark) => {
  return db.query(
    `UPDATE bearing_manual_record_table SET time ='${time}',TGB='${TGBstr}',LGB='${LGBstr}',UGB='${UGBstr}',remark='${remark}' WHERE bearing_id = ${bearing_id} `
  )
}


module.exports = db;