import React, { useState } from "react";
import apiClient from "../services/apiClient";

const CreateWorkout = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    try {
      const response = await apiClient.post(
        "/api/workouts",
        JSON.stringify(workout)
      );
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      console.log("new workout added ", response.data);
    } catch (err) {
      console.log(err);
      setError("Error Adding Workout: \n" + err.response.data + "\n");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      Exercise Title:{" "}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />{" "}
      <br />
      Load:{" "}
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />{" "}
      <br />
      Reps:{" "}
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />{" "}
      <br />
      <button>Add workout</button> <br />
      {error && <p style={{ whiteSpace: "pre-line" }}>{error}</p>}
    </form>
  );
};

export default CreateWorkout;
