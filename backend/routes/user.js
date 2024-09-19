const express = require("express");
const { signupController } = require("../controllers/auth/signup");
const { signinController } = require("../controllers/auth/signin");
const authMiddleware = require("../middlewares/authMiddleware");
const updateController = require("../controllers/auth/update");
const fetchUser = require("../controllers/UserControllers/UserOperations");

const router = express.Router();

router.post("/signup", signupController);

router.post("/signin", signinController);

router.put("/update", authMiddleware, updateController);

router.get("/find", authMiddleware, fetchUser);

module.exports = router;
