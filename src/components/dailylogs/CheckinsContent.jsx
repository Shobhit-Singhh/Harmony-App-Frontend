import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Heart,
    Activity,
    Zap,
    Moon,
    Plus,
    Smile,
    Frown,
    Meh,
    Coffee,
    AlertCircle,
} from "lucide-react";
import { useDailyLogs } from "../../hooks/useDailyLogs";

const CheckinsContent = ({ selectedDate }) => {
    const { getLogByDate, addCheckinEntry, loading, error } = useDailyLogs();
    const [logData, setLogData] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        loadCheckins();
    }, [selectedDate]);

    const loadCheckins = async () => {
        try {
            const data = await getLogByDate(selectedDate);
            setLogData(data);
        } catch (err) {
            console.error("Failed to load check-ins:", err);
        }
    };

    const handleAddCheckin = async (field, value) => {
        try {
            await addCheckinEntry(selectedDate, { field, value });
            await loadCheckins();
            setShowAddForm(false);
        } catch (err) {
            console.error("Failed to add check-in:", err);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message={error} />;

    const checkinData = logData?.checkin || {};

    return (
        <div className="space-y-6">
            <SectionCard
                title="Check-in History"
                description="Track your mood, energy, stress, and sleep"
                footer={
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={16} />
                        <span>Add Check-in</span>
                    </button>
                }
            >
                {showAddForm && (
                    <CheckinForm onSubmit={handleAddCheckin} onCancel={() => setShowAddForm(false)} />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <CheckinHistoryCard
                        title="Mood"
                        icon={<Heart size={20} />}
                        data={checkinData.mood || {}}
                        color="pink"
                    />
                    <CheckinHistoryCard
                        title="Stress Level"
                        icon={<Activity size={20} />}
                        data={checkinData.stress_level || {}}
                        color="purple"
                    />
                    <CheckinHistoryCard
                        title="Energy Level"
                        icon={<Zap size={20} />}
                        data={checkinData.energy_level || {}}
                        color="yellow"
                    />
                    <CheckinHistoryCard
                        title="Sleep"
                        icon={<Moon size={20} />}
                        data={checkinData.sleep || {}}
                        color="blue"
                        isSleep={true}
                    />
                </div>
            </SectionCard>
        </div>
    );
};

const CheckinForm = ({ onSubmit, onCancel }) => {
    const [field, setField] = useState("mood");
    const [value, setValue] = useState("");
    const [sleepDuration, setSleepDuration] = useState("");
    const [sleepQuality, setSleepQuality] = useState("good");

    const moodOptions = [
        { value: "happy", label: "Happy", icon: "😊" },
        { value: "sad", label: "Sad", icon: "😢" },
        { value: "neutral", label: "Neutral", icon: "😐" },
        { value: "anxious", label: "Anxious", icon: "😰" },
        { value: "excited", label: "Excited", icon: "🤩" },
        { value: "tired", label: "Tired", icon: "😴" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let processedValue = value;
        if (field === "sleep") {
            if (!sleepDuration) {
                alert("Please enter sleep duration");
                return;
            }
            processedValue = {
                duration: parseInt(sleepDuration),
                quality: sleepQuality
            };
        } else if (!value) {
            alert("Please select a value");
            return;
        }

        onSubmit(field, processedValue);
        setValue("");
        setSleepDuration("");
        setSleepQuality("good");
    };

    return (
        <motion.form 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit} 
            className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Field</label>
                    <select
                        value={field}
                        onChange={(e) => {
                            setField(e.target.value);
                            setValue("");
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="mood">Mood</option>
                        <option value="stress_level">Stress Level</option>
                        <option value="energy_level">Energy Level</option>
                        <option value="sleep">Sleep</option>
                    </select>
                </div>

                {field === "mood" && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mood</label>
                        <div className="grid grid-cols-3 gap-2">
                            {moodOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setValue(option.value)}
                                    className={`p-3 border rounded-lg text-center transition-all ${
                                        value === option.value
                                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                                            : "border-gray-200 hover:border-blue-300"
                                    }`}
                                >
                                    <div className="text-2xl mb-1">{option.icon}</div>
                                    <div className="text-xs text-gray-700">{option.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {field === "sleep" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Duration (minutes)
                            </label>
                            <input
                                type="number"
                                value={sleepDuration}
                                onChange={(e) => setSleepDuration(e.target.value)}
                                placeholder="e.g., 480 (8 hours)"
                                min="0"
                                max="1440"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quality
                            </label>
                            <select
                                value={sleepQuality}
                                onChange={(e) => setSleepQuality(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="excellent">Excellent</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                                <option value="poor">Poor</option>
                                <option value="bad">Bad</option>
                            </select>
                        </div>
                    </>
                )}

                {(field === "stress_level" || field === "energy_level") && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                        <div className="grid grid-cols-3 gap-2">
                            {["low", "medium", "high"].map((level) => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setValue(level)}
                                    className={`p-3 border rounded-lg text-center transition-all capitalize ${
                                        value === level
                                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                                            : "border-gray-200 hover:border-blue-300"
                                    }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Add Check-in
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </motion.form>
    );
};

const CheckinHistoryCard = ({ title, icon, data, color, isSleep = false }) => {
    const entries = Object.entries(data).sort((a, b) => new Date(b[0]) - new Date(a[0]));

    return (
        <div className="p-4 border border-gray-100 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
                {icon}
                <h4 className="font-semibold text-gray-800">{title}</h4>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
                {entries.length === 0 ? (
                    <p className="text-sm text-gray-500">No entries yet</p>
                ) : (
                    entries.map(([timestamp, value]) => (
                        <div key={timestamp} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                            <span className="text-gray-600">{new Date(timestamp).toLocaleTimeString()}</span>
                            <span className="font-medium text-gray-800 capitalize">
                                {isSleep ? `${value.duration}min - ${value.quality}` : value}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const SectionCard = ({ title, description, children, footer }) => (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        {title && (
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    {description && <p className="text-sm text-gray-600">{description}</p>}
                </div>
                {footer}
            </div>
        )}
        <div>{children}</div>
    </div>
);

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-40">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
);

const ErrorAlert = ({ message }) => (
    <SectionCard>
        <div className="flex items-center gap-3 text-red-700 p-4 bg-red-50 border border-red-100 rounded-lg">
            <AlertCircle size={20} />
            <span>{message}</span>
        </div>
    </SectionCard>
);

export default CheckinsContent;