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
  entrancePic: {
    type: String,
  },
  entranceTime: {
    type: Date,
    default: Date.now(),
  },
  leavingTime: {
    type: Date,
    default: null,
  },
});

const User = mongoose.model("User", userModel);

module.exports = User;
