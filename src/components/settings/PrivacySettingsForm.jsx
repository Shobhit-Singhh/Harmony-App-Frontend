// src/components/settings/PrivacySettingsForm.jsx
import React from "react";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { Button } from "../common";

const privacyLabels = {
    show_profile: "Show my profile to other users",
    show_location: "Display my location in profile",
    allow_contact: "Allow other users to contact me",
    data_sharing: "Share anonymized data for research"
};

const PrivacySettingsForm = ({ profile, setProfile, onUpdatePrivacy, onDeleteProfile }) => {
    const toggle = async (key) => {
        const newValue = !profile.privacy_settings?.[key];

        // Toggle locally immediately for snappy UI
        setProfile(prev => ({
            ...prev,
            privacy_settings: {
                ...prev.privacy_settings,
                [key]: newValue
            }
        }));

        // Send patch to server using the privacy-specific endpoint
        if (typeof onUpdatePrivacy === "function") {
            try {
                await onUpdatePrivacy({ [key]: newValue });
            } catch (err) {
                console.error('Failed to update privacy setting:', err);
                // If update fails, revert locally
                setProfile(prev => ({
                    ...prev,
                    privacy_settings: {
                        ...prev.privacy_settings,
                        [key]: !newValue
                    }
                }));
            }
        }
    };

    const onDelete = async () => {
        if (window.confirm("Are you sure you want to delete your profile? This cannot be undone.")) {
            if (typeof onDeleteProfile === "function") {
                try {
                    await onDeleteProfile();
                } catch (err) {
                    console.error('Failed to delete profile:', err);
                    // Handle error (maybe show a toast notification)
                }
            }
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Privacy Preferences</h3>

            <div className="space-y-4">
                {Object.entries(privacyLabels).map(([key, label]) => {
                    const enabled = profile.privacy_settings?.[key] || false;
                    return (
                        <div key={key} className="flex items-center justify-between py-3">
                            <div className="flex items-center space-x-3">
                                {enabled ? (
                                    <Eye className="h-5 w-5 text-green-500" />
                                ) : (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                )}
                                <div>
                                    <label className="text-sm font-medium">{label}</label>
                                    <p className="text-xs text-gray-500">Control how your information is shared</p>
                                </div>
                            </div>

                            <button
                                onClick={() => toggle(key)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? "bg-blue-600" : "bg-gray-200"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-md font-medium text-red-800 mb-4">Danger Zone</h4>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-700 mb-3">
                        Permanently delete your profile data. This cannot be undone.
                    </p>
                    <Button
                        variant="secondary"
                        className="bg-red-50 text-red-700 border-red-300 hover:bg-red-100"
                        onClick={onDelete}
                    >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete Profile
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PrivacySettingsForm;