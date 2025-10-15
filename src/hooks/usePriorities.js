// src/hooks/usePriorities.js
import { useState } from "react";
import { PrioritiesAPI } from "../api/priorities";

export const usePriorities = () => {
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

    // User priorities management
    const createPriorities = (prioritiesData) => 
        handleApiCall(PrioritiesAPI.createPriorities, prioritiesData);

    const getMyPriorities = () => 
        handleApiCall(PrioritiesAPI.getMyPriorities);

    const updateMyPriorities = (updateData) => 
        handleApiCall(PrioritiesAPI.updateMyPriorities, updateData);

    const deleteMyPriorities = () => 
        handleApiCall(PrioritiesAPI.deleteMyPriorities);

    const completeOnboarding = () => 
        handleApiCall(PrioritiesAPI.completeOnboarding);

    // Admin endpoints
    const getPrioritiesByUser = (userId) => 
        handleApiCall(PrioritiesAPI.getPrioritiesByUser, userId);

    const checkUserHasPriorities = (userId) => 
        handleApiCall(PrioritiesAPI.checkUserHasPriorities, userId);

    const deleteUserPriorities = (userId) => 
        handleApiCall(PrioritiesAPI.deleteUserPriorities, userId);

    // Activity templates
    const getAllActivityTemplates = () => 
        handleApiCall(PrioritiesAPI.getAllActivityTemplates);

    const getActivityTemplatesByPillar = (pillar) => 
        handleApiCall(PrioritiesAPI.getActivityTemplatesByPillar, pillar);

    const getActivityTemplate = (activityName) => 
        handleApiCall(PrioritiesAPI.getActivityTemplate, activityName);

    const getDimensionOptions = () => 
        handleApiCall(PrioritiesAPI.getDimensionOptions);

    const getDimensionUnits = (dimension) => 
        handleApiCall(PrioritiesAPI.getDimensionUnits, dimension);

    // Activity building
    const buildCustomActivity = (activityConfig) => 
        handleApiCall(PrioritiesAPI.buildCustomActivity, activityConfig);

    // User activity management
    const addMyActivity = (activityData) => 
        handleApiCall(PrioritiesAPI.addMyActivity, activityData);

    const updateMyActivity = (pillar, activityName, updates) => 
        handleApiCall(PrioritiesAPI.updateMyActivity, pillar, activityName, updates);

    const updateActivityProgress = (pillar, activityName, complete) => 
        handleApiCall(PrioritiesAPI.updateActivityProgress, pillar, activityName, complete);

    const removeMyActivity = (pillar, activityName) => 
        handleApiCall(PrioritiesAPI.removeMyActivity, pillar, activityName);

    const getAllMyActivities = () => 
        handleApiCall(PrioritiesAPI.getAllMyActivities);

    const getMyActivitiesByPillar = (pillar) => 
        handleApiCall(PrioritiesAPI.getMyActivitiesByPillar, pillar);

    const bulkAddMyActivities = (activities) => 
        handleApiCall(PrioritiesAPI.bulkAddMyActivities, activities);

    // Admin activity management
    const getUserActivities = (userId) => 
        handleApiCall(PrioritiesAPI.getUserActivities, userId);

    const getUserActivitiesByPillar = (userId, pillar) => 
        handleApiCall(PrioritiesAPI.getUserActivitiesByPillar, userId, pillar);

    return {
        loading,
        error,
        setError,
        // Priorities management
        createPriorities,
        getMyPriorities,
        updateMyPriorities,
        deleteMyPriorities,
        completeOnboarding,
        // Admin
        getPrioritiesByUser,
        checkUserHasPriorities,
        deleteUserPriorities,
        // Activity templates
        getAllActivityTemplates,
        getActivityTemplatesByPillar,
        getActivityTemplate,
        getDimensionOptions,
        getDimensionUnits,
        // Activity building
        buildCustomActivity,
        // Activity management
        addMyActivity,
        updateMyActivity,
        updateActivityProgress,
        removeMyActivity,
        getAllMyActivities,
        getMyActivitiesByPillar,
        bulkAddMyActivities,
        // Admin activities
        getUserActivities,
        getUserActivitiesByPillar,
    };
};