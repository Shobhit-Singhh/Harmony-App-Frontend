// src/components/settings/PersonalInfoForm.jsx
import React from "react";
import { Calendar, MapPin, Globe } from "lucide-react";

const genderOptions = [
    { value: "", label: "Prefer not to say" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non-binary", label: "Non-binary" },
    { value: "other", label: "Other" }
];

const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "it", label: "Italiano" },
    { value: "pt", label: "Português" }
];

const PersonalInfoForm = ({ profile, setProfile }) => {
    const handleChange = (field, value) => setProfile(prev => ({ ...prev, [field]: value }));

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        value={profile.full_name}
                        onChange={(e) => handleChange("full_name", e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your full name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <div className="relative">
                        <input
                            type="date"
                            value={profile.date_of_birth || ""}
                            onChange={(e) => handleChange("date_of_birth", e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                        value={profile.gender || ""}
                        onChange={(e) => handleChange("gender", e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        {genderOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={profile.location || ""}
                            onChange={(e) => handleChange("location", e.target.value)}
                            className="w-full px-3 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="City, Country"
                        />
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <input
                        type="text"
                        value={profile.timezone || ""}
                        onChange={(e) => handleChange("timezone", e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                    <div className="relative">
                        <select
                            value={profile.preferred_language || "en"}
                            onChange={(e) => handleChange("preferred_language", e.target.value)}
                            className="w-full px-3 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            {languageOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoForm;
