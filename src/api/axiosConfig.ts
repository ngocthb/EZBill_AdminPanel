import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://160.187.0.231:5000/api",
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
