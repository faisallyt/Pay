const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeaders = req.headers?.authorization;
    let token = "";
    if (authHeaders && authHeaders.startsWith("Bearer")) {
      console.log("hello");
      token = authHeaders.split(" ")[1];
      console.log(token);
    } else {
      return res.status(400).json({ message: "Invalid" });
    }

    const decoded = jwt.decode(token, JWT_SECRET);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

module.exports = authMiddleware;
