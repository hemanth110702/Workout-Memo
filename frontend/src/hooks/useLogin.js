import { useState } from "react";
import apiClient from "../services/apiClient";
import { useAuthContext } from "../context/AuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false); // Set initial state to false
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post("/user/login", { email, password });
      const data = response.data;
      localStorage.setItem("workoutUser", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};
