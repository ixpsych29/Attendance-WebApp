const Attendance = require("../models/attendanceModel");
// const moment = require("moment-timezone");

//get all history with distinct employee count
const getAttendance = async (req, res) => {
  try {
    // const employee = await Attendance.aggregate([
    //   {
    //     $group: {
    //       _id: {
    //         username: "$username",
    //         entranceTime: {
    //           $dateToString: { format: "%Y-%m-%d", date: "$entranceTime" },
    //         },
    //       },
    //     },
    //   },
    // ]).sort({ "_id.date": 1 });
    // const distinctEmployeeCount = employee.length;
    // res.status(200).json({ distinctEmployeeCount });
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

  // console.log(username, picture, entranceTime);

  const today = new Date();
  // today.setHours(0, 0, 0, 0);
  const todayKey = today.toISOString().replace(/\./g, "_");

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

//updating the attendance record
const updateAttendanceRecord = async (username, todayKey) => {
  try {
    const updatedAttendance = await Attendance.findOneAndUpdate(
      {
        username,
        [`attendanceObj.${todayKey}.checkOut`]: false,
      },
      {
        $set: {
          [`attendanceObj.${todayKey}.checkOut`]: true,
          [`attendanceObj.${todayKey}.leavingTime`]: new Date(),
        },
      },
      { new: true } //return the modified document
    );
    return updatedAttendance;
  } catch (err) {
    throw new Error(err.message);
  }
};

//
const updateAttendance = async (req, res) => {
  const { username } = req.body;

  const today = new Date();
  const todayKey = today.toISOString().replace(/\./g, "_");
  try {
    const updatedAttendance = await updateAttendanceRecord(username, todayKey);

    if (updatedAttendance) {
      console.log("Attendance updated with leavingtime and checkout");
      res.status(400).json(updatedAttendance);
    } else {
      console.error("Error in updateAttendance", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (err) {
    console.error("Error in update Attendance", err.message);
    res.status(500).json({ error: "Internal Server Error" });
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

//exporting modules
module.exports = {
  getAttendance,
  getOneAttendance,
  createAttendance,
  updateAttendance,
  getPresentOnes,
};
