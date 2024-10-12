import axios from "axios";
import { loadState } from "./stroge";

const request = axios.create({ baseURL: "https://auth.axadjonovsardorbek.uz" });

request.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${loadState("user")?.token}`,
  };
  return config;
});

// request.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       localStorage.removeItem("user");
//       window.location.href = "/";
//     }

//     return error;
//   }
// );

export { request };