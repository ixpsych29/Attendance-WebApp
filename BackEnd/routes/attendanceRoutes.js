const express = require("express");
const {
  getAttendance,
  getOneAttendance,
  createAttendance,
  updateAttendance,
  getPresentOnes,
  getTodayAttendances,
} = require("../controllers/attendanceController");

const router = express.Router();

//all history
router.get("/", getAttendance);

router.get("/all", getTodayAttendances);

//single day history
router.get("/:userName", getOneAttendance);

//insert new record to history
router.post("/", createAttendance);

//update attendance history
router.put("/", updateAttendance);

//get presentOnes
router.get("/:entranceTime", getPresentOnes);

module.exports = router;
