const db = require("./connect");


db.post = (name,email,hashPassword) => {
    return db.query(
      `INSERT INTO user_table VALUES ('','${name}','${email}','${hashPassword}')`
    )
  };

  db.delete = (id) => {
    return db.query(
      `DELETE FROM manual_table WHERE id = ${id}`
    );
  }



module.exports = db;