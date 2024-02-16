const mongoose = require("mongoose");
const Joi = require("joi");
const Workout = require("../models/workoutModel");

const createWorkout = async (req, res) => {
  try {
    const { error } = validateWorkout(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { title, reps, load } = req.body;
    const workout = await Workout.create({ title, reps, load });
    return res.status(200).json(workout);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send("There was an internal server error while saving the file");
  }
};

const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    await isValidWorkout(id);

    const workout = await Workout.findById(id);
    return res.status(200).send(workout);
  } catch (err) {
    handleWorkoutError(err, res);
  }
};

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({createdAt: -1});
    return res.status(200).send(workouts);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send("There was an internal server error while saving the file");
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    await isValidWorkout(id, res);

    await Workout.findByIdAndDelete(id);
    return res.status(200).send("Workout deleted successfully");
  } catch (err) {
    handleWorkoutError(err, res);
  }
};

const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    await isValidWorkout(id);

    const { error } = validateWorkout(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { title, reps, load } = req.body;
    const workout = await Workout.findByIdAndUpdate(
      id,
      { title, reps, load },
      { new: true }
    );
    return res.status(200).send(workout);
  } catch (err) {
    handleWorkoutError(err, res);
  }
};

function validateWorkout(data) {
  const joiSchema = Joi.object({
    title: Joi.string().required(),
    load: Joi.number().required(),
    reps: Joi.number().required(),
  });
  return joiSchema.validate(data);
}

async function isValidWorkout(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid workout ID");
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    throw new Error("Workout not found");
  }
}

function handleWorkoutError(err, res) {
  console.error(err);
  if (err instanceof Error && err.message.startsWith("Invalid workout ID")) {
    return res.status(404).send("Invalid workout ID");
  }
  if (err instanceof Error && err.message.startsWith("Workout not found")) {
    return res.status(404).send("Workout not found");
  }
  return res.status(500).send("Internal server error");
}

module.exports = {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
};
