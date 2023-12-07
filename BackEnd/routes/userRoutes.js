const express = require("express");
const {
  getUsers,
  getSingleUser,
  createUser,
} = require("../controllers/userController");

const router = express.Router();

//all users
router.get("/", getUsers);

//single user
router.get("/:username", getSingleUser);

//insert new record
router.post("/", createUser);

//update record
router.patch("/update", (req, res) => {
  res.json({ msg: "UPDATED user Profile!" });
});

//delete a record
router.delete("/:username", (req, res) => {
  res.json({ msg: "Deleted User Successfully!" });
});

module.exports = router;
