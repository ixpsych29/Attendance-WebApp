const Attendance = require("../models/attendanceModel");

//get all history
const getAttendance = async (req, res) => {
  const employee = await Attendance.find({}).sort({ entranceTime: 1 });
  res.status(200).json(employee);
};

//get single day history
const getOneAttendance = async (req, res) => {
  const { userName } = req.params;
  const employee = await Attendance.find({ username: userName });
  if (!employee) {
    return res.status(404).json({ error: "No user found" });
  }
  res.status(200).json(employee);
};

//insert new attendance record
const createAttendance = async (req, res) => {
  const { username, picture, entranceTime } = req.body;

  //INSERT new document to DB
  try {
    const todayAttendance = await Attendance.create({
      username,
      picture,
      entranceTime,
    });
    res.status(200).json(todayAttendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//UPDATING attendance at leaving time.
const updateAttendance = async (req, res) => {
  const { userName } = req.params;
  const employee = await Attendance.findOneAndUpdate(
    { username: userName },
    { ...req.body }
  );
  if (!employee) {
    return res.status(404).json({ error: "not found today attendance!" });
  }
  res.status(200).json(remployee);
};

//exporting modules
module.exports = {
  getAttendance,
  getOneAttendance,
  createAttendance,
  updateAttendance,
};
