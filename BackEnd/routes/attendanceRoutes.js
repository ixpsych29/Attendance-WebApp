const express = require("express");
const user = require("../models/userSchema");

const router = express.Router();

//all history
router.get("/", (req, res) => {
  res.json({ msg: "GET all History!" });
});

//single person history
router.get("/emp", (req, res) => {
  res.json({ msg: "GET single employee" });
});

//insert new record
router.post("/", async (req, res) => {
  const { username, email, password, entrancePic } = req.body;

  try {
    const userAttendance = await user.create({
      username,
      email,
      password,
      entrancePic,
    });
    res.status(200).json(userAttendance);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
  res.json({ msg: "POST a new record!" });
});

//update record
router.patch("/update", (req, res) => {
  res.json({ msg: "POST a new record!" });
});

module.exports = router;
