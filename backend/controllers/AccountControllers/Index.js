const { default: mongoose } = require("mongoose");
const { Account } = require("../../schema/Account");
const { User } = require("../../schema/User");

const transaction = async (req, res) => {
  const { receiver, amount } = req.body;
  const userId = req.userId;
  console.log(userId);
  console.log("hello");
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (receiver === userId) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid Operation" });
    }

    if (amount <= 0) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid Amount" });
    }
    const senderUser = await User.findById(userId).session(session);
    if (!senderUser) {
      await session.abortTransaction();
      return res.status(404).json({ message: "sender not found" });
    }

    const receiverUser = await User.findById(receiver).session(session);
    if (!receiverUser) {
      await session.abortTransaction();
      return res.status(404).json({ message: "receiver not found" });
    }

    const senderAccount = await Account.findOne({
      userId: senderUser._id,
    }).session(session);

    if (!senderAccount) {
      await session.abortTransaction();
      return res.status(404).json({ message: "sender account not found" });
    }

    if (senderAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const receiverAccount = await Account.findOne({ userId: receiver }).session(
      session
    );

    if (!receiverAccount) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Receiver account not found" });
    }

    await Account.updateOne(
      { userId: userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: receiver },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    return res.status(200).json({ message: "Transaction Successfully" });
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
