const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../../schema/User");
const JWT_SECRET = require("../../config");

const signInSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const signinController = async (req, res) => {
  const { username, password } = req.body;

  const { success } = signInSchema.safeParse({ username, password });

  if (!success) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);

  return res.status(200).json({
    message: "Logged in successfully",
    user,
    token,
  });
};

module.exports = {
  signinController,
};
