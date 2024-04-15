import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://mern-stack-real-estate-backend.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
