// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthAPI } from "../api/auth"; // must point to your api wrapper
// NOTE: AuthAPI.login/register should write tokens + user to localStorage (we rely on that)
// This provider keeps in-memory `user` and exposes login/logout/register/refresh

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem("user");
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    });

    // Keep user state in sync with localStorage (multi-tab)
    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === "user") {
                try {
                    setUser(e.newValue ? JSON.parse(e.newValue) : null);
                } catch {
                    setUser(null);
                }
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    // login wrapper: call API, update state
    const login = async (email, password) => {
        const data = await AuthAPI.login(email, password);
        // AuthAPI should already set localStorage items; make sure state is in sync
        setUser(data.user || null);
        return data;
    };

    const register = async (formData) => {
        const res = await AuthAPI.register(formData);
        // do not auto-login by default here (your choice)
        return res;
    };

    const logout = () => {
        // Clear storage + state
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        setUser(null);
        // Optional redirect handled by caller
    };

    const refresh = async () => {
        try {
            const newAccess = await AuthAPI.refresh(); // should update localStorage
            return newAccess;
        } catch (err) {
            logout();
            throw err;
        }
    };

    const value = {
        user,
        setUser,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refresh,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
