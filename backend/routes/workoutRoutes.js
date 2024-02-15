const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  res.json({ msg: "This is an workoutRoute" });
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

module.exports = router;
