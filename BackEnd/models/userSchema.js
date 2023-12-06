const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  entranceTime: {
    type: Date,
    default: Date.now(),
  },
  entrancePic: String,
  leavingTime: {
    type: Date,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
