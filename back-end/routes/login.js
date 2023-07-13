require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../database/dbRegister");
const dbs = require("../database/connect");
const { TableRow } = require("@mui/material");

router.post("/login", async function (req, res) {
  console.log(req.body.email);
  console.log(req.body.password);
  const data = await dbs.query(
    `SELECT * FROM user_table WHERE email = '${req.body.email}'`
  );

  const user = data.find((row) => row.email == req.body.email);

  if (user == null) {
    return res.status(400).json("cannot find user");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(
        { name: user.name, email: user.email },
        process.env.ACCESS_TOKEN_SECRET
      );
      console.log("token");
      console.log(accessToken);
      res.json({ status: "ok", message: "login success", token: accessToken });
    } else {
      return res.status(400);
    }
  } catch (err) {
    console.log(err);
    return res.status(400);
  }
});
module.exports = router;

