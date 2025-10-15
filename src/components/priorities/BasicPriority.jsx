import React from "react";
import { User, Target, Heart, Briefcase, TrendingUp, Users } from "lucide-react";
import { Card, CardHeader } from "./shared/Card";
import LifePillarRingAllocator from "../settings/LifePillarRingAllocator"; // 👈 make sure path is correct

const BasicPriority = ({ formData, setFormData }) => {
    const pillars = [
        { key: "health", label: "Health", icon: <Heart size={24} />, color: "from-red-500 to-pink-500" },
        { key: "work", label: "Work", icon: <Briefcase size={24} />, color: "from-blue-500 to-cyan-500" },
        { key: "growth", label: "Growth", icon: <TrendingUp size={24} />, color: "from-purple-500 to-indigo-500" },
        { key: "relationships", label: "Relationships", icon: <Users size={24} />, color: "from-pink-500 to-rose-500" },
    ];

    const pillarKeys = pillars.map((p) => p.key);
    const pillarValues = pillarKeys.map((key) => formData.pillar_importance[key] || 0);

    const handleLifePillarChange = (newValues) => {
        // newValues is expected to be an array of normalized values summing to 1
        const updated = { ...formData.pillar_importance };
        pillarKeys.forEach((key, idx) => {
            updated[key] = newValues[idx];
        });
        setFormData({ ...formData, pillar_importance: updated });
    };

    return (
        <div className="space-y-8">
            {/* User info card */}
            <Card>
                <CardHeader
                    icon={<User className="text-purple-600" size={32} />}
                    title="Welcome! Let's get to know you"
                    description="Tell us a bit about yourself to personalize your experience"
                />

                <div className="space-y-6">
                    {/* Display Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Display Name *
                        </label>
                        <input
                            type="text"
                            value={formData.display_name}
                            onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                            placeholder="How should we call you?"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Age Group */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Age Group *
                        </label>
                        <select
                            value={formData.age_group}
                            onChange={(e) => setFormData({ ...formData, age_group: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        >
                            <option value="">Select age group</option>
                            <option value="18-24">18-24</option>
                            <option value="25-34">25-34</option>
                            <option value="35-44">35-44</option>
                            <option value="45-54">45-54</option>
                            <option value="55-64">55-64</option>
                            <option value="65+">65+</option>
                        </select>
                    </div>

                    {/* Gender & Pronouns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gender Identity *
                            </label>
                            <select
                                value={formData.gender_identity}
                                onChange={(e) => setFormData({ ...formData, gender_identity: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Preferred Pronouns
                            </label>
                            <select
                                value={formData.preferred_pronouns}
                                onChange={(e) => setFormData({ ...formData, preferred_pronouns: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
            </Card>

            {/* Pillar Importance with Circular Slider */}
            <Card>
                <CardHeader
                    icon={<Target className="text-blue-600" size={32} />}
                    title="What matters most to you?"
                    description="Adjust the importance of each life pillar (must total 100%)"
                />

                <div className="space-y-6">
                    <div className="flex justify-center">
                        <LifePillarRingAllocator
                            pillars={pillarKeys}
                            values={pillarValues}
                            onChange={handleLifePillarChange}
                        />
                    </div>

                    {/* Legend / Pillar labels */}
                    <div className="grid grid-cols-2 gap-3 pt-4">
                        {pillars.map((pillar, idx) => (
                            <div key={pillar.key} className="flex items-center gap-2">
                                <div className={`w-8 h-8 bg-gradient-to-br ${pillar.color} rounded-lg flex items-center justify-center text-white`}>
                                    {pillar.icon}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-800">{pillar.label}</span>
                                    <span className="text-sm text-gray-500">
                                        {Math.round(pillarValues[idx] * 100)}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total Check */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <span className="font-medium text-gray-700">Total</span>
                        <span
                            className={`text-lg font-bold ${
                                Math.round(pillarValues.reduce((a, b) => a + b, 0) * 100) === 100
                                    ? "text-green-600"
                                    : "text-orange-600"
                            }`}
                        >
                            {Math.round(pillarValues.reduce((a, b) => a + b, 0) * 100)}%
                        </span>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default BasicPriority;
