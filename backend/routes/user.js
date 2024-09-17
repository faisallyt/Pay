const express = require("express");
const { signupController } = require("../controllers/auth/signup");
const { signinController } = require("../controllers/auth/signin");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signupController);

router.post("/signin", signinController);

router.get("/testing", authMiddleware, async (req, res) => {
  console.log(req.userId, "  is the userID");
  return res.json({ message: "hello" });
});

module.exports = router;
