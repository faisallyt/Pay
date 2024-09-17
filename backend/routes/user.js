const express = require("express");
const { signupController } = require("../controllers/auth/signup");
const { signinController } = require("../controllers/auth/signin");

const router = express.Router();

router.post("/signup", signupController);

router.post("/signin", signinController);

module.exports = router;
