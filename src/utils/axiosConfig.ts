import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "http://localhost:4000/api/v1/admin",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosApi;
