import React, { useEffect } from "react";
import apiClient from "../services/apiClient";

const Home = () => {
  useEffect(() => {
    apiClient
      .get("/api/workouts")
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  }, []);
  return <div>Home</div>;
};

export default Home;
