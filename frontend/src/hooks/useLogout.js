import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { useWorkoutsContext } from "../context/WorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();
  const logout = () => {
    localStorage.removeItem("workoutUSer");
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
