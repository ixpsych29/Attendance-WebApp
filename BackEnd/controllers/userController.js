const User = require("../models/userModel");
// const mongoose = require("mongoose");

//get all Users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ created_at: 1 });
  res.status(200).json(users);
};

//get a single User
const getSingleUser = async (req, res) => {
  const { userName } = req.params;
  const user = await User.find({ username: userName });
  if (!user) {
    return res.status(404).json({ error: "No user found" });
  }
  res.status(200).json(user);
};

//CREATE a new User
const createUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  //add doc to DB
  try {
    const newUser = await User.create({ name, username, email, password });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete a User

//update a User

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
};
