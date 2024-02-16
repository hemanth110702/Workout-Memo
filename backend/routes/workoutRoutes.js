const express = require("express");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controller/workoutController");

const router = express.Router();

router.use(express.json());

router.post("/", createWorkout);

router.get("/", getWorkouts);

router.get("/:id", getWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

module.exports = router;
