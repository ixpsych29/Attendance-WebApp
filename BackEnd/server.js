require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 4000;

//middleware
app.use(express.json());

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
