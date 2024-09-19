const mongoose = require("mongoose");

const AccountModel = {
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true },
};

const Account = mongoose.model("Account", AccountModel);

module.exports = { Account };
