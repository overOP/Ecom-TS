import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_API || "http://localhost:3000";

const http = axios.create({ baseURL });

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export { http };

export default http;