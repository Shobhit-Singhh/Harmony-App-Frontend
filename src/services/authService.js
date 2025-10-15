// src/services/authService.js

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "user";

export const AuthService = {
    storeAuthData: (data) => {
        if (data?.access_token) {
            sessionStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
            sessionStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
            sessionStorage.setItem(USER_KEY, JSON.stringify(data.user));
        }
    },

    clearAuthData: () => {
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        sessionStorage.removeItem(REFRESH_TOKEN_KEY);
        sessionStorage.removeItem(USER_KEY);
    },

    getAccessToken: () => sessionStorage.getItem(ACCESS_TOKEN_KEY),

    getRefreshToken: () => sessionStorage.getItem(REFRESH_TOKEN_KEY),

    getCurrentUser: () => {
        const user = sessionStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    },
};
