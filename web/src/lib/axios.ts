import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL environment variable is not set");
}

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;
