const Attendance = require("../models/attendanceModel");
// const moment = require("moment-timezone");

//get all history with distinct employee count
const getAttendance = async (req, res) => {
  try {
    const employee = await Attendance.aggregate([
      {
        $group: {
          _id: {
            username: "$username",
            entranceTime: {
              $dateToString: { format: "%Y-%m-%d", date: "$entranceTime" },
            },
          },
        },
      },
    ]).sort({ "_id.date": 1 });

    const distinctEmployeeCount = employee.length;

    res.status(200).json({ distinctEmployeeCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existingAttendance = await Attendance.find({
    username,
    entranceTime: { $gte: today, $lt: today.setDate(today.getDate() + 1) },
  });

  if (existingAttendance) {
    res.status(400).json({ error: "Attendance Marked Already for Today" });
  }
  //INSERT new document to DB
  try {
    const todayAttendance = await Attendance.create({
      username,
      picture,
      entranceTime,
      presentStatus: "Present",
    });
    res.status(200).json(todayAttendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//UPDATING attendance at leaving time.
const updateAttendance = async (req, res) => {
  const { userName } = req.params;
  const { leavingTime } = req.body;

  const employee = await Attendance.findOneAndUpdate(
    { username: userName },
    { leavingTime }
  );
  if (!employee) {
    return res.status(404).json({ error: "not found today attendance!" });
  }
  res.status(200).json(remployee);
};

// Get present attendees for the current date
const getPresentOnes = async (req, res) => {
  try {
    const { entranceTime } = req.body;
    const employee = await Attendance.find({ entranceTime: entranceTime });
    if (!employee) {
      return res.status(404).json({ error: "No user found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching present attendees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//exporting modules
module.exports = {
  getAttendance,
  getOneAttendance,
  createAttendance,
  updateAttendance,
  getPresentOnes,
};
