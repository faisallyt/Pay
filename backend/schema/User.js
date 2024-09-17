const mongoose = require("mongoose");

const UserSchema = {
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  firstName: { type: String, required: true, trim: true, maxLength: 50 },
  lastName: { type: String, required: true, trim: true, maxLength: 50 },

  password: { type: String, required: true, minLength: 6 },

  isActive: { type: Boolean, required: true, default: true },
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
