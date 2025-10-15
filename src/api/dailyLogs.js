// src/api/dailyLogs.js
import API from "./axiosInstance";

export const DailyLogsAPI = {
    // =====================================================================
    // DAILY LOG ENDPOINTS
    // =====================================================================

    /**
     * Get or create today's daily log with all details
     * @returns {Promise<Object>} Today's daily log
     */
    getTodayLog: async () => {
        const res = await API.get("/daily-log/today");
        console.log("Today's log:", res.data);
        return res.data;
    },

    /**
     * Get daily log for a specific date
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @returns {Promise<Object>} Daily log for the date
     */
    getLogByDate: async (logDate) => {
        const res = await API.get(`/daily-log/${logDate}`);
        console.log(`Log for ${logDate}:`, res.data);
        return res.data;
    },

    /**
     * Get daily logs within a date range
     * @param {string} startDate - Start date (YYYY-MM-DD)
     * @param {string} endDate - End date (YYYY-MM-DD)
     * @returns {Promise<Array>} Array of daily logs
     */
    getLogsByRange: async (startDate, endDate) => {
        const res = await API.get("/daily-log/range/", {
            params: { start_date: startDate, end_date: endDate }
        });
        console.log(`Logs from ${startDate} to ${endDate}:`, res.data);
        return res.data;
    },

    // =====================================================================
    // CHECK-IN ENDPOINTS
    // =====================================================================

    /**
     * Add a new check-in entry
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @param {Object} checkinData - Check-in data
     * @param {string} checkinData.field - Field name (mood, stress_level, energy_level, sleep)
     * @param {any} checkinData.value - Value to set
     * @param {string} [checkinData.timestamp] - Optional ISO timestamp
     * @returns {Promise<Object>} Success response
     */
    addCheckinEntry: async (logDate, checkinData) => {
        const res = await API.post(`/daily-log/${logDate}/checkin/add`, checkinData);
        console.log("Check-in added:", res.data);
        return res.data;
    },

    /**
     * Update an existing check-in entry
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @param {Object} checkinData - Check-in data with timestamp required
     * @returns {Promise<Object>} Success response
     */
    updateCheckinEntry: async (logDate, checkinData) => {
        const res = await API.put(`/daily-log/${logDate}/checkin/update`, checkinData);
        console.log("Check-in updated:", res.data);
        return res.data;
    },

    /**
     * Get latest check-in values for a date
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @returns {Promise<Object>} Latest check-in values
     */
    getLatestCheckin: async (logDate) => {
        const res = await API.get(`/daily-log/${logDate}/checkin/latest`);
        return res.data;
    },

    /**
     * Get full-day check-in history
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @returns {Promise<Object>} Full check-in history
     */
    getCheckinHistory: async (logDate) => {
        const res = await API.get(`/daily-log/${logDate}/checkin`);
        return res.data;
    },

    // =====================================================================
    // JOURNAL ENDPOINTS
    // =====================================================================

    /**
     * Add a new journal entry
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @param {Object} journalData - Journal entry data
     * @param {string} journalData.content - Entry content
     * @param {string} [journalData.entry_type] - Type of entry (default: "text")
     * @param {string} [journalData.sentiment] - Sentiment analysis
     * @param {Array<string>} [journalData.topics] - Topics/tags
     * @returns {Promise<Object>} Created entry with timestamp
     */
    addJournalEntry: async (logDate, journalData) => {
        const res = await API.post(`/daily-log/${logDate}/journal`, journalData);
        console.log("Journal entry added:", res.data);
        return res.data;
    },

    /**
     * Update an existing journal entry
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @param {string} timestamp - ISO timestamp of the entry
     * @param {Object} updateData - Fields to update
     * @returns {Promise<Object>} Updated entry
     */
    updateJournalEntry: async (logDate, timestamp, updateData) => {
        const res = await API.put(`/daily-log/${logDate}/journal/${timestamp}`, updateData);
        console.log("Journal entry updated:", res.data);
        return res.data;
    },

    /**
     * Get all journal entries for a date
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @returns {Promise<Object>} All journal entries
     */
    getJournalEntries: async (logDate) => {
        const res = await API.get(`/daily-log/${logDate}/journal`);
        return res.data;
    },

    /**
     * Delete a journal entry
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @param {string} timestamp - ISO timestamp of the entry
     * @returns {Promise<Object>} Success message
     */
    deleteJournalEntry: async (logDate, timestamp) => {
        const res = await API.delete(`/daily-log/${logDate}/journal/${timestamp}`);
        console.log("Journal entry deleted:", res.data);
        return res.data;
    },

    // =====================================================================
    // CHATBOT ENDPOINTS
    // =====================================================================

    /**
     * Add a message to chatbot conversation
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @param {Object} messageData - Message data
     * @param {string} messageData.role - Role ("user" or "assistant")
     * @param {string} messageData.content - Message content
     * @returns {Promise<Object>} Success response with timestamp
     */
    addChatbotMessage: async (logDate, messageData) => {
        const res = await API.post(`/daily-log/${logDate}/chatbot`, messageData);
        console.log("Chatbot message added:", res.data);
        return res.data;
    },

    /**
     * Get chatbot conversation for a date
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @returns {Promise<Array>} Conversation messages
     */
    getChatbotConversation: async (logDate) => {
        const res = await API.get(`/daily-log/${logDate}/chatbot`);
        return res.data;
    },

    /**
     * Delete a specific chatbot message
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @param {number} messageIndex - Index of the message
     * @returns {Promise<Object>} Success message
     */
    deleteChatbotMessage: async (logDate, messageIndex) => {
        const res = await API.delete(`/daily-log/${logDate}/chatbot/${messageIndex}`);
        console.log("Chatbot message deleted:", res.data);
        return res.data;
    },

    /**
     * Clear entire chatbot conversation
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @returns {Promise<Object>} Success message
     */
    clearChatbotConversation: async (logDate) => {
        const res = await API.delete(`/daily-log/${logDate}/chatbot`);
        console.log("Chatbot conversation cleared:", res.data);
        return res.data;
    },

    // =====================================================================
    // ACTIVITY TRACKING ENDPOINTS
    // =====================================================================

    /**
     * Initialize daily activities from priorities
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @returns {Promise<Object>} Initialized activities
     */
    initializeActivities: async (logDate) => {
        const res = await API.post(`/daily-log/${logDate}/activities/initialize`);
        console.log("Activities initialized:", res.data);
        return res.data;
    },

    /**
     * Get all activities for a date
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @returns {Promise<Object>} All activities
     */
    getActivities: async (logDate) => {
        const res = await API.get(`/daily-log/${logDate}/activities`);
        return res.data;
    },

    /**
     * Get specific activity details
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @param {string} activityName - Name of the activity
     * @param {string} [category] - Optional category filter
     * @returns {Promise<Object>} Activity details with completion percentage
     */
    getActivityDetail: async (logDate, activityName, category = null) => {
        const res = await API.get(`/daily-log/${logDate}/activities/${activityName}`, {
            params: category ? { category } : {}
        });
        return res.data;
    },

    /**
     * Update activity complete value
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @param {string} activityName - Name of the activity
     * @param {Object} updateData - Update data
     * @param {number} updateData.completed - Complete value
     * @param {string} [updateData.category] - Optional category
     * @returns {Promise<Object>} Success response
     */
    updateActivityComplete: async (logDate, activityName, updateData) => {
        const res = await API.put(`/daily-log/${logDate}/activities/${activityName}`, updateData);
        console.log("Activity updated:", res.data);
        return res.data;
    },

    /**
     * Increment activity complete value
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @param {string} activityName - Name of the activity
     * @param {Object} incrementData - Increment data
     * @param {number} incrementData.increment - Amount to increment (can be negative)
     * @param {string} [incrementData.category] - Optional category
     * @returns {Promise<Object>} Success response
     */
    incrementActivityComplete: async (logDate, activityName, incrementData) => {
        const res = await API.patch(`/daily-log/${logDate}/activities/${activityName}/increment`, incrementData);
        console.log("Activity incremented:", res.data);
        return res.data;
    },

    /**
     * Reset specific activity to 0
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @param {string} activityName - Name of the activity
     * @param {string} [category] - Optional category filter
     * @returns {Promise<Object>} Success response
     */
    resetActivity: async (logDate, activityName, category = null) => {
        const res = await API.post(`/daily-log/${logDate}/activities/${activityName}/reset`, null, {
            params: category ? { category } : {}
        });
        console.log("Activity reset:", res.data);
        return res.data;
    },

    /**
     * Reset all activities in a category
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @param {string} category - Category name (health, work, growth, relationship)
     * @returns {Promise<Object>} Updated activities
     */
    resetCategoryActivities: async (logDate, category) => {
        const res = await API.post(`/daily-log/${logDate}/activities/reset/category/${category}`);
        console.log(`Category ${category} reset:`, res.data);
        return res.data;
    },

    /**
     * Reset all activities
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @returns {Promise<Object>} Updated activities
     */
    resetAllActivities: async (logDate) => {
        const res = await API.post(`/daily-log/${logDate}/activities/reset/all`);
        console.log("All activities reset:", res.data);
        return res.data;
    },

    // =====================================================================
    // PROGRESS & ANALYTICS ENDPOINTS
    // =====================================================================

    /**
     * Get daily progress summary
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @returns {Promise<Object>} Progress summary with completion stats
     */
    getProgressSummary: async (logDate) => {
        const res = await API.get(`/daily-log/${logDate}/progress/summary`);
        return res.data;
    },

    /**
     * Get activity streak
     * @param {string} activityName - Name of the activity
     * @param {string} [category] - Optional category filter
     * @param {number} [days=30] - Number of days to analyze (1-365)
     * @returns {Promise<Object>} Streak data
     */
    getActivityStreak: async (activityName, category = null, days = 30) => {
        const params = { days };
        if (category) params.category = category;
        
        const res = await API.get(`/daily-log/activities/${activityName}/streak`, { params });
        return res.data;
    },

    /**
     * Get completion percentage for an activity
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @param {string} activityName - Name of the activity
     * @param {string} [category] - Optional category filter
     * @returns {Promise<Object>} Completion percentage data
     */
    getCompletionPercentage: async (logDate, activityName, category = null) => {
        const res = await API.get(`/daily-log/${logDate}/activities/${activityName}/percentage`, {
            params: category ? { category } : {}
        });
        return res.data;
    },

    // =====================================================================
    // BULK OPERATIONS
    // =====================================================================

    /**
     * Bulk update multiple activities
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @param {Object} bulkData - Bulk update data
     * @param {Array<Object>} bulkData.updates - Array of updates
     * @returns {Promise<Object>} Bulk update response with success/error counts
     */
    bulkUpdateActivities: async (logDate, bulkData) => {
        const res = await API.put(`/daily-log/${logDate}/activities/bulk-update`, bulkData);
        console.log("Bulk update completed:", res.data);
        return res.data;
    },

    /**
     * Get all activities for a specific date
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @returns {Promise<Object>} All activities
     */
    getAllActivities: async (logDate) => {
        const res = await API.get("/daily-log/activities/all", {
            params: { log_date: logDate }
        });
        return res.data;
    },

    // =====================================================================
    // DAILY SUMMARY
    // =====================================================================

    /**
     * Generate AI-ready summary of the day
     * @param {string} logDate - Date in YYYY-MM-DD format
     * @returns {Promise<Object>} Daily summary
     */
    getDailySummary: async (logDate) => {
        const res = await API.get(`/daily-log/${logDate}/summary`);
        return res.data;
    },
};