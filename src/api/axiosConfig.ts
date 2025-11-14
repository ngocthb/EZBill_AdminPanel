import axios from "axios";

const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const axiosInstance = axios.create({
  baseURL: isLocal ? "http://160.187.0.231:5000/api" : "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🟦 REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 🟩 RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  (error: any) => {
    if (error.response) {
      console.error("Response error:", error.response.status);
    } else {
      console.error("Network error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
