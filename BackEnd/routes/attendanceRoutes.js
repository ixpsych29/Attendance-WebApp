const express = require("express");
const {
  getAttendance,
  getOneAttendance,
  createAttendance,
  updateAttendance,
} = require("../controllers/attendanceController");

const router = express.Router();

//all history
router.get("/", getAttendance);

//single day history
router.get("/:userName", getOneAttendance);

//insert new record to history
router.post("/", createAttendance);

//update attendance history
router.patch("/:userName", updateAttendance);

module.exports = router;
