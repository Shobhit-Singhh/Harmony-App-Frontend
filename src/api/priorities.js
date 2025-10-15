// src/api/priorities.js
import API from "./axiosInstance";

export const PrioritiesAPI = {
    // =====================================================================
    // USER ENDPOINTS - Manage own priorities
    // =====================================================================

    /**
     * Create priorities for the authenticated user
     * @param {Object} prioritiesData - Complete priorities configuration
     * @returns {Promise<Object>} Created priorities
     */
    createPriorities: async (prioritiesData) => {
        const res = await API.post("/priorities", prioritiesData);
        console.log("Created priorities:", res.data);
        return res.data;
    },

    /**
     * Get authenticated user's priorities
     * @returns {Promise<Object>} User priorities
     */
    getMyPriorities: async () => {
        const res = await API.get("/priorities/me");
        console.log("My priorities:", res.data);
        return res.data;
    },

    /**
     * Update authenticated user's priorities
     * @param {Object} updateData - Fields to update
     * @returns {Promise<Object>} Updated priorities
     */
    updateMyPriorities: async (updateData) => {
        const res = await API.put("/priorities/me", updateData);
        console.log("Updated priorities:", res.data);
        return res.data;
    },

    /**
     * Delete authenticated user's priorities
     * @returns {Promise<Object>} Success message
     */
    deleteMyPriorities: async () => {
        const res = await API.delete("/priorities/me");
        return res.data;
    },

    /**
     * Mark onboarding as complete
     * @returns {Promise<Object>} Updated priorities
     */
    completeOnboarding: async () => {
        const res = await API.post("/priorities/me/complete-onboarding");
        console.log("Onboarding completed:", res.data);
        return res.data;
    },

    // =====================================================================
    // ADMIN ENDPOINTS
    // =====================================================================

    /**
     * Get priorities by user ID (Admin only)
     * @param {string} userId - User UUID
     * @returns {Promise<Object>} User priorities
     */
    getPrioritiesByUser: async (userId) => {
        const res = await API.get(`/priorities/user/${userId}`);
        return res.data;
    },

    /**
     * Check if user has priorities
     * @param {string} userId - User UUID
     * @returns {Promise<Object>} Object with has_priorities (boolean)
     */
    checkUserHasPriorities: async (userId) => {
        const res = await API.get(`/priorities/user/${userId}/exists`);
        return res.data;
    },

    /**
     * Delete user priorities (Admin only)
     * @param {string} userId - User UUID
     * @returns {Promise<Object>} Success message
     */
    deleteUserPriorities: async (userId) => {
        const res = await API.delete(`/priorities/user/${userId}`);
        return res.data;
    },

    // =====================================================================
    // ACTIVITY TEMPLATE ENDPOINTS
    // =====================================================================

    /**
     * Get all activity templates grouped by pillar
     * @returns {Promise<Object>} Templates by pillar
     */
    getAllActivityTemplates: async () => {
        const res = await API.get("/priorities/activities/templates");
        console.log("Activity templates:", res.data);
        return res.data;
    },

    /**
     * Get activity templates for specific pillar
     * @param {string} pillar - Pillar name (health, work, growth, relationships)
     * @returns {Promise<Array>} List of activity templates
     */
    getActivityTemplatesByPillar: async (pillar) => {
        const res = await API.get(`/priorities/activities/templates/pillar/${pillar}`);
        return res.data;
    },

    /**
     * Get specific activity template by name
     * @param {string} activityName - Activity name
     * @returns {Promise<Object>} Activity template
     */
    getActivityTemplate: async (activityName) => {
        const res = await API.get(`/priorities/activities/templates/${activityName}`);
        return res.data;
    },

    /**
     * Get all dimension options with valid units
     * @returns {Promise<Array>} Dimensions and their units
     */
    getDimensionOptions: async () => {
        const res = await API.get("/priorities/activities/dimensions");
        return res.data;
    },

    /**
     * Get units for specific dimension
     * @param {string} dimension - Dimension name
     * @returns {Promise<Array>} List of valid units
     */
    getDimensionUnits: async (dimension) => {
        const res = await API.get(`/priorities/activities/dimensions/${dimension}/units`);
        return res.data;
    },

    // =====================================================================
    // ACTIVITY BUILDING ENDPOINT
    // =====================================================================

    /**
     * Build custom activity configuration with validation
     * @param {Object} activityConfig - Activity configuration
     * @returns {Promise<Object>} Validated activity configuration
     */
    buildCustomActivity: async (activityConfig) => {
        const res = await API.post("/priorities/activities/build", activityConfig);
        console.log("Built activity:", res.data);
        return res.data;
    },

    // =====================================================================
    // USER ACTIVITY MANAGEMENT
    // =====================================================================

    /**
     * Add activity to user's priorities
     * @param {Object} activityData - Activity configuration
     * @returns {Promise<Object>} Updated priorities
     */
    addMyActivity: async (activityData) => {
        const res = await API.post("/priorities/me/activities", activityData);
        console.log("Added activity:", res.data);
        return res.data;
    },

    /**
     * Update existing activity
     * @param {string} pillar - Pillar name
     * @param {string} activityName - Activity name
     * @param {Object} updates - Fields to update (as query params)
     * @returns {Promise<Object>} Updated priorities
     */
    updateMyActivity: async (pillar, activityName, updates) => {
        const params = new URLSearchParams();
        Object.entries(updates).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                params.append(key, value);
            }
        });
        const res = await API.put(
            `/priorities/me/activities/${pillar}/${activityName}?${params.toString()}`
        );
        console.log("Updated activity:", res.data);
        return res.data;
    },

    /**
     * Update activity progress only
     * @param {string} pillar - Pillar name
     * @param {string} activityName - Activity name
     * @param {number} complete - New progress value
     * @returns {Promise<Object>} Updated priorities
     */
    updateActivityProgress: async (pillar, activityName, complete) => {
        const res = await API.patch(
            `/priorities/me/activities/${pillar}/${activityName}/progress?complete=${complete}`
        );
        console.log("Updated progress:", res.data);
        return res.data;
    },

    /**
     * Remove activity from priorities
     * @param {string} pillar - Pillar name
     * @param {string} activityName - Activity name
     * @returns {Promise<Object>} Success message
     */
    removeMyActivity: async (pillar, activityName) => {
        const res = await API.delete(`/priorities/me/activities/${pillar}/${activityName}`);
        return res.data;
    },

    /**
     * Get all user activities across all pillars
     * @returns {Promise<Object>} Activities by pillar
     */
    getAllMyActivities: async () => {
        const res = await API.get("/priorities/me/activities");
        console.log("All my activities:", res.data);
        return res.data;
    },

    /**
     * Get activities for specific pillar
     * @param {string} pillar - Pillar name
     * @returns {Promise<Array>} List of activities
     */
    getMyActivitiesByPillar: async (pillar) => {
        const res = await API.get(`/priorities/me/activities/${pillar}`);
        return res.data;
    },

    /**
     * Bulk add multiple activities (onboarding)
     * @param {Array} activities - Array of activity configurations
     * @returns {Promise<Object>} Updated priorities
     */
    bulkAddMyActivities: async (activities) => {
        const res = await API.post("/priorities/me/activities/bulk", { activities });
        console.log("Bulk added activities:", res.data);
        return res.data;
    },

    // =====================================================================
    // ADMIN ACTIVITY MANAGEMENT
    // =====================================================================

    /**
     * Get all activities for user (Admin only)
     * @param {string} userId - User UUID
     * @returns {Promise<Object>} Activities by pillar
     */
    getUserActivities: async (userId) => {
        const res = await API.get(`/priorities/user/${userId}/activities`);
        return res.data;
    },

    /**
     * Get user activities by pillar (Admin only)
     * @param {string} userId - User UUID
     * @param {string} pillar - Pillar name
     * @returns {Promise<Array>} List of activities
     */
    getUserActivitiesByPillar: async (userId, pillar) => {
        const res = await API.get(`/priorities/user/${userId}/activities/${pillar}`);
        return res.data;
    },
};