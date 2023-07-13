const db = require("./connect");




db.get = () => {
    return db.query(
      `SELECT * FROM manual_table;`
    );
  };
db.getByID = (id) => {
    return db.query(
      `SELECT * FROM manual_table WHERE id = ${id}`
    )
}

db.addMaunual = (id,phase,name,DES,unit,week,valuee) => {
    return db.query(
      `INSERT INTO manual_table (id,phase,name,DES,unit,week,valuee) VALUES (${id},'${phase}','${name}','${DES}','${unit}','${week}','${valuee}')`
    )
  };

  db.delete = (id) => {
    return db.query(
      `DELETE FROM manual_table WHERE id = ${id}`
    );
  }

  db.update = (id,phase,name,DES,unit,week,valuee,main_id) => {
    return db.query(
      `UPDATE manual_table SET id = "${id}",phase = "${phase}",name = "${name}",DES="${DES}",unit="${unit}",week="${week}",valuee="${valuee}" WHERE id ="${main_id}"`
    )
  }

 db.searchManual = (search) => {
   return db.query(
     `SELECT * FROM manual_table WHERE id LIKE '${search}%' OR name LIKE '${search}%' OR DES LIKE '${search}%' OR unit LIKE '${search}%' OR week LIKE '${search}%' OR valuee LIKE '${search}%' OR time LIKE '${search}%'   `
    //  `SELECT * FROM manual_table WHERE id LIKE '${search}%' OR name LIKE '${search}%' OR DES LIKE '${search}%' OR unit LIKE '${search}% OR week LIKE '${search}%' OR valuee LIKE '${search}% OR time LIKE '${search}%   `
   )
 }


module.exports = db;