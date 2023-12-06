const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModel = new Schema({
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
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userModel);

module.exports = User;
