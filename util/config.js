import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://coffee-ordering.vercel.app/api",
});
