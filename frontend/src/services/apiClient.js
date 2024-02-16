import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000", // backend server
  headers: {
    "Content-Type": "application/json", 
  },
});
