require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
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

mongoose.connect(process.env.mongodb_URL).then(()=>{
  // listen for requests
  app.listen(process.env.PORT, () =>
    console.log("Connected to DB & Server is listening on port: " + process.env.PORT)
  );
  
}).catch();
