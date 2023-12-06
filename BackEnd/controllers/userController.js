const User = require("../models/userModel");
const mongoose = require("mongoose");

//get all Users
const getUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
};

//get a single User
const getUser = async (req, res) => {
  const { name } = req.params;
  //   if (!mongoose.Types.ObjectId.isValid()) {
  //     return res.status(404).jason({ error: "No Such User!!!" });
  //   }
  const user = await User.find({ username: name });
  if (!user) {
    return res.status(404).json({ error: "No user found" });
  }
  res.status(200).json(user);
};
//CREATE a new User
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete a User

//update a User

module.exports = {
  getUsers,
  getUser,
  createUser,
};
