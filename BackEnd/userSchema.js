const mongoose = require("./db");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  confirmPassword: String,
  entranceTime: new ISODate(),
  entrancePic: String,
  leavingTime: new ISODate(),
  leavingPic: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
