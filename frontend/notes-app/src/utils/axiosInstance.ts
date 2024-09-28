import axios from "axios";
import envConfig from "../config/env.config";

const axiosInstance = axios.create({
  baseURL: envConfig.VITE_BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      console.log("Invalid or access Token not found");
    }
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      !axios.isAxiosError(error) ||
      !error.response ||
      ![401].includes(error.response.status)
    ) {
      return Promise.reject(error);
    }

    const { config: originalRequest, response: originalResponse } = error;
    if (!originalRequest) {
      console.log("error: there is no original request", error);
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
