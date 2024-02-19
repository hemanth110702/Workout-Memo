import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import WorkoutDetails from "../components/WorkoutDetails";
import CreateWorkout from "../components/CreateWorkout";
import { useWorkoutsContext } from "../context/WorkoutsContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  useEffect(() => {
    apiClient
      .get("/api/workouts")
      .then((response) => {
        dispatch({ type: "SET_WORKOUTS", payload: response.data });
      })
      .catch((err) => console.log(err));
  }, [workouts]);
  return (
    <div>
      <div>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <CreateWorkout />
    </div>
  );
};

export default Home;
