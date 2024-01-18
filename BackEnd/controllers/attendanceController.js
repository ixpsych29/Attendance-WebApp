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
    const existingAttendance = await Attendance.findOne({ username });

    if (existingAttendance) {
      console.log("existing attendance found", existingAttendance);

      //check if the attendance for today already exist
      if (existingAttendance.attendanceObj[todayKey]) {
        console.log("Attendance Already marked for today");
        if (existingAttendance.attendanceObj[todayKey].checkOut) {
          res
            .status(400)
            .json({ error: "Attendance Already CheckedOut for Today" });
          return;
        }
      }

      console.log("updating for today", todayKey);
      console.log("Before upadate");

      //if not, update the attendance for today
      existingAttendance.attendanceObj[todayKey] = {
        ...existingAttendance.attendanceObj[todayKey],
        checkOut: true,
        leavingTime: new Date(),
      };

      //saving the updated document
      await existingAttendance.save();

      console.log("After upadate", existingAttendance);

      res.status(200).json(existingAttendance);
    } else {
      console.log("entering else");
      //if there is no existing record, create a new one
      const newAttendance = Attendance.create({
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

      console.log("Attendance Created!");
      res.status(200).json(newAttendance);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//UPDATING attendance at leaving time.
// const updateAttendance = async (req, res) => {
//   const { username, checkOut } = req.body;

//   const employee = await Attendance.findOneAndUpdate(
//     { username: userName },
//     { leavingTime }
//   );
//   if (!employee) {
//     return res.status(404).json({ error: "not found today attendance!" });
//   }
//   res.status(200).json(employee);
// };

// Separate API endpoint for updating attendance
const updateAttendance = async (req, res) => {
  const { username, checkOut } = req.body;

  console.log("Received request to update attendance:", {
    username,
    checkOut,
  });

  const today = new Date();
  const todayKey = today.toISOString().replace(/\./g, "_");

  try {
    const existingAttendance = await Attendance.findOne({ username });

    if (existingAttendance) {
      console.log("Existing attendance found:", existingAttendance);

      if (existingAttendance.attendanceObj[todayKey]) {
        console.log("Attendance already marked for today:", todayKey);

        // If already checked out, return an error
        if (existingAttendance.attendanceObj[todayKey].checkOut) {
          res
            .status(400)
            .json({ error: "Attendance already checked out for today" });
          return;
        }

        // Update the existing attendance with checkout and leaving time
        existingAttendance.attendanceObj[todayKey] = {
          ...existingAttendance.attendanceObj[todayKey],
          checkOut: true,
          leavingTime: checkOut, // You can customize how you handle leaving time
        };

        // Saving the updated document
        await existingAttendance.save();

        console.log("Attendance updated with checkout and leaving time!");
        res.status(200).json(existingAttendance);
      } else {
        res.status(400).json({
          error:
            "Attendance not marked for today. Please mark attendance first.",
        });
      }
    } else {
      res
        .status(400)
        .json({ error: "No attendance record found for the given username." });
    }
  } catch (err) {
    console.error("Error in updateAttendance:", err.message);
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
