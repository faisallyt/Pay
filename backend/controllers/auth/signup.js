const zod = require("zod");
const { User } = require("../../schema/User.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../../config.js");
const { Account } = require("../../schema/Account.js");
const signupSchema = zod.object({
  username: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});
const signupController = async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);

  if (!success) {
    return res.status(400).json({
      message: "Incorrect Inputs",
    });
  }

  const user = await User.findOne({
    username: body.username,
  });
  console.log("printing signupController");

  if (user) {
    return res.status(409).json({ message: "User registered Already" });
  }
  body.isActive = true;
  const createdUser = await User.create(body);

  await Account.create({
    userId: createdUser._id,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId: createdUser._id,
    },
    JWT_SECRET
  );

  const { password, ...userWithoutPassword } = body;

  return res.json({
    message: "User registered successfully",
    user: userWithoutPassword,
    token: token,
  });
};

module.exports = {
  signupController,
};
