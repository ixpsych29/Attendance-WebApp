const express = require("express");
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  upload,
} = require("../controllers/userController");

const router = express.Router();

//all users
router.get("/", getUsers);

//single user
router.get("/:userName", getSingleUser);

//insert new user
router.post("/", createUser);

//update user profile
router.put("/:userName", updateUser);

//delete user
router.delete("/:userName", deleteUser);

//login user
router.post("/login", loginUser);

module.exports = router;
