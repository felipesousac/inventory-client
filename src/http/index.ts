import { TokenStore } from "@/utils/TokenStore";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  function (config) {
    const token = TokenStore.getToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    window.location.href = "/login";
    return Promise.reject(error);
  }
);

export default http;
