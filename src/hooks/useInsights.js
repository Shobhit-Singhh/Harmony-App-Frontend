// src/hooks/useInsights.js
import { useState } from "react";
import { InsightsAPI } from "../api/insights";

export const useInsights = () => {
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

    // User endpoints
    const getMyInsights = () => handleApiCall(InsightsAPI.getMyInsights);

    // Professional/Admin endpoints
    const createInsight = (insightData) => 
        handleApiCall(InsightsAPI.createInsight, insightData);

    const checkUserHasInsights = (userId) => 
        handleApiCall(InsightsAPI.checkUserHasInsights, userId);

    const getMyAssessments = (skip = 0, limit = 100) => 
        handleApiCall(InsightsAPI.getMyAssessments, skip, limit);

    const getInsightsByUser = (userId) => 
        handleApiCall(InsightsAPI.getInsightsByUser, userId);

    const getInsightById = (insightId) => 
        handleApiCall(InsightsAPI.getInsightById, insightId);

    // Update endpoint
    const updateInsight = (insightId, updateData) => 
        handleApiCall(InsightsAPI.updateInsight, insightId, updateData);

    // Admin endpoints
    const listAllInsights = (skip = 0, limit = 100) => 
        handleApiCall(InsightsAPI.listAllInsights, skip, limit);

    const getInsightCount = () => 
        handleApiCall(InsightsAPI.getInsightCount);

    const deleteInsight = (insightId) => 
        handleApiCall(InsightsAPI.deleteInsight, insightId);

    return {
        loading,
        error,
        setError,
        // User methods
        getMyInsights,
        // Professional/Admin methods
        createInsight,
        checkUserHasInsights,
        getMyAssessments,
        getInsightsByUser,
        getInsightById,
        updateInsight,
        // Admin methods
        listAllInsights,
        getInsightCount,
        deleteInsight,
    };
};