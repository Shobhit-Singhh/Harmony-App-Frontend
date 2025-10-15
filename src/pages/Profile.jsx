import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    User,
    Brain,
    Zap,
    CreditCard,
    Trash2,
    LogIn,
    ChevronRight,
    MessageSquare,
    BarChart3,
    Clock,
    Heart,
    Bot,
    ThumbsUp,
    Mail,
    Shield,
    Palette,
    Languages,
    CheckCircle,
    AlertCircle,
    Save as SaveIcon,
    Edit3,
    Camera,
    TrendingUp,
    Activity,
} from "lucide-react";
import { Settings as SettingsIcon } from "lucide-react";
// External components/hooks used by the Settings section
import TabNavigation from "../components/settings/TabNavigation.jsx";
import PersonalInfoForm from "../components/settings/PersonalInfoForm.jsx";
import WellnessInfoForm from "../components/settings/WellnessInfoForm.jsx";
import PrivacySettingsForm from "../components/settings/PrivacySettingsForm.jsx";
import { Button, Alert } from "../components/common";
import { useProfile } from "../hooks/useProfile";

// Minimal, neutral palette + the four allowed soft accent blobs (kept exactly as requested)

const ProfileDashboard = () => {
    const [activeTab, setActiveTab] = useState("Profile");
    const tabs = ["Profile", "Psyche", "Settings"];

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <ProfileHeader
                    name="John Doe"
                    age={25}
                    gender="Male"
                    email="xyz@gmail.com"
                    imgSrc="/assets/profile/dp.avif"
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {activeTab === "Profile" && <ProfileContent />}
                    {activeTab === "Psyche" && <PsycheContent />}
                    {activeTab === "Settings" && <SettingsContent />}
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

// ---------------- Layout ----------------
const DashboardLayout = ({ children }) => (
    <div className="min-h-screen bg-gray-50">
        {/* allowed decorative blobs (kept minimal and exactly as requested) */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-orange-200/30 rounded-full blur-lg" />
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-blue-200/25 rounded-full blur-md" />
        <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-white/15 rounded-full blur-lg" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            {children}
        </div>
    </div>
);

// ---------------- Minimal Profile Header ----------------
const ProfileHeader = ({ name, age, gender, email, imgSrc, tabs, activeTab, onTabChange }) => (
    <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white border border-gray-100 rounded-2xl shadow-sm p-6"
    >
        <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="relative">
                <div className="w-24 h-24 lg:w-28 lg:h-28 overflow-hidden rounded-xl ring-1 ring-gray-100">
                    <img src={imgSrc} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center shadow-sm">
                    <Camera size={16} className="text-gray-600" />
                </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-1">
                    <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>
                    <button className="w-8 h-8 bg-white border border-gray-100 rounded-md flex items-center justify-center">
                        <Edit3 size={14} className="text-gray-600" />
                    </button>
                </div>

                <div className="text-sm text-gray-600">
                    <p className="font-medium">{gender}, {age} years</p>
                    <p className="flex items-center justify-center lg:justify-start gap-2 mt-1">
                        <Mail size={14} className="text-gray-500" />
                        <span>{email}</span>
                    </p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-2 lg:ml-4">
                <button className="px-4 py-2 bg-white border border-gray-100 rounded-md text-gray-800 shadow-sm">Edit</button>
                <button className="px-4 py-2 bg-transparent border border-gray-100 rounded-md text-gray-700">Share</button>
            </div>
        </div>

        {/* Minimal Tab Bar */}
        <div className="mt-6 flex justify-center">
            <div className="inline-flex bg-transparent rounded-lg overflow-hidden">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 -mb-2 transition-colors focus:outline-none ${
                            activeTab === tab ? "border-white/20 text-gray-900 bg-white/2" : "border-transparent text-gray-600 hover:text-gray-800"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    </motion.div>
);

// ---------------- Content Sections (minimal styling) ----------------
const ProfileContent = () => (
    <div className="space-y-6">
        <Settings />
    </div>
);

const PsycheContent = () => (
    <div className="space-y-6">
        <SectionCard title="Mental Health & Wellness" description="Tools and resources to support your mental wellbeing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SimpleItem title="Mental Health Assessment" desc="Your psychological evaluations" icon={<Brain size={16} />} />
                <SimpleItem title="Therapy Sessions" desc="Schedule and review sessions" icon={<MessageSquare size={16} />} />
                <SimpleItem title="Mood Journal" desc="Track your emotional patterns" icon={<Heart size={16} />} />
                <SimpleItem title="Resources" desc="Helpful materials and exercises" icon={<Zap size={16} />} />
            </div>
        </SectionCard>

        <SectionCard title="Interaction Analytics" description="Insights based on your chat patterns">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard title="53" subtitle="Total Conversations" icon={<MessageSquare size={18} />} />
                <MetricCard title="23 min" subtitle="Avg. Duration" icon={<Clock size={18} />} />
                <MetricCard title="78%" subtitle="Positive Sentiment" icon={<ThumbsUp size={18} />} />
            </div>
        </SectionCard>
    </div>
);

const SettingsContent = () => (
    <div className="space-y-6">
        <SectionCard title="Preferences" description="Customize your experience">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PrefItem name="Notification Settings" desc="Manage alerts" icon={<Mail size={16} />} />
                <PrefItem name="Privacy Settings" desc="Control data sharing" icon={<Shield size={16} />} />
                <PrefItem name="Theme Settings" desc="Appearance options" icon={<Palette size={16} />} />
                <PrefItem name="Language" desc="Preferred language" icon={<Languages size={16} />} />
            </div>
        </SectionCard>

        <SectionCard title="Subscription" description="Manage your plan" footer={
            <div className="flex gap-3">
                <button className="px-4 py-2 rounded-md border border-gray-100">View</button>
                <button className="px-4 py-2 rounded-md" style={{ background: 'rgba(191, 219, 254, 0.25)' }}>
                    Manage
                </button>
            </div>
        } />

        <SectionCard title="Danger Zone" description="Account deletion">
            <div className="bg-red-50 border border-red-100 rounded-md p-4">
                <div className="flex items-center gap-3">
                    <Trash2 size={18} className="text-red-600" />
                    <div>
                        <p className="font-medium text-red-700">This action cannot be undone</p>
                        <p className="text-sm text-red-600">All data will be permanently removed.</p>
                    </div>
                </div>
                <div className="mt-4">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md">Delete Account</button>
                </div>
            </div>
        </SectionCard>
    </div>
);

// ---------------- Minimal subcomponents ----------------
const SectionCard = ({ title, description, children, footer }) => (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <div>
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                {description && <p className="text-sm text-gray-600">{description}</p>}
            </div>
            {footer}
        </div>
        <div>{children}</div>
    </div>
);

const SimpleItem = ({ title, desc, icon }) => (
    <div className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg">
        <div className="w-9 h-9 flex items-center justify-center text-gray-700">{icon}</div>
        <div>
            <p className="font-medium text-gray-800">{title}</p>
            <p className="text-sm text-gray-600">{desc}</p>
        </div>
    </div>
);

const MetricCard = ({ title, subtitle, icon }) => (
    <div className="p-4 border border-gray-100 rounded-lg text-gray-800">
        <div className="flex items-center justify-between mb-2">
            <div className="text-gray-700">{icon}</div>
            <div className="text-sm text-gray-500">{subtitle}</div>
        </div>
        <div className="text-xl font-semibold">{title}</div>
    </div>
);

const PrefItem = ({ name, desc, icon }) => (
    <div className="p-3 border border-gray-100 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center text-gray-700">{icon}</div>
            <div>
                <p className="font-medium text-gray-800">{name}</p>
                <p className="text-sm text-gray-600">{desc}</p>
            </div>
        </div>
        <ChevronRight size={16} className="text-gray-400" />
    </div>
);

// ---------------- Settings Component (minimal, uses hooks) ----------------
const Settings = () => {
    const {
        profile,
        setProfile,
        loading,
        saving,
        error,
        success,
        saveProfile,
        deleteProfile,
        updatePrivacy
        } = useProfile();

    const [activeTab, setActiveTab] = useState("personal");

    const tabs = [
        { key: "personal", label: "Personal Info", icon: User },
        { key: "wellness", label: "Health & Wellness", icon: Heart },
        { key: "privacy", label: "Privacy & Security", icon: Shield }
    ];

    if (loading || !profile) {
        return (
            <div className="flex items-center justify-center h-40">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {/* Alerts */}
            {(error || success) && (
                <div className="p-4 border-b border-gray-100">
                    {error && (
                        <div className="flex items-center gap-2 text-red-700">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}
                    {success && (
                        <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle size={16} />
                            <span>{success}</span>
                        </div>
                    )}
                </div>
            )}

            <div className="p-4 border-b border-gray-100">
                <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} minimal />
            </div>

            <div className="p-6">
                {activeTab === "personal" && <PersonalInfoForm profile={profile} setProfile={setProfile} />}
                {activeTab === "wellness" && <WellnessInfoForm profile={profile} setProfile={setProfile} />}
                {activeTab === "privacy" && (
                    <PrivacySettingsForm
                        profile={profile}
                        setProfile={setProfile}
                        updatePrivacy={updatePrivacy}
                        deleteProfile={deleteProfile}
                    />
                )}
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                <button
                    onClick={saveProfile}
                    disabled={saving}
                    className="px-4 py-2 rounded-md text-gray-800 border border-gray-100 shadow-sm"
                    style={{ background: 'rgba(191, 219, 254, 0.25)' }}
                >
                    <div className="inline-flex items-center gap-2">
                        <SaveIcon size={14} />
                        <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ProfileDashboard;
