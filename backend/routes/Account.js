const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getBalance } = require("../controllers/AccountControllers/Index");

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);

module.exports = router;
