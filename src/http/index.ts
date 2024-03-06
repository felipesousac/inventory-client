import { TokenStore } from "@/utils/TokenStore";
import axios from "axios";

const http = axios.create({ baseURL: "http://localhost:8080" });

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

export default http;
