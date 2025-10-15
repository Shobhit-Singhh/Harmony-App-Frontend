// src/utils/insightFormHelpers.js

/**
 * Get empty insight form structure
 * @param {string} userId - User UUID
 * @returns {Object} Empty insight form data
 */
export const getEmptyInsightForm = (userId) => ({
    user_id: userId,
    demographics: {
        age: null,
        living_situation: "",
        occupation: "",
        marital_status: "",
        education_level: ""
    },
    medical_history: {
        primary_diagnosis: "",
        secondary_diagnoses: [],
        family_history: "",
        current_medications: [],
        previous_therapy: "",
        hospitalization_history: "",
        lab_results: ""
    },
    lifestyle_factors: {
        sleep_pattern: "",
        exercise_frequency: "",
        substance_use: "",
        nutrition_habits: "",
        social_support: "",
        risk_behaviors: ""
    },
    psychological_assessment: {
        phq9_score: null,
        gad7_score: null,
        resilience_score: null,
        coping_score: null,
        assessment_notes: ""
    },
    conclusion: {
        caregiver_notes: "",
        therapy_goals: [],
        clinician_summary: ""
    },
    metadata: {
        assessed_by: "",
        assessment_date: new Date().toISOString().split('T')[0]
    }
});

/**
 * Dropdown options for various fields
 */
export const insightFormOptions = {
    livingSituation: [
        "Lives alone",
        "Lives with family",
        "Lives with roommate(s)",
        "Assisted living",
        "Homeless",
        "Other"
    ],
    maritalStatus: [
        "Single",
        "Married",
        "Divorced",
        "Widowed",
        "Separated",
        "In a relationship"
    ],
    educationLevel: [
        "High school or less",
        "Some college",
        "Bachelor's degree",
        "Master's degree",
        "Doctoral degree",
        "Professional degree"
    ],
    sleepPattern: [
        "Regular (7-9 hours)",
        "Insufficient (<6 hours)",
        "Excessive (>10 hours)",
        "Irregular schedule",
        "Insomnia",
        "Hypersomnia"
    ],
    exerciseFrequency: [
        "Daily",
        "3-5 times per week",
        "1-2 times per week",
        "Rarely",
        "Never"
    ],
    substanceUse: [
        "None",
        "Alcohol (moderate)",
        "Alcohol (heavy)",
        "Tobacco",
        "Cannabis",
        "Other substances"
    ]
};

/**
 * Validate insight form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export const validateInsightForm = (formData) => {
    const errors = [];

    // Required fields
    if (!formData.user_id) {
        errors.push("User ID is required");
    }

    if (!formData.metadata?.assessed_by) {
        errors.push("Assessor name is required");
    }

    if (!formData.metadata?.assessment_date) {
        errors.push("Assessment date is required");
    }

    // Validate scores if provided
    const scores = formData.psychological_assessment || {};
    
    if (scores.phq9_score !== null && scores.phq9_score !== undefined) {
        if (scores.phq9_score < 0 || scores.phq9_score > 27) {
            errors.push("PHQ-9 score must be between 0 and 27");
        }
    }

    if (scores.gad7_score !== null && scores.gad7_score !== undefined) {
        if (scores.gad7_score < 0 || scores.gad7_score > 21) {
            errors.push("GAD-7 score must be between 0 and 21");
        }
    }

    if (scores.resilience_score !== null && scores.resilience_score !== undefined) {
        if (scores.resilience_score < 0 || scores.resilience_score > 100) {
            errors.push("Resilience score must be between 0 and 100");
        }
    }

    if (scores.coping_score !== null && scores.coping_score !== undefined) {
        if (scores.coping_score < 0 || scores.coping_score > 100) {
            errors.push("Coping score must be between 0 and 100");
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Format insight data for display
 * @param {Object} insight - Insight object
 * @returns {Object} Formatted insight
 */
export const formatInsightForDisplay = (insight) => {
    if (!insight) return null;

    return {
        ...insight,
        formattedDate: insight.metadata?.assessment_date 
            ? new Date(insight.metadata.assessment_date).toLocaleDateString()
            : "N/A",
        severityLevel: getPHQ9Severity(insight.psychological_assessment?.phq9_score),
        anxietyLevel: getGAD7Severity(insight.psychological_assessment?.gad7_score),
    };
};

/**
 * Get PHQ-9 severity interpretation
 */
export const getPHQ9Severity = (score) => {
    if (score === null || score === undefined) return "Not assessed";
    if (score <= 4) return "Minimal";
    if (score <= 9) return "Mild";
    if (score <= 14) return "Moderate";
    if (score <= 19) return "Moderately severe";
    return "Severe";
};

/**
 * Get GAD-7 severity interpretation
 */
export const getGAD7Severity = (score) => {
    if (score === null || score === undefined) return "Not assessed";
    if (score <= 4) return "Minimal";
    if (score <= 9) return "Mild";
    if (score <= 14) return "Moderate";
    return "Severe";
};

/**
 * Convert insight to update format (removes null values)
 */
export const prepareInsightForUpdate = (formData) => {
    const cleanObject = (obj) => {
        if (obj === null || obj === undefined) return null;
        if (typeof obj !== 'object') return obj;
        if (Array.isArray(obj)) return obj.filter(item => item !== null && item !== undefined);
        
        const cleaned = {};
        for (const [key, value] of Object.entries(obj)) {
            if (value !== null && value !== undefined && value !== "") {
                if (typeof value === 'object') {
                    const cleanedValue = cleanObject(value);
                    if (cleanedValue && Object.keys(cleanedValue).length > 0) {
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
 * Export insight data as JSON file
 */
export const exportInsightAsJSON = (insight) => {
    const dataStr = JSON.stringify(insight, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `insight_${insight.id}_${insight.metadata?.assessment_date || 'unknown'}.json`;
    link.click();
    URL.revokeObjectURL(url);
};

/**
 * Compare two insights to show changes over time
 */
export const compareInsights = (oldInsight, newInsight) => {
    const changes = {};
    
    // Compare psychological assessment scores
    const oldScores = oldInsight.psychological_assessment || {};
    const newScores = newInsight.psychological_assessment || {};
    
    changes.phq9Change = newScores.phq9_score - oldScores.phq9_score;
    changes.gad7Change = newScores.gad7_score - oldScores.gad7_score;
    changes.resilienceChange = newScores.resilience_score - oldScores.resilience_score;
    changes.copingChange = newScores.coping_score - oldScores.coping_score;
    
    return changes;
};