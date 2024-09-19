const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getBalance,
  transaction,
} = require("../controllers/AccountControllers/Index");

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.put("/transaction", authMiddleware, transaction);

module.exports = router;
