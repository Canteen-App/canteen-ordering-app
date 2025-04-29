import axios from "axios";
import { auth } from "@/firebase";

const fetchAPI = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// Request interceptor to add Firebase Auth Bearer Token
fetchAPI.interceptors.request.use(
  async (config: any) => {
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor
fetchAPI.interceptors.response.use(
  (response: any) => response,
  (error: any) => Promise.reject(error)
);

export default fetchAPI;
