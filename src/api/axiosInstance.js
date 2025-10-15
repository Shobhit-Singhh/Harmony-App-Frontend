// src/api/axiosInstance.js
import axios from "axios";
import { AuthService } from "../services/authService";

const API = axios.create({
    baseURL: "https://harmony-app-backend.onrender.com",
    headers: {
        'Content-Type': 'application/json',
    },
});

API.interceptors.request.use((config) => {
    const token = AuthService.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refresh_token = AuthService.getRefreshToken();
                if (!refresh_token) throw new Error("No refresh token available");

                const res = await axios.post(
                    `${"https://harmony-app-backend.onrender.com"}/auth/refresh`,
                    { refresh_token }
                );

                AuthService.storeAuthData({
                    access_token: res.data.access_token,
                    refresh_token: refresh_token,
                    user: AuthService.getCurrentUser(),
                });

                originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
                return API(originalRequest);
            } catch (refreshError) {
                AuthService.clearAuthData();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default API;