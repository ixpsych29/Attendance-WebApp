const User = require("../models/userModel");
const mongoose = require("mongoose");

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

  //ADD doc to DB
  try {
    const newUser = await User.create({ name, username, email, password });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete a User
const deleteUser = async (req, res) => {
  const { userName } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(userName)) {
  //   return res.status(404).json({ error: "No such user found, try again!" });
  // }

  const user = await User.findOneAndDelete({ username: userName });

  if (!user) {
    return res.status(404).json(user);
  }
  res.status(200).json(user);
};

//update a User
const updateUser = async (req, res) => {
  const { userName } = req.params;
  const user = await User.findOneAndUpdate(
    { username: userName },
    { ...req.body }
  );

  if (!user) {
    return res.status(404).json({ error: "no such user found!" });
  }
  res.status(200).json(user);
};

//exporting modules
module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
};
