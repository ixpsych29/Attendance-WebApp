require("dotenv").config();
const attendanceRoutes = require("./routes/attendanceRoutes");
const express = require("express");
const app = express();

const port = process.env.PORT || 4000;

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/attendance", attendanceRoutes);

//listening to requests
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
