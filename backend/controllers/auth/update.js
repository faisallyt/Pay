const { User } = require("../../schema/User");
const zod = require("zod");

const updateSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});
const updateController = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, password } = req.body;

    const { success } = updateSchema.safeParse({
      firstName,
      lastName,
      password,
    });

    if (!success) {
      return res.status(400).json({ message: "Invalid input" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    (user.firstName = firstName),
      (user.lastName = lastName),
      (user.password = password),
      await user.save();

    return res.status(200).json({ message: "User Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = updateController;
