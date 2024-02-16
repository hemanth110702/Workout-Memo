import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import WorkoutDetails from "../components/WorkoutDetails";
import CreateWorkout from "../components/CreateWorkout";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);
  useEffect(() => {
    apiClient
      .get("/api/workouts")
      .then((response) => setWorkouts(response.data))
      .catch((err) => console.log(err));
  }, []);
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
