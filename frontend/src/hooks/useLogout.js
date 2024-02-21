import React from "react";
import { useAuthContext } from "../context/AuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    localStorage.removeItem("workoutUSer");
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
