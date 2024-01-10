const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    base64: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userModel);

module.exports = User;
