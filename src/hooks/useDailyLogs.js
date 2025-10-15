// src/hooks/useDailyLogs.js
import { useState } from "react";
import { DailyLogsAPI } from "../api/dailyLogs";

export const useDailyLogs = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Helper function to handle API calls
    const handleApiCall = async (apiFunction, ...args) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiFunction(...args);
            return result;
        } catch (err) {
            const errorMessage = err.response?.data?.detail || err.message || "An error occurred";
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // =====================================================================
    // DAILY LOG METHODS
    // =====================================================================

    const getTodayLog = () =>
        handleApiCall(DailyLogsAPI.getTodayLog);

    const getLogByDate = (logDate) =>
        handleApiCall(DailyLogsAPI.getLogByDate, logDate);

    const getLogsByRange = (startDate, endDate) =>
        handleApiCall(DailyLogsAPI.getLogsByRange, startDate, endDate);

    // =====================================================================
    // CHECK-IN METHODS
    // =====================================================================

    const addCheckinEntry = (logDate, checkinData) =>
        handleApiCall(DailyLogsAPI.addCheckinEntry, logDate, checkinData);

    const updateCheckinEntry = (logDate, checkinData) =>
        handleApiCall(DailyLogsAPI.updateCheckinEntry, logDate, checkinData);

    const getLatestCheckin = (logDate) =>
        handleApiCall(DailyLogsAPI.getLatestCheckin, logDate);

    const getCheckinHistory = (logDate) =>
        handleApiCall(DailyLogsAPI.getCheckinHistory, logDate);

    // =====================================================================
    // JOURNAL METHODS
    // =====================================================================

    const addJournalEntry = (logDate, journalData) =>
        handleApiCall(DailyLogsAPI.addJournalEntry, logDate, journalData);

    const updateJournalEntry = (logDate, timestamp, updateData) =>
        handleApiCall(DailyLogsAPI.updateJournalEntry, logDate, timestamp, updateData);

    const getJournalEntries = (logDate) =>
        handleApiCall(DailyLogsAPI.getJournalEntries, logDate);

    const deleteJournalEntry = (logDate, timestamp) =>
        handleApiCall(DailyLogsAPI.deleteJournalEntry, logDate, timestamp);

    // =====================================================================
    // CHATBOT METHODS
    // =====================================================================

    const addChatbotMessage = (logDate, messageData) =>
        handleApiCall(DailyLogsAPI.addChatbotMessage, logDate, messageData);

    const getChatbotConversation = (logDate) =>
        handleApiCall(DailyLogsAPI.getChatbotConversation, logDate);

    const deleteChatbotMessage = (logDate, messageIndex) =>
        handleApiCall(DailyLogsAPI.deleteChatbotMessage, logDate, messageIndex);

    const clearChatbotConversation = (logDate) =>
        handleApiCall(DailyLogsAPI.clearChatbotConversation, logDate);

    // =====================================================================
    // ACTIVITY TRACKING METHODS
    // =====================================================================

    const initializeActivities = (logDate) =>
        handleApiCall(DailyLogsAPI.initializeActivities, logDate);

    const getActivities = (logDate) =>
        handleApiCall(DailyLogsAPI.getActivities, logDate);

    const getActivityDetail = (logDate, activityName, category = null) =>
        handleApiCall(DailyLogsAPI.getActivityDetail, logDate, activityName, category);

    const updateActivityComplete = (logDate, activityName, updateData) =>
        handleApiCall(DailyLogsAPI.updateActivityComplete, logDate, activityName, updateData);

    const incrementActivityComplete = (logDate, activityName, incrementData) =>
        handleApiCall(DailyLogsAPI.incrementActivityComplete, logDate, activityName, incrementData);

    const resetActivity = (logDate, activityName, category = null) =>
        handleApiCall(DailyLogsAPI.resetActivity, logDate, activityName, category);

    const resetCategoryActivities = (logDate, category) =>
        handleApiCall(DailyLogsAPI.resetCategoryActivities, logDate, category);

    const resetAllActivities = (logDate) =>
        handleApiCall(DailyLogsAPI.resetAllActivities, logDate);

    // =====================================================================
    // PROGRESS & ANALYTICS METHODS
    // =====================================================================

    const getProgressSummary = (logDate) =>
        handleApiCall(DailyLogsAPI.getProgressSummary, logDate);

    const getActivityStreak = (activityName, category = null, days = 30) =>
        handleApiCall(DailyLogsAPI.getActivityStreak, activityName, category, days);

    const getCompletionPercentage = (logDate, activityName, category = null) =>
        handleApiCall(DailyLogsAPI.getCompletionPercentage, logDate, activityName, category);

    // =====================================================================
    // BULK OPERATIONS METHODS
    // =====================================================================

    const bulkUpdateActivities = (logDate, bulkData) =>
        handleApiCall(DailyLogsAPI.bulkUpdateActivities, logDate, bulkData);

    const getAllActivities = (logDate) =>
        handleApiCall(DailyLogsAPI.getAllActivities, logDate);

    // =====================================================================
    // DAILY SUMMARY METHOD
    // =====================================================================

    const getDailySummary = (logDate) =>
        handleApiCall(DailyLogsAPI.getDailySummary, logDate);

    return {
        loading,
        error,
        setError,

        // Daily Log methods
        getTodayLog,
        getLogByDate,
        getLogsByRange,

        // Check-in methods
        addCheckinEntry,
        updateCheckinEntry,
        getLatestCheckin,
        getCheckinHistory,

        // Journal methods
        addJournalEntry,
        updateJournalEntry,
        getJournalEntries,
        deleteJournalEntry,

        // Chatbot methods
        addChatbotMessage,
        getChatbotConversation,
        deleteChatbotMessage,
        clearChatbotConversation,

        // Activity tracking methods
        initializeActivities,
        getActivities,
        getActivityDetail,
        updateActivityComplete,
        incrementActivityComplete,
        resetActivity,
        resetCategoryActivities,
        resetAllActivities,

        // Progress & Analytics methods
        getProgressSummary,
        getActivityStreak,
        getCompletionPercentage,

        // Bulk operations methods
        bulkUpdateActivities,
        getAllActivities,

        // Daily summary method
        getDailySummary,
    };
};