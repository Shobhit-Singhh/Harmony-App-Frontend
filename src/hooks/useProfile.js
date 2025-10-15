// src/hooks/useProfile.js
import { useState, useEffect } from "react";
import { ProfileAPI } from "../api/profile";
import { AuthAPI } from "../api/auth";

export function useProfile() {
    const [profile, setProfile] = useState({
        full_name: "",
        date_of_birth: "",
        gender: "",
        location: "",
        timezone: "",
        primary_pillar_weights: { health: 0, work: 0, growth: 0, relationships: 0 },
        medications: [], // must be array of objects { name, dosage, frequency }
        conditions: [],  // array of strings
        crisis_contact: "",
        preferred_language: "en",
        privacy_settings: {}
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const defaultProfile = {
        full_name: "",
        date_of_birth: "",
        gender: "",
        location: "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
        primary_pillar_weights: {
            health: 0.25,
            work: 0.25,
            growth: 0.25,
            relationships: 0.25
        },
        medications: [],
        conditions: [],
        crisis_contact: "",
        preferred_language: "en",
        privacy_settings: {
            show_profile: true,
            show_location: false,
            allow_contact: true,
            data_sharing: false
        }
    };

    useEffect(() => {
        loadProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ProfileAPI.getProfile();
            setProfile({
                ...defaultProfile,
                ...data,
                primary_pillar_weights: { ...defaultProfile.primary_pillar_weights, ...(data.primary_pillar_weights || {}) },
                privacy_settings: { ...defaultProfile.privacy_settings, ...(data.privacy_settings || {}) },
                medications: data.medications || [],
                conditions: data.conditions || []
            });
        } catch (err) {
            // If unauthorized or server problem, surface a readable message
            setError(err.response?.data?.detail || "Failed to load profile data");
            // if 401/403 we could force logout — but leave it to the app's global logic
        } finally {
            setLoading(false);
        }
    };

    const saveProfile = async () => {
        setSaving(true);
        setError(null);
        setSuccess(null);

        try {
            // Validate pillar weights sum to ~1.0
            const total = Object.values(profile.primary_pillar_weights || {}).reduce((s, v) => s + Number(v || 0), 0);
            if (Math.abs(total - 1) > 0.01) {
                setError("Pillar weights must sum to 100% (sum should be 1.0)");
                setSaving(false);
                return;
            }

            const updated = await ProfileAPI.updateProfile(profile);
            setProfile(prev => ({ ...prev, ...updated }));
            setSuccess("Profile updated successfully");
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to save profile");
        } finally {
            setSaving(false);
        }
    };

    const updatePrivacy = async (privacySettings) => {
        setSaving(true);
        setError(null);
        setSuccess(null);
        try {
            const updated = await ProfileAPI.updatePrivacy(privacySettings);
            setProfile(prev => ({ ...prev, privacy_settings: { ...(updated.privacy_settings || privacySettings) } }));
            setSuccess("Privacy settings updated");
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to update privacy");
        } finally {
            setSaving(false);
        }
    };

    const deleteProfile = async () => {
        setSaving(true);
        setError(null);
        try {
            await ProfileAPI.deleteProfile();
            // Clear local auth and redirect by forcing logout
            AuthAPI.logout();
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to delete profile");
        } finally {
            setSaving(false);
        }
    };

    return {
        profile,
        setProfile,
        loading,
        saving,
        error,
        success,
        loadProfile,
        saveProfile,
        updatePrivacy,
        deleteProfile
    };
}
