import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("🔥 INTERCEPTOR RUNNING:", token); // VERY IMPORTANT

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;