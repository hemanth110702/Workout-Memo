require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workoutRoutes");

const app = express();

// middleware
app.use((req, res, next) => {
  console.log(" path: " + req.path, "method:" + req.method);
  next();
});

// routes
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to workout memo" });
});
app.use("/api/workouts", workoutRoutes);

// listen for requests
app.listen(process.env.PORT, () =>
  console.log("Server is listening on port: " + process.env.PORT)
);
