const { User } = require("../../schema/User");

const fetchUser = async (req, res) => {
  const query = req.query.filter;
  try {
    const users = await User.find({
      $or: [
        { firstName: new RegExp(query, "i") },
        { lastName: new RegExp(query, "i") },
      ],
    });
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Users Found Succesfully", users });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = fetchUser;
