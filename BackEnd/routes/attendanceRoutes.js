const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
} = require("../controllers/userController");

const router = express.Router();

//all history
router.get("/", getUsers);

//single person history
router.get("/:name", getUser);

//insert new record
router.post("/", createUser);

//update record
router.patch("/update", (req, res) => {
  res.json({ msg: "POST a new record!" });
});

module.exports = router;
