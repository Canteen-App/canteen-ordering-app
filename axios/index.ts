import axios from "axios";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

const fetchAPI = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// Request interceptor
fetchAPI.interceptors.request.use(
  async (config: any) => {
    config.headers["Content-Type"] = "application/json";
    const accessToken = await auth?.currentUser?.getIdToken(true)
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error: any) => {
    console.log(error)
    return Promise.reject(error);
  }
);

// Response interceptor
fetchAPI.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default fetchAPI;
