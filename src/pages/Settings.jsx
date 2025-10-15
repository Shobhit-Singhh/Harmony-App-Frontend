import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    User,
    Heart,
    Briefcase,
    TrendingUp,
    Users,
    Calendar,
    Bell,
    Shield,
    Save,
    X,
    Clock,
    Target,
    Activity,
    Loader,
    AlertCircle,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Edit2,
    Trash2,
    Plus,
} from "lucide-react";


// Import your actual API - uncomment and adjust the path
import { useInsights } from "../hooks/useInsights";
import LifePillarRingAllocator from "../components/settings/LifePillarRingAllocator";

// Mock LifePillarRingAllocator component - replace with your actual import


const SettingsPage = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [expandedSections, setExpandedSections] = useState({
        profile: true,
        pillars: false,
        activities: false,
        checkin: false,
        privacy: false,
        notifications: false,
    });

    const [formData, setFormData] = useState({
        display_name: "Alex Johnson",
        age_group: "25-34",
        gender_identity: "Non-binary",
        preferred_pronouns: "they/them",
        pillar_importance: {
            health: 0.25,
            work: 0.25,
            growth: 0.25,
            relationships: 0.25,
        },
        health_goals: "Improve overall fitness and maintain consistent exercise routine",
        health_baseline: "Currently walk 5000 steps daily and exercise twice a week",
        health_activities: [
            {
                name: "Morning Walk",
                description: "Daily morning walk for fitness",
                pillar: "health",
                configuration: {
                    dimension: "distance",
                    complete: 0,
                    unit: "steps",
                    quota: {
                        value: 10000,
                        reset_frequency: "daily",
                    },
                },
            },
            {
                name: "Gym Workout",
                description: "Strength training session",
                pillar: "health",
                configuration: {
                    dimension: "time",
                    complete: 0,
                    unit: "minutes",
                    quota: {
                        value: 60,
                        reset_frequency: "daily",
                    },
                },
            },
        ],
        work_goals: "Advance career skills and maintain work-life balance",
        work_baseline: "Working 8 hours daily with occasional overtime",
        work_activities: [
            {
                name: "Deep Work Session",
                description: "Focused work time",
                pillar: "work",
                configuration: {
                    dimension: "time",
                    complete: 0,
                    unit: "hours",
                    quota: {
                        value: 4,
                        reset_frequency: "daily",
                    },
                },
            },
        ],
        growth_goals: "Develop mindfulness and continuous learning habits",
        growth_baseline: "Reading occasionally, no regular meditation practice",
        growth_activities: [
            {
                name: "Meditation",
                description: "Mindfulness practice",
                pillar: "growth",
                configuration: {
                    dimension: "time",
                    complete: 0,
                    unit: "minutes",
                    quota: {
                        value: 20,
                        reset_frequency: "daily",
                    },
                },
            },
        ],
        relationships_goals: "Strengthen connections with family and friends",
        relationships_baseline: "Call family weekly, meet friends occasionally",
        relationships_activities: [
            {
                name: "Family Call",
                description: "Connect with family",
                pillar: "relationships",
                configuration: {
                    dimension: "count",
                    complete: 0,
                    unit: "calls",
                    quota: {
                        value: 7,
                        reset_frequency: "weekly",
                    },
                },
            },
        ],
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

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        setLoading(true);
        try {
            // UNCOMMENT TO USE REAL API:
            // const data = await PrioritiesAPI.getPriorities();
            // setFormData(data);

            // Mock data for demonstration
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Form data is already initialized with mock data
        } catch (error) {
            console.error("Failed to load settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveSuccess(false);
        setSaveError(null);

        try {
            // UNCOMMENT TO USE REAL API:
            // await PrioritiesAPI.updatePriorities(formData);

            // Mock save
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error("Failed to save settings:", error);
            setSaveError(
                error.response?.data?.detail ||
                error.message ||
                "Failed to save settings. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader size={48} className="animate-spin text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl" />
            <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-200/25 rounded-full blur-lg" />
            <div className="absolute top-1/2 right-20 w-16 h-16 bg-pink-200/20 rounded-full blur-md" />

            <div className="relative max-w-5xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                    <p className="text-gray-600">Manage your profile, goals, and preferences</p>
                </div>

                {/* Save Button - Fixed at top */}
                <div className="sticky top-4 z-10 mb-6">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                    >
                        {saving ? (
                            <>
                                <Loader size={20} className="animate-spin" />
                                Saving Changes...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                Save All Changes
                            </>
                        )}
                    </button>
                </div>

                {/* Success/Error Messages */}
                {saveSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3"
                    >
                        <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-green-800">Settings saved successfully!</p>
                    </motion.div>
                )}

                {saveError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                    >
                        <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-red-800">Failed to save settings</p>
                            <p className="text-sm text-red-700 mt-1">{saveError}</p>
                        </div>
                    </motion.div>
                )}

                {/* Settings Sections */}
                <div className="space-y-4">
                    {/* Profile Settings */}
                    <SettingsSection
                        title="Profile Information"
                        icon={<User className="text-purple-600" size={24} />}
                        expanded={expandedSections.profile}
                        onToggle={() => toggleSection("profile")}
                    >
                        <ProfileSettings formData={formData} setFormData={setFormData} />
                    </SettingsSection>

                    {/* Pillar Importance */}
                    <SettingsSection
                        title="Life Pillar Priorities"
                        icon={<Target className="text-blue-600" size={24} />}
                        expanded={expandedSections.pillars}
                        onToggle={() => toggleSection("pillars")}
                    >
                        <PillarSettings formData={formData} setFormData={setFormData} />
                    </SettingsSection>

                    {/* Activities Management */}
                    <SettingsSection
                        title="Activity Tracking"
                        icon={<Activity className="text-green-600" size={24} />}
                        expanded={expandedSections.activities}
                        onToggle={() => toggleSection("activities")}
                    >
                        <ActivitiesSettings formData={formData} setFormData={setFormData} />
                    </SettingsSection>

                    {/* Check-in Schedule */}
                    <SettingsSection
                        title="Check-in Schedule"
                        icon={<Clock className="text-orange-600" size={24} />}
                        expanded={expandedSections.checkin}
                        onToggle={() => toggleSection("checkin")}
                    >
                        <CheckinSettings formData={formData} setFormData={setFormData} />
                    </SettingsSection>

                    {/* Privacy Settings */}
                    <SettingsSection
                        title="Privacy & Security"
                        icon={<Shield className="text-green-600" size={24} />}
                        expanded={expandedSections.privacy}
                        onToggle={() => toggleSection("privacy")}
                    >
                        <PrivacySettings formData={formData} setFormData={setFormData} />
                    </SettingsSection>

                    {/* Notification Preferences */}
                    <SettingsSection
                        title="Notifications"
                        icon={<Bell className="text-purple-600" size={24} />}
                        expanded={expandedSections.notifications}
                        onToggle={() => toggleSection("notifications")}
                    >
                        <NotificationSettings formData={formData} setFormData={setFormData} />
                    </SettingsSection>
                </div>

                {/* Bottom Save Button */}
                <div className="mt-8">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                    >
                        {saving ? (
                            <>
                                <Loader size={20} className="animate-spin" />
                                Saving Changes...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                Save All Changes
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

// ==================== SETTINGS SECTION WRAPPER ====================
const SettingsSection = ({ title, icon, expanded, onToggle, children }) => (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
        >
            <div className="flex items-center gap-3">
                {icon}
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            </div>
            {expanded ? <ChevronUp size={24} className="text-gray-400" /> : <ChevronDown size={24} className="text-gray-400" />}
        </button>

        {expanded && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-200 p-6"
            >
                {children}
            </motion.div>
        )}
    </div>
);

// ==================== PROFILE SETTINGS ====================
const ProfileSettings = ({ formData, setFormData }) => (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
            <input
                type="text"
                value={formData.display_name}
                onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
                <select
                    value={formData.age_group}
                    onChange={(e) => setFormData({ ...formData, age_group: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                    <option value="">Select</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45-54">45-54</option>
                    <option value="55-64">55-64</option>
                    <option value="65+">65+</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender Identity</label>
                <select
                    value={formData.gender_identity}
                    onChange={(e) => setFormData({ ...formData, gender_identity: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pronouns</label>
                <select
                    value={formData.preferred_pronouns}
                    onChange={(e) => setFormData({ ...formData, preferred_pronouns: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                    <option value="">Select</option>
                    <option value="he/him">He/Him</option>
                    <option value="she/her">She/Her</option>
                    <option value="they/them">They/Them</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>
    </div>
);

// ==================== PILLAR SETTINGS ====================
const PillarSettings = ({ formData, setFormData }) => {
    const pillarKeys = ["health", "work", "growth", "relationships"];
    const pillarValues = pillarKeys.map(key => formData.pillar_importance[key]);

    const handleLifePillarChange = (newValues) => {
        // newValues is expected to be an array of normalized values summing to 1
        const updated = { ...formData.pillar_importance };
        pillarKeys.forEach((key, idx) => {
            updated[key] = newValues[idx];
        });
        setFormData({ ...formData, pillar_importance: updated });
    };

    return (
        <div className="space-y-6">
            <p className="text-sm text-gray-600 text-center">
                Adjust the importance of each life pillar using the interactive ring allocator
            </p>

            <div className="flex justify-center">
                <LifePillarRingAllocator
                    pillars={pillarKeys}
                    values={pillarValues}
                    onChange={handleLifePillarChange}
                />
            </div>

            {/* Summary Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {pillarKeys.map((key) => {
                    const icons = {
                        health: <Heart size={20} />,
                        work: <Briefcase size={20} />,
                        growth: <TrendingUp size={20} />,
                        relationships: <Users size={20} />
                    };
                    const colors = {
                        health: "from-red-500 to-pink-500",
                        work: "from-blue-500 to-cyan-500",
                        growth: "from-purple-500 to-indigo-500",
                        relationships: "from-pink-500 to-rose-500"
                    };
                    const percentage = Math.round(formData.pillar_importance[key] * 100);

                    return (
                        <div key={key} className="text-center p-4 bg-gray-50 rounded-xl">
                            <div className={`w-12 h-12 bg-gradient-to-br ${colors[key]} rounded-lg flex items-center justify-center text-white mx-auto mb-2`}>
                                {icons[key]}
                            </div>
                            <p className="text-sm font-medium text-gray-700 capitalize mb-1">{key}</p>
                            <p className="text-lg font-bold text-gray-900">{percentage}%</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ==================== ACTIVITIES SETTINGS ====================
const ActivitiesSettings = ({ formData, setFormData }) => {
    const [selectedPillar, setSelectedPillar] = useState("health");

    const pillars = [
        { key: "health", label: "Health", icon: <Heart size={16} />, color: "bg-red-100 text-red-700", activeColor: "bg-red-500 text-white" },
        { key: "work", label: "Work", icon: <Briefcase size={16} />, color: "bg-blue-100 text-blue-700", activeColor: "bg-blue-500 text-white" },
        { key: "growth", label: "Growth", icon: <TrendingUp size={16} />, color: "bg-purple-100 text-purple-700", activeColor: "bg-purple-500 text-white" },
        { key: "relationships", label: "Relationships", icon: <Users size={16} />, color: "bg-pink-100 text-pink-700", activeColor: "bg-pink-500 text-white" },
    ];

    const activitiesKey = `${selectedPillar}_activities`;
    const activities = formData[activitiesKey] || [];

    const removeActivity = (index) => {
        const updated = activities.filter((_, i) => i !== index);
        setFormData({ ...formData, [activitiesKey]: updated });
    };

    const updateActivity = (index, field, value) => {
        const updated = [...activities];
        if (field === "quota_value") {
            updated[index].configuration.quota.value = parseInt(value) || 0;
        } else if (field === "reset_frequency") {
            updated[index].configuration.quota.reset_frequency = value;
        }
        setFormData({ ...formData, [activitiesKey]: updated });
    };

    return (
        <div className="space-y-6">
            {/* Pillar Selector */}
            <div className="flex flex-wrap gap-2">
                {pillars.map((pillar) => (
                    <button
                        key={pillar.key}
                        onClick={() => setSelectedPillar(pillar.key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${selectedPillar === pillar.key
                                ? pillar.activeColor
                                : pillar.color + " hover:opacity-80"
                            }`}
                    >
                        {pillar.icon}
                        {pillar.label}
                    </button>
                ))}
            </div>

            {/* Activities List */}
            <div className="space-y-3">
                {activities.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                        <Activity size={48} className="mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-600 font-medium mb-1">No activities yet</p>
                        <p className="text-sm text-gray-500">
                            Add activities for this pillar during onboarding or create custom ones
                        </p>
                    </div>
                ) : (
                    activities.map((activity, index) => (
                        <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className="font-medium text-gray-800">{activity.name}</h4>
                                    <p className="text-sm text-gray-600">{activity.description}</p>
                                </div>
                                <button
                                    onClick={() => removeActivity(index)}
                                    className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                                    title="Remove activity"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Target ({activity.configuration.unit})
                                    </label>
                                    <input
                                        type="number"
                                        value={activity.configuration.quota.value}
                                        onChange={(e) => updateActivity(index, "quota_value", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Reset Frequency</label>
                                    <select
                                        value={activity.configuration.quota.reset_frequency}
                                        onChange={(e) => updateActivity(index, "reset_frequency", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// ==================== CHECK-IN SETTINGS ====================
const CheckinSettings = ({ formData, setFormData }) => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select
                    value={formData.checkin_schedule.frequency}
                    onChange={(e) => setFormData({
                        ...formData,
                        checkin_schedule: { ...formData.checkin_schedule, frequency: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                <input
                    type="time"
                    value={formData.checkin_schedule.preferred_time}
                    onChange={(e) => setFormData({
                        ...formData,
                        checkin_schedule: { ...formData.checkin_schedule, preferred_time: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
            </div>
        </div>

        <ToggleOption
            label="Enable Reminders"
            checked={formData.checkin_schedule.reminder_enabled}
            onChange={(checked) => setFormData({
                ...formData,
                checkin_schedule: { ...formData.checkin_schedule, reminder_enabled: checked }
            })}
        />

        <ToggleOption
            label="Reflection Prompts"
            description="Get thoughtful questions during check-ins"
            checked={formData.checkin_schedule.reflection_prompts}
            onChange={(checked) => setFormData({
                ...formData,
                checkin_schedule: { ...formData.checkin_schedule, reflection_prompts: checked }
            })}
        />
    </div>
);

// ==================== PRIVACY SETTINGS ====================
const PrivacySettings = ({ formData, setFormData }) => (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
            <select
                value={formData.privacy_settings.profile_visibility}
                onChange={(e) => setFormData({
                    ...formData,
                    privacy_settings: { ...formData.privacy_settings, profile_visibility: e.target.value }
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
                <option value="private">Private</option>
                <option value="friends_only">Friends Only</option>
                <option value="public">Public</option>
            </select>
        </div>

        <ToggleOption
            label="Share Progress"
            description="Allow others to see your activity progress"
            checked={formData.privacy_settings.share_progress}
            onChange={(checked) => setFormData({
                ...formData,
                privacy_settings: { ...formData.privacy_settings, share_progress: checked }
            })}
        />

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Collection</label>
            <select
                value={formData.privacy_settings.data_collection}
                onChange={(e) => setFormData({
                    ...formData,
                    privacy_settings: { ...formData.privacy_settings, data_collection: e.target.value }
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
                <option value="minimal">Minimal</option>
                <option value="standard">Standard</option>
                <option value="full">Full</option>
            </select>
        </div>

        <ToggleOption
            label="Anonymous Analytics"
            description="Help us improve with anonymous usage data"
            checked={formData.privacy_settings.anonymous_analytics}
            onChange={(checked) => setFormData({
                ...formData,
                privacy_settings: { ...formData.privacy_settings, anonymous_analytics: checked }
            })}
        />
    </div>
);

// ==================== NOTIFICATION SETTINGS ====================
const NotificationSettings = ({ formData, setFormData }) => (
    <div className="space-y-6">
        <ToggleOption
            label="Push Notifications"
            description="Receive notifications on this device"
            checked={formData.notification_preferences.push_notifications}
            onChange={(checked) => setFormData({
                ...formData,
                notification_preferences: { ...formData.notification_preferences, push_notifications: checked }
            })}
        />

        <ToggleOption
            label="Email Notifications"
            description="Receive updates via email"
            checked={formData.notification_preferences.email_notifications}
            onChange={(checked) => setFormData({
                ...formData,
                notification_preferences: { ...formData.notification_preferences, email_notifications: checked }
            })}
        />

        <ToggleOption
            label="Daily Reminders"
            description="Get reminded about your daily activities"
            checked={formData.notification_preferences.daily_reminders}
            onChange={(checked) => setFormData({
                ...formData,
                notification_preferences: { ...formData.notification_preferences, daily_reminders: checked }
            })}
        />

        <ToggleOption
            label="Weekly Summary"
            description="Receive a weekly progress report"
            checked={formData.notification_preferences.weekly_summary}
            onChange={(checked) => setFormData({
                ...formData,
                notification_preferences: { ...formData.notification_preferences, weekly_summary: checked }
            })}
        />

        <ToggleOption
            label="Achievement Alerts"
            description="Celebrate when you reach milestones"
            checked={formData.notification_preferences.achievement_alerts}
            onChange={(checked) => setFormData({
                ...formData,
                notification_preferences: { ...formData.notification_preferences, achievement_alerts: checked }
            })}
        />

        <div className="pt-4 border-t border-gray-200">
            <ToggleOption
                label="Quiet Hours"
                description="Pause notifications during specific times"
                checked={formData.notification_preferences.quiet_hours.enabled}
                onChange={(checked) => setFormData({
                    ...formData,
                    notification_preferences: {
                        ...formData.notification_preferences,
                        quiet_hours: { ...formData.notification_preferences.quiet_hours, enabled: checked }
                    }
                })}
            />

            {formData.notification_preferences.quiet_hours.enabled && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Start Time</label>
                        <input
                            type="time"
                            value={formData.notification_preferences.quiet_hours.start}
                            onChange={(e) => setFormData({
                                ...formData,
                                notification_preferences: {
                                    ...formData.notification_preferences,
                                    quiet_hours: { ...formData.notification_preferences.quiet_hours, start: e.target.value }
                                }
                            })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">End Time</label>
                        <input
                            type="time"
                            value={formData.notification_preferences.quiet_hours.end}
                            onChange={(e) => setFormData({
                                ...formData,
                                notification_preferences: {
                                    ...formData.notification_preferences,
                                    quiet_hours: { ...formData.notification_preferences.quiet_hours, end: e.target.value }
                                }
                            })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>
            )}
        </div>
    </div>
);

// ==================== TOGGLE OPTION COMPONENT ====================
const ToggleOption = ({ label, description, checked, onChange }) => (
    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
        <div className="flex-1">
            <p className="font-medium text-gray-800">{label}</p>
            {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${checked ? "bg-purple-600" : "bg-gray-300"
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"
                    }`}
            />
        </button>
    </div>
);

export default SettingsPage;