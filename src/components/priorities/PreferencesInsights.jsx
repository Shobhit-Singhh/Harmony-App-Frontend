import React from "react";
import { Calendar, Clock, Shield, Bell, Check } from "lucide-react";
import { Card, CardHeader, ToggleOption } from "./shared/Card";

const PreferencesInsights = ({ formData, setFormData }) => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader
                    icon={<Calendar className="text-purple-600" size={32} />}
                    title="Personalize Your Experience"
                    description="Set up your preferences for the best experience"
                />
            </Card>

            {/* Check-in Schedule */}
            <Card>
                <div className="flex items-center gap-3 mb-4">
                    <Clock className="text-blue-600" size={24} />
                    <h3 className="text-lg font-semibold text-gray-800">Check-in Schedule</h3>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Frequency
                            </label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Preferred Time
                            </label>
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
            </Card>

            {/* Privacy Settings */}
            <Card>
                <div className="flex items-center gap-3 mb-4">
                    <Shield className="text-green-600" size={24} />
                    <h3 className="text-lg font-semibold text-gray-800">Privacy Settings</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Visibility
                        </label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Data Collection
                        </label>
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
            </Card>

            {/* Notification Preferences */}
            <Card>
                <div className="flex items-center gap-3 mb-4">
                    <Bell className="text-purple-600" size={24} />
                    <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                </div>

                <div className="space-y-4">
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

                    {/* Quiet Hours */}
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
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
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
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            {/* Completion Message */}
            <Card>
                <div className="text-center py-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check size={40} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">You're all set!</h3>
                    <p className="text-gray-600">
                        Click "Complete" to start your wellness journey
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default PreferencesInsights;