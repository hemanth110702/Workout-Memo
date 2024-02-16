import React from "react";

const WorkoutDetails = ({ workout }) => {
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <h5>Load : {workout.load}</h5>
      <h5>reps : {workout.reps}</h5>
      {workout.createdAt}
    </div>
  );
};

export default WorkoutDetails;
