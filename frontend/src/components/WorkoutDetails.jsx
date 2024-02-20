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
    <div className="p-2 font-kdam bg-blue-500  w-11/12 ">
      <div className="flex justify-between ">
        <h4 className=" text-xl font-bold uppercase">{workout.title}</h4>
        <div className="flex gap-2">
          <button className="px-3 bg-green-600 rounded-lg hover:bg-green-400">
            Edit
          </button>
          <button
            className="p-1 bg-red-600 text-white rounded-lg hover:bg-red-400"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
      <h5>
        <span className="font-semibold text-red-700">Load :</span>{" "}
        {workout.load}
      </h5>
      <h5>
        <span className="font-semibold text-red-700">reps : </span>
        {workout.reps}
      </h5>
      <p>
        {" "}
        <span>Updated: </span>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
};

export default WorkoutDetails;
