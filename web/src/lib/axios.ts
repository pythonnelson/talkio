import axios from "axios";

const api = axios.create({
  baseURL: "https://91a5900c3819.ngrok-free.app/api",
  withCredentials: true,
});

export default api;
