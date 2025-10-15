// src/api/auth.js
import API from "./axiosInstance";
import { AuthService } from "../services/authService";

export const AuthAPI = {
    // =====================================================================
    // PUBLIC ENDPOINTS
    // =====================================================================

    /**
     * Login user with email and password
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @returns {Promise<Object>} - { access_token, refresh_token, user }
     */
    login: async (email, password) => {
        const res = await API.post("/auth/login", { email, password });
        AuthService.storeAuthData(res.data);
        console.log("Login response data:", res.data);
        return res.data;
    },

    /**
     * Register new user account (public)
     * @param {string} email - User's email (required)
     * @param {string} password - User's password (required)
     * @param {string} username - Username (optional)
     * @param {string} phone_number - Phone number (optional)
     * @returns {Promise<Object>} - User object
     */
    register: async (email, password, username = null, phone_number = null) => {
        // Build query parameters
        const params = new URLSearchParams({
            email,
            password,
        });
        
        if (username) params.append('username', username);
        if (phone_number) params.append('phone_number', phone_number);

        const res = await API.post(`/auth/register?${params.toString()}`);
        
        // Store auth data if tokens are returned
        if (res.data.access_token && res.data.refresh_token) {
            AuthService.storeAuthData(res.data);
        } else {
            // Store user data only
            sessionStorage.setItem("user", JSON.stringify(res.data));
        }
        
        console.log("Registration response data:", res.data);
        return res.data;
    },

    /**
     * Register admin account (one-time setup)
     * @param {Object} userData - User data object
     * @param {string} userData.email - Admin email (required)
     * @param {string} userData.password_hash - Admin password (required)
     * @param {string} userData.username - Username (optional)
     * @param {string} userData.phone_number - Phone number (optional)
     * @returns {Promise<Object>} - User object
     */
    registerAdmin: async (userData) => {
        const res = await API.post("/auth/register-admin", {
            email: userData.email,
            password_hash: userData.password_hash,
            role: 'admin',
            username: userData.username || null,
            phone_number: userData.phone_number || null
        });
        
        // Store auth data if tokens are returned
        if (res.data.access_token && res.data.refresh_token) {
            AuthService.storeAuthData(res.data);
        } else {
            sessionStorage.setItem("user", JSON.stringify(res.data));
        }
        
        console.log("Admin registration response data:", res.data);
        return res.data;
    },

    /**
     * Refresh access token using refresh token
     * @returns {Promise<string>} - New access token
     */
    refresh: async () => {
        const refresh_token = AuthService.getRefreshToken();
        if (!refresh_token) throw new Error("No refresh token");

        const res = await API.post("/auth/refresh", { refresh_token });
        
        // Store the new tokens
        AuthService.storeAuthData({
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
            user: res.data.user
        });
        
        return res.data.access_token;
    },

    /**
     * Logout user and clear auth data
     */
    logout: () => {
        AuthService.clearAuthData();
        window.location.href = "/login";
    },

    // =====================================================================
    // USER ENDPOINTS (Authentication required)
    // =====================================================================

    /**
     * Get current user profile
     * @returns {Promise<Object>} - User profile data
     */
    getCurrentUserProfile: async () => {
        const res = await API.get("/auth/me");
        return res.data;
    },

    /**
     * Update current user profile
     * @param {Object} updateData - Data to update
     * @param {string} updateData.username - New username (optional)
     * @param {string} updateData.email - New email (optional)
     * @param {string} updateData.phone_number - New phone number (optional)
     * @returns {Promise<Object>} - Updated user object
     */
    updateCurrentUserProfile: async (updateData) => {
        const res = await API.put("/auth/me", updateData);
        
        // Update stored user data
        const currentUser = AuthService.getCurrentUser();
        const updatedUser = { ...currentUser, ...res.data };
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        
        return res.data;
    },

    /**
     * Change current user password
     * @param {string} oldPassword - Current password
     * @param {string} newPassword - New password
     * @returns {Promise<Object>} - Success response
     */
    changePassword: async (oldPassword, newPassword) => {
        const res = await API.put("/auth/me/password", {
            old_password: oldPassword,
            new_password: newPassword
        });
        return res.data;
    },

    /**
     * Delete (deactivate) current user account
     * @returns {Promise<Object>} - Success response
     */
    deleteCurrentUserAccount: async () => {
        const res = await API.delete("/auth/me");
        AuthService.clearAuthData();
        return res.data;
    },

    // =====================================================================
    // ADMIN ENDPOINTS (Admin authentication required)
    // =====================================================================

    /**
     * Create new user (Admin only)
     * @param {Object} userData - User data
     * @returns {Promise<Object>} - Created user object
     */
    createUser: async (userData) => {
        const res = await API.post("/auth/users", userData);
        return res.data;
    },

    /**
     * List all users with filtering (Admin only)
     * @param {Object} params - Query parameters
     * @returns {Promise<Array>} - Array of users
     */
    listUsers: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        const res = await API.get(`/auth/users?${queryString}`);
        return res.data;
    },

    /**
     * Get user by ID (Admin only)
     * @param {string} userId - User ID
     * @returns {Promise<Object>} - User object
     */
    getUserById: async (userId) => {
        const res = await API.get(`/auth/users/${userId}`);
        return res.data;
    },

    /**
     * Update user (Admin only)
     * @param {string} userId - User ID
     * @param {Object} updateData - Data to update
     * @returns {Promise<Object>} - Updated user object
     */
    updateUser: async (userId, updateData) => {
        const res = await API.put(`/auth/users/${userId}`, updateData);
        return res.data;
    },

    /**
     * Reset user password (Admin only)
     * @param {string} userId - User ID
     * @param {string} newPassword - New password
     * @returns {Promise<Object>} - Success response
     */
    resetUserPassword: async (userId, newPassword) => {
        const res = await API.put(`/auth/users/${userId}/password`, {
            new_password: newPassword
        });
        return res.data;
    },

    /**
     * Update user role (Admin only)
     * @param {string} userId - User ID
     * @param {string} role - New role (user/professional/admin)
     * @returns {Promise<Object>} - Updated user object
     */
    updateUserRole: async (userId, role) => {
        const res = await API.put(`/auth/users/${userId}/role`, { role });
        return res.data;
    },

    /**
     * Update user status (Admin only)
     * @param {string} userId - User ID
     * @param {string} status - New status (active/suspended/deactivated)
     * @returns {Promise<Object>} - Updated user object
     */
    updateUserStatus: async (userId, status) => {
        const res = await API.put(`/auth/users/${userId}/status`, { status });
        return res.data;
    },

    /**
     * Suspend user account (Admin only)
     * @param {string} userId - User ID
     * @returns {Promise<Object>} - Updated user object
     */
    suspendUser: async (userId) => {
        const res = await API.post(`/auth/users/${userId}/suspend`);
        return res.data;
    },

    /**
     * Activate user account (Admin only)
     * @param {string} userId - User ID
     * @returns {Promise<Object>} - Updated user object
     */
    activateUser: async (userId) => {
        const res = await API.post(`/auth/users/${userId}/activate`);
        return res.data;
    },

    /**
     * Delete user account (Admin only)
     * @param {string} userId - User ID
     * @param {boolean} hardDelete - Permanently delete if true, soft delete otherwise
     * @returns {Promise<Object>} - Success response
     */
    deleteUser: async (userId, hardDelete = false) => {
        const res = await API.delete(`/auth/users/${userId}?hard_delete=${hardDelete}`);
        return res.data;
    },

    /**
     * Get user statistics (Admin only)
     * @returns {Promise<Object>} - Statistics object
     */
    getStatistics: async () => {
        const res = await API.get("/auth/statistics");
        return res.data;
    },

    // =====================================================================
    // UTILITY METHODS
    // =====================================================================

    /**
     * Get current user from session storage
     * @returns {Object|null} - Current user object or null
     */
    getCurrentUser: () => AuthService.getCurrentUser(),

    /**
     * Check if user is authenticated
     * @returns {boolean} - True if user has access token
     */
    isAuthenticated: () => {
        const token = AuthService.getAccessToken();
        return !!token;
    },

    /**
     * Check if current user is admin
     * @returns {boolean} - True if user has admin role
     */
    isAdmin: () => {
        const user = AuthService.getCurrentUser();
        return user?.role === 'admin';
    },

    /**
     * Check if current user is professional
     * @returns {boolean} - True if user has professional role
     */
    isProfessional: () => {
        const user = AuthService.getCurrentUser();
        return user?.role === 'professional';
    }
};