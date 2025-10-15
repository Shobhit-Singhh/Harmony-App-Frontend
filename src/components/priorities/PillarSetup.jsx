import React, { useState, useEffect } from "react";
import { Search, Activity, Check, Plus, X } from "lucide-react";
import { Card, CardHeader } from "./shared/Card";

// Mock API function - replace with your actual API
const mockGetTemplates = async (pillar) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        health: [
            { name: "Morning Walk", description: "Daily morning walk for fitness", dimension: "distance", unit: "steps", default_quota: 10000 },
            { name: "Gym Workout", description: "Strength training session", dimension: "time", unit: "minutes", default_quota: 60 },
            { name: "Water Intake", description: "Daily water consumption", dimension: "volume", unit: "glasses", default_quota: 8 },
        ],
        work: [
            { name: "Deep Work Session", description: "Focused work time", dimension: "time", unit: "hours", default_quota: 4 },
            { name: "Skill Learning", description: "Learning new technologies", dimension: "time", unit: "hours", default_quota: 2 },
            { name: "Team Meetings", description: "Collaborative sessions", dimension: "count", unit: "meetings", default_quota: 3 },
        ],
        growth: [
            { name: "Meditation", description: "Mindfulness practice", dimension: "time", unit: "minutes", default_quota: 20 },
            { name: "Reading", description: "Book reading time", dimension: "time", unit: "pages", default_quota: 30 },
            { name: "Journaling", description: "Daily reflection", dimension: "boolean", unit: "completed", default_quota: 1 },
        ],
        relationships: [
            { name: "Family Call", description: "Connect with family", dimension: "count", unit: "calls", default_quota: 7 },
            { name: "Social Activity", description: "Meet friends", dimension: "count", unit: "meetings", default_quota: 2 },
            { name: "Quality Time", description: "Time with loved ones", dimension: "time", unit: "hours", default_quota: 10 },
        ],
    }[pillar] || [];
};

const PillarSetup = ({ pillar, icon, color, formData, setFormData }) => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadTemplates();
    }, [pillar]);

    const loadTemplates = async () => {
        setLoading(true);
        try {
            const data = await mockGetTemplates(pillar);
            setTemplates(data);
        } catch (error) {
            console.error("Failed to load templates:", error);
        } finally {
            setLoading(false);
        }
    };

    const activitiesKey = `${pillar}_activities`;
    const goalsKey = `${pillar}_goals`;
    const baselineKey = `${pillar}_baseline`;

    const selectedActivities = formData[activitiesKey] || [];

    const addActivity = (template) => {
        const newActivity = {
            name: template.name,
            description: template.description,
            pillar: pillar,
            configuration: {
                dimension: template.dimension,
                complete: 0,
                unit: template.unit,
                quota: {
                    value: template.default_quota,
                    reset_frequency: "daily",
                },
            },
        };

        setFormData({
            ...formData,
            [activitiesKey]: [...selectedActivities, newActivity],
        });
    };

    const removeActivity = (index) => {
        const updated = selectedActivities.filter((_, i) => i !== index);
        setFormData({ ...formData, [activitiesKey]: updated });
    };

    const updateActivityQuota = (index, field, value) => {
        const updated = [...selectedActivities];
        if (field === "quota_value") {
            updated[index].configuration.quota.value = parseInt(value) || 0;
        } else if (field === "reset_frequency") {
            updated[index].configuration.quota.reset_frequency = value;
        }
        setFormData({ ...formData, [activitiesKey]: updated });
    };

    const filteredTemplates = templates.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <Card>
                <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                        {icon}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 capitalize">{pillar}</h2>
                        <p className="text-sm text-gray-600">Define your goals and track activities</p>
                    </div>
                </div>
            </Card>

            {/* Goals & Baseline */}
            <Card>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            What are your {pillar} goals? *
                        </label>
                        <textarea
                            value={formData[goalsKey]}
                            onChange={(e) => setFormData({ ...formData, [goalsKey]: e.target.value })}
                            placeholder={`E.g., "Improve overall fitness and maintain consistent exercise routine"`}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            What's your current baseline? *
                        </label>
                        <textarea
                            value={formData[baselineKey]}
                            onChange={(e) => setFormData({ ...formData, [baselineKey]: e.target.value })}
                            placeholder={`E.g., "Currently walk 5000 steps daily and exercise twice a week"`}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        />
                    </div>
                </div>
            </Card>

            {/* Activity Selection */}
            <Card>
                <CardHeader
                    icon={<Activity className="text-purple-600" size={24} />}
                    title="Choose Activities to Track"
                    description="Select from templates or create your own"
                />

                {/* Search */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search activities..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Templates Grid */}
                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="w-8 h-8 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {filteredTemplates.map((template) => {
                            const isSelected = selectedActivities.some(a => a.name === template.name);

                            return (
                                <div
                                    key={template.name}
                                    className={`p-4 border-2 rounded-xl transition-all cursor-pointer ${isSelected
                                        ? "border-purple-500 bg-purple-50"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                                    onClick={() => !isSelected && addActivity(template)}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-medium text-gray-800">{template.name}</h4>
                                        {isSelected ? (
                                            <Check size={20} className="text-purple-600" />
                                        ) : (
                                            <Plus size={20} className="text-gray-400" />
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span className="px-2 py-1 bg-gray-100 rounded">{template.default_quota} {template.unit}</span>
                                        <span className="px-2 py-1 bg-gray-100 rounded capitalize">{template.dimension}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Selected Activities */}
                {selectedActivities.length > 0 && (
                    <div className="border-t border-gray-200 pt-6">
                        <h4 className="font-medium text-gray-800 mb-4">Selected Activities ({selectedActivities.length})</h4>
                        <div className="space-y-3">
                            {selectedActivities.map((activity, index) => (
                                <div key={index} className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h5 className="font-medium text-gray-800">{activity.name}</h5>
                                            <p className="text-sm text-gray-600">{activity.description}</p>
                                        </div>
                                        <button
                                            onClick={() => removeActivity(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">Target</label>
                                            <input
                                                type="number"
                                                value={activity.configuration.quota.value}
                                                onChange={(e) => updateActivityQuota(index, "quota_value", e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">Reset</label>
                                            <select
                                                value={activity.configuration.quota.reset_frequency}
                                                onChange={(e) => updateActivityQuota(index, "reset_frequency", e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                            >
                                                <option value="daily">Daily</option>
                                                <option value="weekly">Weekly</option>
                                                <option value="monthly">Monthly</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default PillarSetup;