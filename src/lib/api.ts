import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
})
api.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;
  const token = localStorage.getItem("token");

  // 🔐 auth routes pe token mat bhejo
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