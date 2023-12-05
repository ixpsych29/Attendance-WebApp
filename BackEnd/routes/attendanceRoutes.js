const express = require("express");

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
router.post("/", (req, res) => {
  res.json({ msg: "POST a new record!" });
});

//update record
router.patch("/update", (req, res) => {
  res.json({ msg: "POST a new record!" });
});

module.exports = router;
