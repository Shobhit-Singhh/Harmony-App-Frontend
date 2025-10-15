// src/hooks/useAuth.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../api/auth";

/**
 * Hook for login functionality
 */
export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.login(email, password);
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Login failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}

/**
 * Hook for user registration functionality
 */
export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const register = async (email, password, username = null, phone_number = null) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.register(email, password, username, phone_number);
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Registration failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error };
}

/**
 * Hook for admin registration functionality (one-time setup)
 */
export function useAdminRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const registerAdmin = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.registerAdmin(userData);
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Admin registration failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { registerAdmin, loading, error };
}

/**
 * Hook for logout functionality
 */
export function useLogout() {
    const navigate = useNavigate();

    const logout = () => {
        AuthAPI.logout();
        navigate("/login");
    };

    return { logout };
}

/**
 * Hook to get current user from session storage
 */
export function useCurrentUser() {
    return AuthAPI.getCurrentUser();
}

/**
 * Hook for fetching current user profile from API
 */
export function useCurrentUserProfile() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.getCurrentUserProfile();
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Failed to fetch profile");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { fetchProfile, loading, error };
}

/**
 * Hook for updating current user profile
 */
export function useUpdateProfile() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateProfile = async (updateData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.updateCurrentUserProfile(updateData);
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Failed to update profile");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateProfile, loading, error };
}

/**
 * Hook for changing password
 */
export function useChangePassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const changePassword = async (oldPassword, newPassword) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.changePassword(oldPassword, newPassword);
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Failed to change password");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { changePassword, loading, error };
}

/**
 * Hook for deleting current user account
 */
export function useDeleteAccount() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const deleteAccount = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.deleteCurrentUserAccount();
            navigate("/login");
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Failed to delete account");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteAccount, loading, error };
}

/**
 * Hook for admin user management
 */
export function useAdminUsers() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createUser = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.createUser(userData);
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Failed to create user");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const listUsers = async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.listUsers(params);
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Failed to fetch users");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getUserById = async (userId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.getUserById(userId);
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Failed to fetch user");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (userId, updateData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.updateUser(userId, updateData);
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Failed to update user");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const resetUserPassword = async (userId, newPassword) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.resetUserPassword(userId, newPassword);
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Failed to reset password");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateUserRole = async (userId, role) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.updateUserRole(userId, role);
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Failed to update role");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateUserStatus = async (userId, status) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.updateUserStatus(userId, status);
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Failed to update status");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const suspendUser = async (userId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.suspendUser(userId);
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Failed to suspend user");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const activateUser = async (userId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.activateUser(userId);
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Failed to activate user");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId, hardDelete = false) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.deleteUser(userId, hardDelete);
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Failed to delete user");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getStatistics = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthAPI.getStatistics();
            return data;
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Failed to fetch statistics");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        createUser,
        listUsers,
        getUserById,
        updateUser,
        resetUserPassword,
        updateUserRole,
        updateUserStatus,
        suspendUser,
        activateUser,
        deleteUser,
        getStatistics,
        loading,
        error
    };
}

/**
 * Hook to check authentication status
 */
export function useAuth() {
    const isAuthenticated = AuthAPI.isAuthenticated();
    const isAdmin = AuthAPI.isAdmin();
    const isProfessional = AuthAPI.isProfessional();
    const currentUser = AuthAPI.getCurrentUser();

    return {
        isAuthenticated,
        isAdmin,
        isProfessional,
        currentUser
    };
}