const { disable } = require("debug");
const db = require("./connect");




db.getTestholdBearing = (unit_id) => {
    return db.query(
      `SELECT * FROM bearing_testhold_table where unit_id = ${unit_id} ;`
    );
  };
db.getTestholdFS6 = (unit_id) => {
    return db.query(
      `SELECT * FROM FS6_testhold_table where unit_id = ${unit_id} ;`
    );
  };
db.getLineChart = (unit_id) => {
    return db.query(
      `SELECT * FROM manual2_table WHERE unit_id = ${unit_id} AND time !='' ORDER BY time ;`
    );
  };

  db.getExitationLine = (unit_id) => {
    return db.query(
      `SELECT * FROM francis_table WHERE unit_id = ${unit_id} AND time !='' ORDER BY time`
    )
  }
  db.getbearingLine = (unit_id) => {
    return db.query(
      `SELECT * FROM bearing_manual_record_table WHERE unit_id = ${unit_id} AND time !='' ORDER BY time`
    )
  }



module.exports = db;