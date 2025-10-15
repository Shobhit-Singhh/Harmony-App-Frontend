// src/api/profile.js
import API from "./axiosInstance";

export const ProfileAPI = {
    getProfile: async () => {
        const res = await API.get("/users/me/profile");
        return res.data;
    },

    updateProfile: async (profileData) => {
        const res = await API.put("/users/me/profile", profileData);
        return res.data;
    },

    updatePrivacy: async (privacySettings) => {
        const res = await API.patch("/users/me/profile/privacy", privacySettings);
        return res.data;
    },

    deleteProfile: async () => {
        const res = await API.delete("/users/me/profile");
        return res.data;
    },
};
