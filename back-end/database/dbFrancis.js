const { disable } = require("debug");
const db = require("./connect");






// db.getUnit = (unit_id) => {
//     return db.query(
//       `SELECT * FROM unit_table WHERE unit_id = ${unit_id};`
//     );
//   };

// db.createFill = () => {
//   return db.query(
//     `INSERT INTO manual2_table (id,unit_id,time,valuee) VALUES ('','1','','') `
//   )
// }
db.getData = (unit_id) => {
  return db.query(
    `SELECT * FROM [dbo].[francis_table] WHERE unit_id = ${unit_id}  ORDER BY CASE WHEN time IS NULL THEN 1 ELSE 0 END, time ASC  `
  )
}
db.gettestholdFrancis = (unit_id) => {
  return db.query(
    `SELECT * FROM [dbo].[francis_testhold_table] WHERE unit_id = ${unit_id}`
  )
}
db.updateTesthold = (francis_testhold_id,unit_id,high1,high2,high3,low1,low2,low3) => {
  return db.query(
    `update [dbo].[francis_testhold_table] set high1 = ${high1},high2 = ${high2}, high3 = ${high3},low1 = ${low1},low2 = ${low2},low3=${low3} where unit_id = ${unit_id} AND francis_testhold_id = ${francis_testhold_id}`
  )
}



db.addFrancis = (unit_id,measurement_value,date_and_time,valuees) => {

  return db.query(
    `INSERT INTO [dbo].[francis_table] (unit_id,measurement_value,date_time,valuee,time) VALUES ('${unit_id}','${measurement_value}','${date_and_time}','${valuees}',null)`
  )
}
db.updateFrancis = (francis_id, valuees,time,remark) => {
  return db.query(
    `UPDATE [dbo].[francis_table] SET valuee='${valuees}',time='${time}',remark='${remark}' WHERE francis_id = ${francis_id} `
  )
}
db.getFrancisTesthold = (unit_id) => {
  return db.query(
    `SELECT *
    FROM [CBM].[dbo].[francis_testhold_table] INNER JOIN [CBM].[dbo].[unit_table] on francis_testhold_table.unit_id = unit_table.unit_id where francis_testhold_table.unit_id = ${unit_id}`
  )
}


module.exports = db;