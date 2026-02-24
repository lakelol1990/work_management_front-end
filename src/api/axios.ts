import axios from "axios";
import { getAccessToken } from "../store/authStore";

export const api = axios.create({
  baseURL: "http://localhost:8182", 
  withCredentials: true,
});


api.interceptors.request.use((config) => {
  const token = getAccessToken();


  if (config.url?.startsWith("/api/auth")) {
    return config;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});