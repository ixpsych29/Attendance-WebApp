require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

app.use(cors()); // Use this after the variable declaration
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());

// Serve static files from the 'Images' directory within 'uploads'
app.use(
  "/uploads/Images",
  express.static(path.join(__dirname, "uploads/Images"))
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listening to requests
    app.listen(port, () => {
      console.log(`Connected to DB && listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
