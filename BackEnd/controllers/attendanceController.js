const Attendance = require("../models/attendanceModel");

//get all history with distinct employee count
const getAttendance = async (req, res) => {
  try {
    console.log("getAttendance");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
const getTodayAttendances = async (req, res) => {
  try {
    const dateParam = req.query.date;
    const date = dateParam ? new Date(dateParam) : new Date();
    date.setHours(0, 0, 0, 0);
    const attendances = await Attendance.find({
      entranceTime: {
        $gte: date,
        $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
      },
    }).sort({ entranceTime: 1 });
    res.status(200).json(attendances);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

//get single day history
//
//
const getOneAttendance = async (req, res) => {
  try {
    const { userName } = req.params;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const employee = await Attendance.findOne({
      username: userName,
      entranceTime: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });
    res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

//insert new attendance record
const createAttendance = async (req, res) => {
  const { username, picture, entranceTime } = req.body;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    const updatedAttendance = await Attendance.findOneAndUpdate(
      { username, [`attendanceObj.${todayKey}.checkOut`]: false },
      {
        $set: {
          [`attendanceObj.${todayKey}.checkOut`]: true,
          [`attendanceObj.${todayKey}.leavingTime`]: new Date(),
        },
      },
      { new: true, upsert: true }
    );

    if (updatedAttendance) {
      console.log("Attendance updated with checkout and leaving time!");
      res.status(200).json(updatedAttendance);
    } else {
      // If no document is updated, create a new one
      const newAttendance = await Attendance.create({
        username,
        attendanceObj: {
          [todayKey]: {
            checkIn: true,
            entranceTime,
            checkOut: false,
            leavingTime: null,
            picture,
            status: true,
          },
        },
      });

      console.log("New Attendance Created!");
      res.status(200).json(newAttendance);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//UPDATING attendance at leaving time.
const updateAttendance = async (req, res) => {
  try {
    const { userName } = req.params;
    const { leavingTime } = req.body;

    // Get the current date without the time component
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Find or create the attendance record for the current date
    let employee = await Attendance.findOne({
      username: userName,
      entranceTime: { $gte: currentDate },
    });
    // Update the leaving time of the existing record
    employee.leavingTime = leavingTime;
    await employee.save();

    res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
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

const getMonthlyAttendances = async (req, res) => {
  try {
    const { userName } = req.params;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const attendances = await Attendance.find({
      username: userName,
      entranceTime: { $gte: startOfMonth, $lte: endOfMonth },
    });

    res.status(200).json(attendances);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

// controllers/attendanceController.js

const getAttendanceReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const reportStartDate = dayjs(startDate).startOf("day");
    const reportEndDate = dayjs(endDate).endOf("day");

    const attendanceData = await Attendance.find({
      entranceTime: { $gte: reportStartDate, $lte: reportEndDate },
    });
    res.status(200).json(attendanceData);
  } catch (error) {
    console.error("Error fetching attendance report", error);
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
  getTodayAttendances,
  getMonthlyAttendances,
  getAttendanceReport,
};
