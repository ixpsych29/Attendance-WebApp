const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attendanceModel = new Schema({
  username: {
    type: String,
    required: true,
  },
  attendanceObj: {
    type: Map,
    of: {
      checkIn: {
        type: Boolean,
        default: false,
      },
      entranceTime: {
        type: Date,
      },
      checkOut: {
        type: Boolean,
        default: false,
      },
      leavingTime: {
        type: Date,
        default: null,
      },
      picture: {
        type: String,
        base64: true,
        required: true,
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
  },
});

const Attendance = mongoose.model("Attendance", attendanceModel);

module.exports = Attendance;
