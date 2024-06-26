const express = require("express");
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updatePicture,
  updateProfile,
  loginUser,
  UserExist
} = require("../controllers/userController");

const router = express.Router();

//all users
router.get("/", getUsers);

//single user
router.get("/:userName", getSingleUser);
router.get("/exists/:userName", UserExist);

//insert new user
router.post("/", createUser);

//update user profile
router.put("/:userName/update-picture", updatePicture);
router.put("/:userName/update-profile", updateProfile);

//delete user
router.delete("/:userName", deleteUser);

//login user
router.post("/login", loginUser);

module.exports = router;
