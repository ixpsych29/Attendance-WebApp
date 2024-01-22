const express = require("express");
const {
  getAttendance,
  getOneAttendance,
  createAttendance,
  updateAttendance,
  getPresentOnes,
  getTodayAttendances,
  getMonthlyAttendances,
} = require("../controllers/attendanceController");

const router = express.Router();

//all history
router.get("/", getAttendance);

router.get("/all", getTodayAttendances);

//single day history
router.get("/:userName", getOneAttendance);

//insert new record to history
router.post("/", createAttendance);

//update attendance check out time
router.put("/:userName", updateAttendance);

//update attendance history
router.patch("/:userName", updateAttendance);

// Monthly attendance history for a specific user
router.get("/monthly/:userName", getMonthlyAttendances);

module.exports = router;
