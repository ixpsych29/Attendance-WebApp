const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attendanceModel = new Schema({
  username: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    base64: true,
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

const Attendance = mongoose.model("Attendance", attendanceModel);

module.exports = Attendance;
