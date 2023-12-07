const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attendanceModel = new Schema({
  username: {
    type: String,
    required: true,
  },
  entranceTime: {
    type: Date,
    deafult: Date.now(),
  },
  picture: {
    type: String,
    base64: true,
  },
  leavingTime: {
    type: Date,
    default: null,
  },
});

const Attendance = mongoose.model("Attendance", attendanceModel);

module.exports = Attendance;
