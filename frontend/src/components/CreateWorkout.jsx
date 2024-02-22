import React, { useEffect, useState } from "react";
import { useWorkoutsContext } from "../context/WorkoutsContext";
import { useAuthContext } from "../context/AuthContext";
import apiClient from "../services/apiClient";

const CreateWorkout = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

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

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, load, reps };

    if (!title) setEmptyFields((prev) => [...prev, "title"]);
    if (!load) setEmptyFields((prev) => [...prev, "load"]);
    if (!reps) setEmptyFields((prev) => [...prev, "reps"]);
    if (emptyFields.length > 0) {
      setError("All Fields are required");
      return;
    }
    try {
      const response = await apiClient.post(
        "/api/workouts/",
        JSON.stringify(workout),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: response.data });
      console.log("new workout added ", response.data);
    } catch (err) {
      console.log(err);
      setError("Error Adding Workout: \n" + err + "\n");
    }
  };

  return (
    <form
      className="bg-yellow-200 flex flex-col col-span-2  p-4 rounded-xl"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold text-center">Create Workout</h1>
      <label className="mt-4 font-semibold" htmlFor="title">
        Exercise Title:
      </label>
      <input
        type="text"
        value={title}
        id="title"
        placeholder="ex:Push Ups"
        onChange={(e) => setTitle(e.target.value)}
        className={
          emptyFields.includes("title")
            ? "border-2 border-red-500 p-2 rounded outline-red-500 "
            : "p-2 rounded focus:border-blue-400 outline-blue-500"
        }
      />
      <br />
      <label className="font-semibold" htmlFor="load">
        Load:
      </label>
      <input
        type="number"
        id="load"
        placeholder="ex:10"
        value={load}
        className={
          emptyFields.includes("load")
            ? "border-2 border-red-500 p-2 rounded outline-red-500 "
            : "p-2 rounded focus:border-blue-400 outline-blue-500"
        }
        onChange={(e) => setLoad(e.target.value)}
      />
      <br />
      <label htmlFor="reps">Reps:</label>
      <input
        type="number"
        id="reps"
        value={reps}
        placeholder="ex:5"
        className={
          emptyFields.includes("reps")
            ? "border-2 border-red-500 p-2 rounded outline-red-500 "
            : "p-2 rounded focus:border-blue-400   outline-blue-500"
        }
        onChange={(e) => setReps(e.target.value)}
      />{" "}
      <br />
      <button className="bg-green-600 text-white w-fit self-center p-2 rounded-xl hover:bg-green-400 ">
        Add Workout
      </button>{" "}
      <br />
      {error && (
        <p className="whitespace-pre-line border-2 p-2 border-red-500 rounded-sm text-red-400 ">
          {error}
        </p>
      )}
    </form>
  );
};

export default CreateWorkout;
