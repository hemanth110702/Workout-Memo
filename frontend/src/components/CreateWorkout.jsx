import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { useWorkoutsContext } from "../context/WorkoutsContext";

const CreateWorkout = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    if (title && emptyFields.includes("title"))
      setEmptyFields((prev) => prev.filter((d) => d != "title"));
    if (load && emptyFields.includes("load"))
      setEmptyFields((prev) => prev.filter((d) => d != "load"));
    if (reps && emptyFields.includes("reps"))
      setEmptyFields((prev) => prev.filter((d) => d != "reps"));
    if (title && load && reps) setError("");
  }, [title, load, reps]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };

    if (!title) setEmptyFields((prev) => [...prev, "title"]);
    if (!load) setEmptyFields((prev) => [...prev, "load"]);
    if (!reps) setEmptyFields((prev) => [...prev, "reps"]);
    if (emptyFields.length > 0) {
      setError("All Fields are required");
      return
    } else {
      try {
        const response = await apiClient.post(
          "/api/workouts",
          JSON.stringify(workout)
        );
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
        setEmptyFields([]);
        dispatch({ type: "CREATE_WORKOUT", payload: response.data });
        console.log("new workout added ", response.data);
      } catch (err) {
        console.log(err);
        setError("Error Adding Workout: \n" + err.response.data + "\n");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      Exercise Title:{" "}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") ? "error" : ""}
      />{" "}
      <br />
      Load:{" "}
      <input
        type="number"
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
        onChange={(e) => setLoad(e.target.value)}
      />{" "}
      <br />
      Reps:{" "}
      <input
        type="number"
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
        onChange={(e) => setReps(e.target.value)}
      />{" "}
      <br />
      <button>Add workout</button> <br />
      {error && <p style={{ whiteSpace: "pre-line" }}>{error}</p>}
    </form>
  );
};

export default CreateWorkout;
