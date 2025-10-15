// src/utils/prioritiesFormHelpers.js

/**
 * Get empty priorities form structure
 * @param {string} userId - User UUID
 * @returns {Object} Empty priorities form data
 */
export const getEmptyPrioritiesForm = (userId) => ({
    user_id: userId,
    minimal_profile: {
        display_name: "",
        age_group: "",
        gender_identity: "",
        pronouns: ""
    },
    pillar_importance: {
        health_weight: 0.25,
        work_weight: 0.25,
        growth_weight: 0.25,
        relationships_weight: 0.25
    },
    health_pillar: {
        goals: [],
        baseline: "",
        activities: [],
        coping_strategies: []
    },
    work_pillar: {
        goals: [],
        baseline: "",
        activities: [],
        coping_strategies: []
    },
    growth_pillar: {
        goals: [],
        baseline: "",
        activities: [],
        coping_strategies: []
    },
    relationships_pillar: {
        goals: [],
        baseline: "",
        activities: [],
        coping_strategies: []
    },
    preferences: {
        check_in_schedule: "daily",
        privacy_settings: "private",
        notification_preferences: "all"
    }
});

/**
 * Get empty activity configuration
 */
export const getEmptyActivityConfig = () => ({
    name: "",
    description: "",
    pillar: "",
    dimension: "",
    complete: 0,
    unit: "",
    quota_value: 0,
    reset_frequency: "daily"
});

/**
 * Form dropdown options
 */
export const prioritiesFormOptions = {
    ageGroups: [
        "18-24",
        "25-34",
        "35-44",
        "45-54",
        "55-64",
        "65+"
    ],
    genderIdentities: [
        "Male",
        "Female",
        "Non-binary",
        "Prefer not to say",
        "Other"
    ],
    pronouns: [
        "He/Him",
        "She/Her",
        "They/Them",
        "Other"
    ],
    pillars: [
        "health",
        "work",
        "growth",
        "relationships"
    ],
    checkInSchedule: [
        "daily",
        "weekly",
        "bi-weekly",
        "monthly"
    ],
    privacySettings: [
        "private",
        "public",
        "friends_only"
    ],
    notificationPreferences: [
        "all",
        "important_only",
        "none"
    ],
    resetFrequencies: [
        "daily",
        "weekly",
        "bi-weekly",
        "monthly",
        "quarterly",
        "yearly"
    ],
    dimensions: [
        "time",
        "distance",
        "weight",
        "volume",
        "count",
        "rating",
        "boolean",
        "text"
    ]
};

/**
 * Validate priorities form
 * @param {Object} formData - Priorities form data
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export const validatePrioritiesForm = (formData) => {
    const errors = [];

    // Required fields
    if (!formData.user_id) {
        errors.push("User ID is required");
    }

    // Validate minimal profile
    if (!formData.minimal_profile?.display_name) {
        errors.push("Display name is required");
    }

    // Validate pillar importance weights sum to 1.0
    const weights = formData.pillar_importance;
    if (weights) {
        const sum = (weights.health_weight || 0) + 
                   (weights.work_weight || 0) + 
                   (weights.growth_weight || 0) + 
                   (weights.relationships_weight || 0);
        
        if (Math.abs(sum - 1.0) > 0.01) {
            errors.push("Pillar importance weights must sum to 1.0");
        }

        // Each weight should be between 0 and 1
        Object.entries(weights).forEach(([key, value]) => {
            if (value < 0 || value > 1) {
                errors.push(`${key} must be between 0 and 1`);
            }
        });
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Validate activity configuration
 * @param {Object} activityConfig - Activity configuration
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export const validateActivityConfig = (activityConfig) => {
    const errors = [];

    if (!activityConfig.name) {
        errors.push("Activity name is required");
    }

    if (!activityConfig.pillar) {
        errors.push("Pillar is required");
    }

    if (!activityConfig.dimension) {
        errors.push("Dimension is required");
    }

    if (!activityConfig.unit) {
        errors.push("Unit is required");
    }

    if (!activityConfig.quota_value || activityConfig.quota_value <= 0) {
        errors.push("Quota value must be greater than 0");
    }

    if (!activityConfig.reset_frequency) {
        errors.push("Reset frequency is required");
    }

    if (activityConfig.complete < 0) {
        errors.push("Progress value cannot be negative");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Calculate pillar progress percentage
 * @param {Array} activities - Array of activities for a pillar
 * @returns {number} Progress percentage (0-100)
 */
export const calculatePillarProgress = (activities) => {
    if (!activities || activities.length === 0) return 0;

    const totalProgress = activities.reduce((sum, activity) => {
        const progress = activity.configuration?.complete || 0;
        const quota = activity.configuration?.quota?.value || 1;
        return sum + (progress / quota);
    }, 0);

    return Math.min((totalProgress / activities.length) * 100, 100);
};

/**
 * Calculate activity progress percentage
 * @param {number} complete - Current progress
 * @param {number} quotaValue - Target value
 * @returns {number} Progress percentage (0-100)
 */
export const calculateActivityProgress = (complete, quotaValue) => {
    if (!quotaValue || quotaValue === 0) return 0;
    return Math.min((complete / quotaValue) * 100, 100);
};

/**
 * Get progress status color
 * @param {number} percentage - Progress percentage
 * @returns {string} Color code
 */
export const getProgressColor = (percentage) => {
    if (percentage >= 100) return "#10b981"; // green
    if (percentage >= 75) return "#3b82f6"; // blue
    if (percentage >= 50) return "#f59e0b"; // orange
    if (percentage >= 25) return "#ef4444"; // red
    return "#6b7280"; // gray
};

/**
 * Format reset frequency for display
 */
export const formatResetFrequency = (frequency) => {
    const mapping = {
        daily: "Daily",
        weekly: "Weekly",
        "bi-weekly": "Bi-weekly",
        monthly: "Monthly",
        quarterly: "Quarterly",
        yearly: "Yearly"
    };
    return mapping[frequency] || frequency;
};

/**
 * Format dimension for display
 */
export const formatDimension = (dimension) => {
    const mapping = {
        time: "Time",
        distance: "Distance",
        weight: "Weight",
        volume: "Volume",
        count: "Count",
        rating: "Rating",
        boolean: "Completed",
        text: "Notes"
    };
    return mapping[dimension] || dimension;
};

/**
 * Get pillar icon/emoji
 */
export const getPillarIcon = (pillar) => {
    const icons = {
        health: "💪",
        work: "💼",
        growth: "🌱",
        relationships: "❤️"
    };
    return icons[pillar] || "📌";
};

/**
 * Get pillar color
 */
export const getPillarColor = (pillar) => {
    const colors = {
        health: "#10b981",
        work: "#3b82f6",
        growth: "#8b5cf6",
        relationships: "#ec4899"
    };
    return colors[pillar] || "#6b7280";
};

/**
 * Normalize pillar weights to sum to 1.0
 * @param {Object} weights - Pillar importance weights
 * @returns {Object} Normalized weights
 */
export const normalizePillarWeights = (weights) => {
    const sum = (weights.health_weight || 0) + 
               (weights.work_weight || 0) + 
               (weights.growth_weight || 0) + 
               (weights.relationships_weight || 0);

    if (sum === 0) {
        return {
            health_weight: 0.25,
            work_weight: 0.25,
            growth_weight: 0.25,
            relationships_weight: 0.25
        };
    }

    return {
        health_weight: (weights.health_weight || 0) / sum,
        work_weight: (weights.work_weight || 0) / sum,
        growth_weight: (weights.growth_weight || 0) / sum,
        relationships_weight: (weights.relationships_weight || 0) / sum
    };
};

/**
 * Prepare priorities for update (remove null/empty values)
 */
export const preparePrioritiesForUpdate = (formData) => {
    const cleanObject = (obj) => {
        if (obj === null || obj === undefined) return null;
        if (typeof obj !== 'object') return obj;
        if (Array.isArray(obj)) return obj.filter(item => item !== null && item !== undefined && item !== "");
        
        const cleaned = {};
        for (const [key, value] of Object.entries(obj)) {
            if (value !== null && value !== undefined && value !== "") {
                if (typeof value === 'object') {
                    const cleanedValue = cleanObject(value);
                    if (cleanedValue && (Array.isArray(cleanedValue) ? cleanedValue.length > 0 : Object.keys(cleanedValue).length > 0)) {
                        cleaned[key] = cleanedValue;
                    }
                } else {
                    cleaned[key] = value;
                }
            }
        }
        return cleaned;
    };

    return cleanObject(formData);
};

/**
 * Get activity summary statistics
 */
export const getActivityStats = (activities) => {
    if (!activities || activities.length === 0) {
        return {
            total: 0,
            completed: 0,
            inProgress: 0,
            notStarted: 0
        };
    }

    let completed = 0;
    let inProgress = 0;
    let notStarted = 0;

    activities.forEach(activity => {
        const progress = activity.configuration?.complete || 0;
        const quota = activity.configuration?.quota?.value || 1;
        const percentage = (progress / quota) * 100;

        if (percentage >= 100) completed++;
        else if (percentage > 0) inProgress++;
        else notStarted++;
    });

    return {
        total: activities.length,
        completed,
        inProgress,
        notStarted
    };
};