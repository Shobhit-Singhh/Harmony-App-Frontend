import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Loader, AlertCircle } from "lucide-react";

// Import all stage components
import BasicPriority from "../components/priorities/BasicPriority";
import HealthPriorities from "../components/priorities/HealthPriorities";
import WorkPriorities from "../components/priorities/WorkPriorities";
import GrowthPriorities from "../components/priorities/GrowthPriorities";
import RelationshipPriorities from "../components/priorities/RelationshipPriorities";
import PreferencesInsights from "../components/priorities/PreferencesInsights";

// Import your actual API
import { PrioritiesAPI } from "../api/priorities";

const OnboardingFlow = () => {
    const navigate = useNavigate();

    const [currentStage, setCurrentStage] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    
    const [formData, setFormData] = useState({
        // Stage 1: Basic Info & Pillar Weights
        display_name: "",
        age_group: "",
        gender_identity: "",
        preferred_pronouns: "",
        pillar_importance: {
            health: 0.25,
            work: 0.25,
            growth: 0.25,
            relationships: 0.25,
        },
        // Stages 2-5: Pillar-specific data
        health_goals: "",
        health_baseline: "",
        health_activities: [],
        work_goals: "",
        work_baseline: "",
        work_activities: [],
        growth_goals: "",
        growth_baseline: "",
        growth_activities: [],
        relationships_goals: "",
        relationships_baseline: "",
        relationships_activities: [],
        // Stage 6: Preferences
        checkin_schedule: {
            frequency: "daily",
            preferred_time: "20:00",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            reminder_enabled: true,
            reflection_prompts: true,
        },
        privacy_settings: {
            profile_visibility: "private",
            share_progress: false,
            data_collection: "minimal",
            anonymous_analytics: true,
        },
        notification_preferences: {
            push_notifications: true,
            email_notifications: false,
            daily_reminders: true,
            weekly_summary: true,
            achievement_alerts: true,
            quiet_hours: {
                enabled: true,
                start: "22:00",
                end: "08:00",
            },
        },
    });
    

    const totalStages = 6;
    const progress = (currentStage / totalStages) * 100;

    const handleNext = () => {
        if (currentStage < totalStages) {
            setCurrentStage(currentStage + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStage > 1) {
            setCurrentStage(currentStage - 1);
        }
    };
    
    const handleSubmit = async () => {
        setSubmitting(true);
        setSubmitError(null);

        try {
            // Transform the data to match your API structure
            const apiPayload = {
                // Minimal profile
                display_name: formData.display_name,
                age_group: formData.age_group,
                gender_identity: formData.gender_identity,
                preferred_pronouns: formData.preferred_pronouns,

                // Pillar importance
                pillar_importance: { ...formData.pillar_importance },

                // Health pillar
                health_goals: formData.health_goals,
                health_baseline: formData.health_baseline,
                health_activities: formData.health_activities,

                // Work pillar
                work_goals: formData.work_goals,
                work_baseline: formData.work_baseline,
                work_activities: formData.work_activities,

                // Growth pillar
                growth_goals: formData.growth_goals,
                growth_baseline: formData.growth_baseline,
                growth_activities: formData.growth_activities,

                // Relationships pillar
                relationships_goals: formData.relationships_goals,
                relationships_baseline: formData.relationships_baseline,
                relationships_activities: formData.relationships_activities,

                // Preferences
                checkin_schedule: formData.checkin_schedule,
                privacy_settings: formData.privacy_settings,
                notification_preferences: formData.notification_preferences,
            };
            
            console.log("Submitting priorities data:", apiPayload);

            const response = await PrioritiesAPI.createPriorities(apiPayload);
            await PrioritiesAPI.completeOnboarding();
            console.log("Priorities created successfully:", response);

            // ✅ Navigate to dashboard after successful completion
            navigate("/dashboard", { replace: true });

        } catch (error) {
            console.error("Failed to submit priorities:", error);
            setSubmitError(
                error.response?.data?.detail ||
                error.message ||
                "Failed to save your priorities. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const isStageValid = () => {
        switch (currentStage) {
            case 1:
                return formData.display_name && formData.age_group && formData.gender_identity;
            case 2:
                return formData.health_goals && formData.health_baseline;
            case 3:
                return formData.work_goals && formData.work_baseline;
            case 4:
                return formData.growth_goals && formData.growth_baseline;
            case 5:
                return formData.relationships_goals && formData.relationships_baseline;
            case 6:
                return true;
            default:
                return false;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl" />
            <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-200/25 rounded-full blur-lg" />
            <div className="absolute top-1/2 right-20 w-16 h-16 bg-pink-200/20 rounded-full blur-md" />
            <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-purple-200/15 rounded-full blur-lg" />

            <div className="relative max-w-4xl mx-auto px-4 py-8">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                            Step {currentStage} of {totalStages}
                        </span>
                        <span className="text-sm text-gray-600">{Math.round(progress)}% complete</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                {/* Stage Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStage}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentStage === 1 && <BasicPriority formData={formData} setFormData={setFormData} />}
                        {currentStage === 2 && <HealthPriorities formData={formData} setFormData={setFormData} />}
                        {currentStage === 3 && <WorkPriorities formData={formData} setFormData={setFormData} />}
                        {currentStage === 4 && <GrowthPriorities formData={formData} setFormData={setFormData} />}
                        {currentStage === 5 && <RelationshipPriorities formData={formData} setFormData={setFormData} />}
                        {currentStage === 6 && <PreferencesInsights formData={formData} setFormData={setFormData} />}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8">
                    <button
                        onClick={handleBack}
                        disabled={currentStage === 1 || submitting}
                        className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={20} />
                        Back
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!isStageValid() || submitting}
                        className="flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        {submitting ? (
                            <>
                                <Loader size={20} className="animate-spin" />
                                Saving...
                            </>
                        ) : currentStage === totalStages ? (
                            <>
                                Complete <Check size={20} />
                            </>
                        ) : (
                            <>
                                Next <ChevronRight size={20} />
                            </>
                        )}
                    </button>
                </div>

                {/* Error Message */}
                {submitError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                    >
                        <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-red-800">Failed to save priorities</p>
                            <p className="text-sm text-red-700 mt-1">{submitError}</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default OnboardingFlow;
