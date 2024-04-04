import axios from "axios";

const fetchAPI = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// Request interceptor
fetchAPI.interceptors.request.use(
  (config: any) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error: any) => {
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
