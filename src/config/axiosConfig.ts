import axios from "axios";
import config from "./config";

const api = axios.create({
  baseURL: config.API_BASE_URL,
  withCredentials: true, // send cookies automatically
});

// Request interceptor (offline check)
api.interceptors.request.use(
  async (config) => {
    if (!navigator.onLine) {
      return Promise.reject({ message: "No internet connection", isNetworkError: true });
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      window.location.href = "/signup";
    }
    return Promise.reject(error);
  }
);

export default api;
