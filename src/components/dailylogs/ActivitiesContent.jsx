// src/components/dailylogs/ActivitiesContent.jsx
import React, { useState, useEffect } from "react";
import { 
    Target, 
    Heart, 
    Coffee, 
    TrendingUp,
    Plus,
    Minus,
    Edit3,
    AlertCircle
} from "lucide-react";
import { useDailyLogs } from "../../hooks/useDailyLogs";

const ActivitiesContent = ({ selectedDate }) => {
    const { getLogByDate, initializeActivities, updateActivityComplete, incrementActivityComplete, loading } = useDailyLogs();
    const [logData, setLogData] = useState(null);
    const [editingActivity, setEditingActivity] = useState(null);
    const [editValue, setEditValue] = useState("");

    useEffect(() => {
        loadActivities();
    }, [selectedDate]);

    const loadActivities = async () => {
        try {
            const data = await getLogByDate(selectedDate);
            setLogData(data);
        } catch (err) {
            console.error("Failed to load activities:", err);
        }
    };

    const handleInitialize = async () => {
        try {
            await initializeActivities(selectedDate);
            await loadActivities();
        } catch (err) {
            console.error("Failed to initialize:", err);
        }
    };

    const handleIncrement = async (activityName, category, amount) => {
        try {
            await incrementActivityComplete(selectedDate, activityName, {
                increment: amount,
                category: category
            });
            await loadActivities();
        } catch (err) {
            console.error("Failed to increment:", err);
        }
    };

    const handleUpdateComplete = async (activityName, category, newValue) => {
        try {
            await updateActivityComplete(selectedDate, activityName, {
                completed: parseInt(newValue),
                category: category
            });
            await loadActivities();
            setEditingActivity(null);
            setEditValue("");
        } catch (err) {
            console.error("Failed to update:", err);
        }
    };

    if (loading) return <LoadingSpinner />;

    const activities = logData?.activities || {};
    const hasActivities = Object.values(activities).some(arr => arr && arr.length > 0);

    return (
        <div className="space-y-6">
            {!hasActivities ? (
                <SectionCard title="Activities">
                    <div className="text-center py-12">
                        <Target size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-4">No activities initialized for this date</p>
                        <button
                            onClick={handleInitialize}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Initialize Activities
                        </button>
                    </div>
                </SectionCard>
            ) : (
                <>
                    {activities.health_activity?.length > 0 && (
                        <ActivityCategorySection
                            title="Health Activities"
                            activities={activities.health_activity}
                            color="red"
                            icon={<Heart size={20} />}
                            category="health"
                            onIncrement={handleIncrement}
                            onUpdate={handleUpdateComplete}
                            editingActivity={editingActivity}
                            setEditingActivity={setEditingActivity}
                            editValue={editValue}
                            setEditValue={setEditValue}
                        />
                    )}
                    {activities.work_activity?.length > 0 && (
                        <ActivityCategorySection
                            title="Work Activities"
                            activities={activities.work_activity}
                            color="blue"
                            icon={<Coffee size={20} />}
                            category="work"
                            onIncrement={handleIncrement}
                            onUpdate={handleUpdateComplete}
                            editingActivity={editingActivity}
                            setEditingActivity={setEditingActivity}
                            editValue={editValue}
                            setEditValue={setEditValue}
                        />
                    )}
                    {activities.growth_activity?.length > 0 && (
                        <ActivityCategorySection
                            title="Growth Activities"
                            activities={activities.growth_activity}
                            color="green"
                            icon={<TrendingUp size={20} />}
                            category="growth"
                            onIncrement={handleIncrement}
                            onUpdate={handleUpdateComplete}
                            editingActivity={editingActivity}
                            setEditingActivity={setEditingActivity}
                            editValue={editValue}
                            setEditValue={setEditValue}
                        />
                    )}
                    {activities.relationship_activity?.length > 0 && (
                        <ActivityCategorySection
                            title="Relationship Activities"
                            activities={activities.relationship_activity}
                            color="purple"
                            icon={<Heart size={20} />}
                            category="relationship"
                            onIncrement={handleIncrement}
                            onUpdate={handleUpdateComplete}
                            editingActivity={editingActivity}
                            setEditingActivity={setEditingActivity}
                            editValue={editValue}
                            setEditValue={setEditValue}
                        />
                    )}
                </>
            )}
        </div>
    );
};

const ActivityCategorySection = ({ 
    title, 
    activities, 
    color, 
    icon, 
    category,
    onIncrement,
    onUpdate,
    editingActivity,
    setEditingActivity,
    editValue,
    setEditValue
}) => {
    return (
        <SectionCard title={title} description={`${activities.length} activities`}>
            <div className="space-y-3">
                {activities.map((activity, idx) => (
                    <ActivityCard 
                        key={idx} 
                        activity={activity} 
                        color={color}
                        category={category}
                        onIncrement={onIncrement}
                        onUpdate={onUpdate}
                        editingActivity={editingActivity}
                        setEditingActivity={setEditingActivity}
                        editValue={editValue}
                        setEditValue={setEditValue}
                    />
                ))}
            </div>
        </SectionCard>
    );
};

const ActivityCard = ({ 
    activity, 
    color, 
    category,
    onIncrement,
    onUpdate,
    editingActivity,
    setEditingActivity,
    editValue,
    setEditValue
}) => {
    const { configuration } = activity;
    const percentage = configuration.quota?.value 
        ? Math.min(100, (configuration.complete / configuration.quota.value) * 100)
        : 0;

    const colorClasses = {
        red: "bg-red-100 text-red-700",
        blue: "bg-blue-100 text-blue-700",
        green: "bg-green-100 text-green-700",
        purple: "bg-purple-100 text-purple-700",
    };

    const progressColors = {
        red: "bg-red-500",
        blue: "bg-blue-500",
        green: "bg-green-500",
        purple: "bg-purple-500",
    };

    const isEditing = editingActivity === `${activity.name}-${category}`;

    const handleEdit = () => {
        setEditingActivity(`${activity.name}-${category}`);
        setEditValue(configuration.complete.toString());
    };

    const handleSave = () => {
        onUpdate(activity.name, category, editValue);
    };

    const handleCancel = () => {
        setEditingActivity(null);
        setEditValue("");
    };

    // Calculate increment amount based on quota
    const incrementAmount = configuration.quota?.value 
        ? Math.max(1, Math.floor(configuration.quota.value / 10))
        : 1;

    return (
        <div className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{activity.name}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${colorClasses[color]} capitalize`}>
                    {activity.pillar}
                </span>
            </div>

            {/* Progress Section */}
            {configuration.quota ? (
                <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        {isEditing ? (
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="w-20 px-2 py-1 border border-gray-200 rounded text-sm"
                                    min="0"
                                    max={configuration.quota.value}
                                />
                                <span className="text-gray-600">/ {configuration.quota.value} {configuration.unit}</span>
                                <button
                                    onClick={handleSave}
                                    className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-800">
                                    {configuration.complete} / {configuration.quota.value} {configuration.unit}
                                </span>
                                <button
                                    onClick={handleEdit}
                                    className="p-1 text-gray-400 hover:text-blue-600"
                                >
                                    <Edit3 size={14} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-2">
                        <div
                            className={`h-full transition-all duration-300 ${progressColors[color]}`}
                            style={{ width: `${percentage}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{percentage.toFixed(1)}% complete</p>
                        
                        {/* Quick Action Buttons */}
                        <div className="flex gap-1">
                            <button
                                onClick={() => onIncrement(activity.name, category, -incrementAmount)}
                                disabled={configuration.complete === 0}
                                className="p-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                title={`Decrease by ${incrementAmount}`}
                            >
                                <Minus size={14} />
                            </button>
                            <button
                                onClick={() => onIncrement(activity.name, category, incrementAmount)}
                                disabled={configuration.complete >= configuration.quota.value}
                                className="p-1 bg-green-100 hover:bg-green-200 text-green-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                title={`Increase by ${incrementAmount}`}
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        <span className="font-medium">{configuration.complete}</span> {configuration.unit}
                    </div>
                    <div className="flex gap-1">
                        <button
                            onClick={() => onIncrement(activity.name, category, -1)}
                            disabled={configuration.complete === 0}
                            className="p-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
                        >
                            <Minus size={14} />
                        </button>
                        <button
                            onClick={() => onIncrement(activity.name, category, 1)}
                            className="p-1 bg-green-100 hover:bg-green-200 text-green-700 rounded"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const SectionCard = ({ title, description, children }) => (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        {title && (
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                {description && <p className="text-sm text-gray-600">{description}</p>}
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

export default ActivitiesContent;