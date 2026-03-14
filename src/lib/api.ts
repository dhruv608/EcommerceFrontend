import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommercebackend-fqk1.onrender.com",
});

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;
  const token = localStorage.getItem("token");

 
  if (
    token &&
    !config.url?.includes("/auth/login") &&
    !config.url?.includes("/auth/register")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
