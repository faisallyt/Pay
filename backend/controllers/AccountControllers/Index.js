const { Account } = require("../../schema/Account");
const { User } = require("../../schema/User");

const transaction = async (req, res) => {
  const { receiver, sender, amount } = req.body;
  try {
    const senderUser = await User.findById(sender);
    if (!senderUser) {
      return res.status(404).json({ message: "sender not found" });
    }

    const receiverUser = await User.findById(receiver);
    if (!receiverUser) {
      return res.status(404).json({ message: "receiver not found" });
    }

    const senderAccount = await Account.findOne({ userId: senderUser._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error", error });
  }
};

const getBalance = async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const account = await Account.findOne({ userId: user._id });

    if (!account) {
      return res.status(404).json({ message: "account not found" });
    }

    return res.status(200).json({ balance: account.balance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error", error });
  }
};

module.exports = { transaction, getBalance };
