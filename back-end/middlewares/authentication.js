require("dotenv").config();
var jwt = require("jsonwebtoken");
function authentication(req, res, next) {
  // let header = req.headers.authorization || "";
  // let [type, token] = header.split(" ");
  // if (type === "Bearer" && token !== "undefined" && token !== undefined) {
  //   let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  //   if (payload) {
  //     req.user = payload;
  //     next();
  //   } else {
  //     res.status(401).json({ message: "Please Login" });
  //   }
  // } else {
  //   res.status(401).json({ message: "please Login" });

  // }
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ error: "token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).json({ error: "token invalid" });
  }
}
module.exports = authentication;
