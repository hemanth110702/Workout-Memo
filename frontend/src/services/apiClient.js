import axios from "axios";

const baseURLs = {
  development: "http://localhost:4000",
  production: "https://workout-memo-api.onrender.com",
};

const baseURL =
  process.env.NODE_ENV === "production"
    ? baseURLs.production
    : baseURLs.development;

export default axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
