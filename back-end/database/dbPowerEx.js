const { disable } = require("debug");
const db = require('./powerExConnect')


db.getTag = () => {
  return db.query(
    // `SELECT * FROM [PowerEx].[dbo].[Tag] `
    `USE PowerEx;
    SELECT name as TABLE_NAME
    FROM sys.tables
    WHERE type = 'U'
    AND name LIKE 'MinuteData_%'
    `
  )
}


module.exports = db;


// `SELECT * FROM tag INNER JOIN MinuteData_2022_05 ON tag.Tag_ID = MinuteData_2022_05.Minute_TagID`
//Y101KRN131AP_XSPD
