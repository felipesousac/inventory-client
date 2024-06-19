import { getTokenData } from "@/contexts/authProvider/util";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  function (config) {
    const token = getTokenData();

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
    if (error.response.status == 403) {
      window.location.href = "/";
      sessionStorage.removeItem("u");
    }
    return Promise.reject(error);
  }
);

export default http;
