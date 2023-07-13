const { disable } = require("debug");
const db = require("./connect");




db.getAllUnit = () => {
    return db.query(
      `SELECT * FROM unit_table ;`
    );
  };

db.getUnit = (unit_id) => {
    return db.query(
      `SELECT * FROM unit_table WHERE unit_id = ${unit_id};`
    );
  };
db.getTestholdTTT = (unit_id,phase) => {
    return db.query(
      `SELECT * FROM FS6_testhold_table where unit_id = ${unit_id} and phase = '${phase}'`
    );
  };

db.createFill = () => {
  return db.query(
    `INSERT INTO manual2_table (id,unit_id,time,valuee) VALUES ('','1','','') `
  )
}
db.getData = () => {
  return db.query(
    `SELECT * FROM manual2_table`
  )
}
db.updateData = (id, unit_id,time, datas,remark) => {  
  return db.query(
    `UPDATE manual2_table SET unit_id = '${unit_id}',time= '${time}',value='${datas}',remark='${remark}' WHERE id = '${id}' `
  )
}
db.updateTestholdDataFS6 = (FS6_testhold_id,high1,high2,high3,low1,low2,low3,unit_id,phase) => {  
  return db.query(
    `UPDATE FS6_testhold_table SET high1 = ${high1}, high2=${high2}, high3 = ${high3}, low1= ${low1}, low2=${low2}, low3=${low3} WHERE unit_id = ${unit_id} and phase = '${phase}' and FS6_testhold_id = ${FS6_testhold_id} `
  )
}


db.addData = (unit, datas) => {
  return db.query(
    `INSERT INTO manual2_table (unit_id,time,value) VALUES ('${unit}',null,'${datas}')`
  )
}
db.getDataById = (unit_id) => {
  return db.query(
    `SELECT * FROM [dbo].[manual2_table] WHERE unit_id = ${unit_id} ORDER BY CASE WHEN time IS NULL THEN 1 ELSE 0 END, time ASC `
  )
}

db.getTesthold = () => {
  return db.query(
    `  SELECT TOP (1) [id]
    ,[unit_id]
    ,[time]
    ,[value]
    ,[testhold]  
FROM [CBM].[dbo].[manual2_table] WHERE testhold <> '["0","0","0","0","0","0"]' ORDER BY id DESC`
  )
}

module.exports = db;