// src/api/insights.js
import API from "./axiosInstance";

export const InsightsAPI = {
    // =====================================================================
    // USER ENDPOINTS - Get own insights
    // =====================================================================

    /**
     * Get all insight profiles for the authenticated user
     * @returns {Promise<Array>} List of user's insights
     */
    getMyInsights: async () => {
        const res = await API.get("/insights/me");
        console.log("My insights:", res.data);
        return res.data;
    },

    // =====================================================================
    // PROFESSIONAL/ADMIN ENDPOINTS - Create and manage insights
    // =====================================================================

    /**
     * Create a new user insight profile (Professional/Admin only)
     * @param {Object} insightData - Insight data
     * @param {string} insightData.user_id - UUID of the user
     * @param {Object} insightData.demographics - Demographics info
     * @param {Object} insightData.medical_history - Medical history
     * @param {Object} insightData.lifestyle_factors - Lifestyle factors
     * @param {Object} insightData.psychological_assessment - Psychological assessment
     * @param {Object} insightData.conclusion - Conclusion and notes
     * @param {Object} insightData.metadata - Assessment metadata
     * @returns {Promise<Object>} Created insight
     */
    createInsight: async (insightData) => {
        const res = await API.post("/insights", insightData);
        console.log("Created insight:", res.data);
        return res.data;
    },

    /**
     * Check if a user has any insight profiles
     * @param {string} userId - User UUID
     * @returns {Promise<Object>} Object with has_insight (boolean) and insight_id_list (array)
     */
    checkUserHasInsights: async (userId) => {
        const res = await API.get(`/insights/user/${userId}/exists`);
        return res.data;
    },

    /**
     * Get list of insights created by the authenticated professional
     * @param {number} skip - Number of records to skip
     * @param {number} limit - Maximum number of records to return
     * @returns {Promise<Array>} List of assessment summaries
     */
    getMyAssessments: async (skip = 0, limit = 100) => {
        const res = await API.get("/insights/assessments/me", {
            params: { skip, limit }
        });
        console.log("My assessments:", res.data);
        return res.data;
    },

    /**
     * Get all insight profiles for a specific user (Professional/Admin only)
     * @param {string} userId - User UUID
     * @returns {Promise<Array>} List of user's insights
     */
    getInsightsByUser: async (userId) => {
        const res = await API.get(`/insights/user/${userId}`);
        console.log(`Insights for user ${userId}:`, res.data);
        return res.data;
    },

    /**
     * Get insight by ID
     * @param {string} insightId - Insight UUID
     * @returns {Promise<Object>} Insight details
     */
    getInsightById: async (insightId) => {
        const res = await API.get(`/insights/${insightId}`);
        console.log("Insight details:", res.data);
        return res.data;
    },

    // =====================================================================
    // UPDATE ENDPOINTS
    // =====================================================================

    /**
     * Update entire insight profile (Professional/Admin only)
     * @param {string} insightId - Insight UUID
     * @param {Object} updateData - Fields to update (all optional)
     * @returns {Promise<Object>} Updated insight
     */
    updateInsight: async (insightId, updateData) => {
        const res = await API.put(`/insights/${insightId}`, updateData);
        console.log("Updated insight:", res.data);
        return res.data;
    },

    // =====================================================================
    // ADMIN ENDPOINTS
    // =====================================================================

    /**
     * Get list of all user insights (Admin only)
     * @param {number} skip - Number of records to skip
     * @param {number} limit - Maximum number of records to return
     * @returns {Promise<Array>} List of all insights
     */
    listAllInsights: async (skip = 0, limit = 100) => {
        const res = await API.get("/insights", {
            params: { skip, limit }
        });
        console.log("All insights:", res.data);
        return res.data;
    },

    /**
     * Get total count of all insights (Admin only)
     * @returns {Promise<Object>} Object with total_insights count
     */
    getInsightCount: async () => {
        const res = await API.get("/insights/statistics/count");
        return res.data;
    },

    /**
     * Delete a user insight (Admin only)
     * @param {string} insightId - Insight UUID
     * @returns {Promise<Object>} Success message
     */
    deleteInsight: async (insightId) => {
        const res = await API.delete(`/insights/${insightId}`);
        console.log("Delete response:", res.data);
        return res.data;
    },
};