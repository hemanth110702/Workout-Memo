import { useState } from "react";
import apiClient from "../services/apiClient";
import { useAuthContext } from "../context/AuthContext";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/user/signup", {
        email,
        password,
      });
      const data = response.data;
      localStorage.setItem("workoutUser", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
    } catch (err) {
      setError(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, error, isLoading };
};
