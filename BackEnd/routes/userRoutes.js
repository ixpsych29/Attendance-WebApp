const express = require("express");
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

//all users
router.get("/", getUsers);

//single user
router.get("/:userName", getSingleUser);

//insert new user
router.post("/", createUser);

//update user profile
router.patch("/:userName", updateUser);

//delete user
router.delete("/:userName", deleteUser);

module.exports = router;
