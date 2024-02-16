const express = require("express");
const Joi = require("joi");
const Workout = require("../models/workoutModel");

const router = express.Router();

router.use(express.json());

router.post("/", async (req, res) => {
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
});

router.get("/", (req, res) => {
  res.json({ msg: "This is an workoutRoute" });
});

router.get("/:id", (req, res) => {
  res.json({ msg: "This is an workoutRoute" });
});

router.delete("/:id", (req, res) => {
  res.json({ msg: "This is an workoutRoute" });
});

router.patch("/:id", (req, res) => {
  res.json({ msg: "This is an workoutRoute" });
});

function validateWorkout(data) {
  const joiSchema = Joi.object({
    title: Joi.string().required(),
    load: Joi.number().required(),
    reps: Joi.number().required(),
  });
  return joiSchema.validate(data);
}

module.exports = router;
