import React from "react";
import apiClient from "../services/apiClient";
import { useWorkoutsContext } from "../context/WorkoutsContext";
import { formatDistanceToNow } from "date-fns";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const handleDelete = () => {
    console.log("del");
    const response = apiClient.delete(`api/workouts/${workout._id}`);
    response
      .then((result) =>
        dispatch({ type: "DELETE_WORKOUT", payload: { id: workout._id } })
      )
      .catch((err) => console.log(err));
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <h5>Load : {workout.load}</h5>
      <h5>reps : {workout.reps}</h5>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default WorkoutDetails;
