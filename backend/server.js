require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();

// middleware
/* app.use(
  cors({
    origin: "http://localhost:5173", // frontend server
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
); */
app.use(cors());
app.use(express.json());

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(process.env.mongodb_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () =>
      console.log(
        "Connected to DB & Server is listening on port: " + process.env.PORT
      )
    );
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
