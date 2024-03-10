import { TokenStore } from "@/utils/TokenStore";
import axios from "axios";
import { useNavigate } from "react-router";

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

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    //const navigate = useNavigate();
    console.log("Usuário não autenticado");
    window.location.href = "/login";
    //navigate("/login");
    return Promise.reject(error);
  }
);

export default http;
