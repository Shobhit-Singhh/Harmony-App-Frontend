import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    User,
    Brain,
    Heart,
    Activity,
    Pill,
    Clock,
    Calendar,
    TrendingUp,
    FileText,
    Shield,
    AlertCircle,
    CheckCircle,
    Edit3,
    Trash2,
    Plus,
    Eye,
    Download,
    BarChart3,
    Briefcase,
    Home,
    GraduationCap,
    ChevronLeft,
    ArrowUp,
    ArrowDown,
    Minus,
} from "lucide-react";
import { useInsights } from "../hooks/useInsights";

const InsightsDashboard = () => {
    const [activeTab, setActiveTab] = useState("My Insights");
    const [selectedInsight, setSelectedInsight] = useState(null);
    const tabs = ["My Insights", "Assessment History", "Analytics"];

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <InsightsHeader
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={(tab) => {
                        setActiveTab(tab);
                        setSelectedInsight(null);
                    }}
                />

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {activeTab === "My Insights" && <MyInsightsContent />}
                    {activeTab === "Assessment History" && (
                        <AssessmentHistoryContent 
                            selectedInsight={selectedInsight}
                            setSelectedInsight={setSelectedInsight}
                        />
                    )}
                    {activeTab === "Analytics" && <AnalyticsContent />}
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

// ---------------- Layout ----------------
const DashboardLayout = ({ children }) => (
    <div className="min-h-screen bg-gray-50">
        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-200/30 rounded-full blur-lg" />
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-blue-200/25 rounded-full blur-md" />
        <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-white/15 rounded-full blur-lg" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            {children}
        </div>
    </div>
);

// ---------------- Insights Header ----------------
const InsightsHeader = ({ tabs, activeTab, onTabChange }) => (
    <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white border border-gray-100 rounded-2xl shadow-sm p-6"
    >
        <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Icon */}
            <div className="w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl flex items-center justify-center ring-1 ring-gray-100">
                <Brain size={48} className="text-purple-600" />
            </div>

            {/* Header Info */}
            <div className="flex-1 text-center lg:text-left">
                <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                    Mental Health Insights
                </h1>
                <p className="text-sm text-gray-600">
                    Your comprehensive psychological assessments and wellness tracking
                </p>
            </div>
        </div>

        {/* Tab Bar */}
        <div className="mt-6 flex justify-center">
            <div className="inline-flex bg-transparent rounded-lg overflow-hidden">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 -mb-2 transition-colors focus:outline-none ${
                            activeTab === tab
                                ? "border-purple-500 text-gray-900 bg-white/2"
                                : "border-transparent text-gray-600 hover:text-gray-800"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    </motion.div>
);

// ---------------- My Insights Content ----------------
const MyInsightsContent = () => {
    const { getMyInsights, loading, error } = useInsights();
    const [insights, setInsights] = useState([]);

    useEffect(() => {
        loadInsights();
    }, []);

    const loadInsights = async () => {
        try {
            const data = await getMyInsights();
            setInsights(data);
        } catch (err) {
            console.error("Failed to load insights:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-40">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <SectionCard>
                <div className="flex items-center gap-3 text-red-700">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            </SectionCard>
        );
    }

    if (insights.length === 0) {
        return (
            <SectionCard title="No Insights Available">
                <div className="text-center py-8">
                    <Brain size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">
                        You don't have any psychological assessments yet.
                    </p>
                    <p className="text-sm text-gray-500">
                        Contact your healthcare provider to schedule an assessment.
                    </p>
                </div>
            </SectionCard>
        );
    }

    const latestInsight = insights[0];

    return (
        <div className="space-y-6">
            {/* Latest Insight Summary */}
            <LatestInsightSummary insight={latestInsight} />

            {/* Demographics */}
            <SectionCard title="Demographics" description="Personal information">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DemoItem icon={<User size={16} />} label="Age" value={latestInsight.age || "N/A"} />
                    <DemoItem icon={<Heart size={16} />} label="Marital Status" value={latestInsight.marital_status || "N/A"} />
                    <DemoItem icon={<Briefcase size={16} />} label="Occupation" value={latestInsight.occupation || "N/A"} />
                    <DemoItem icon={<Home size={16} />} label="Living Situation" value={latestInsight.living_situation || "N/A"} />
                    <DemoItem icon={<GraduationCap size={16} />} label="Education" value={latestInsight.education_level || "N/A"} />
                </div>
            </SectionCard>

            {/* Assessment Scales */}
            <SectionCard title="Assessment Scores" description="Psychological evaluation metrics">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ScoreCard
                        title="PHQ-9"
                        score={latestInsight.assessment_scales?.["PHQ-9"]?.score}
                        severity={latestInsight.assessment_scales?.["PHQ-9"]?.severity}
                        maxScore={27}
                        label="Depression"
                        icon={<Activity size={18} />}
                    />
                    <ScoreCard
                        title="GAD-7"
                        score={latestInsight.assessment_scales?.["GAD-7"]?.score}
                        severity={latestInsight.assessment_scales?.["GAD-7"]?.severity}
                        maxScore={21}
                        label="Anxiety"
                        icon={<Heart size={18} />}
                    />
                    <ScoreCard
                        title="PSS"
                        score={latestInsight.assessment_scales?.PSS?.score}
                        severity={latestInsight.assessment_scales?.PSS?.interpretation}
                        maxScore={40}
                        label="Stress"
                        icon={<Activity size={18} />}
                    />
                    <ScoreCard
                        title="Resilience (CD-RISC)"
                        score={latestInsight.resilience_score?.["CD-RISC"]?.score}
                        severity={`${latestInsight.resilience_score?.["CD-RISC"]?.percentile}th percentile`}
                        maxScore={100}
                        label="Resilience"
                        icon={<TrendingUp size={18} />}
                    />
                </div>
            </SectionCard>

            {/* Coping Strategies */}
            {latestInsight.coping_score?.BriefCOPE && (
                <SectionCard title="Coping Strategies (Brief COPE)" description="Assessment of coping mechanisms">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(latestInsight.coping_score.BriefCOPE).map(([key, value]) => (
                            <div key={key} className="p-3 border border-gray-100 rounded-lg">
                                <p className="text-sm text-gray-600 capitalize">{key.replace(/_/g, ' ')}</p>
                                <p className="text-xl font-semibold text-gray-800">{value}/5</p>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            )}

            {/* Lifestyle Factors */}
            <SectionCard title="Lifestyle Factors" description="Key behavioral and health patterns">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <LifestyleItem
                        icon={<Clock size={16} />}
                        label="Sleep Pattern"
                        value={latestInsight.sleep_pattern || "Not recorded"}
                    />
                    <LifestyleItem
                        icon={<Activity size={16} />}
                        label="Exercise Habits"
                        value={latestInsight.exercise_habits || "Not recorded"}
                    />
                    <LifestyleItem
                        icon={<Pill size={16} />}
                        label="Substance Use"
                        value={latestInsight.substance_use || "Not recorded"}
                    />
                    <LifestyleItem
                        icon={<Heart size={16} />}
                        label="Nutrition"
                        value={latestInsight.nutrition_pattern || "Not recorded"}
                    />
                </div>
            </SectionCard>

            {/* Medical History */}
            <SectionCard title="Medical History" description="Diagnoses and medications">
                <div className="space-y-4">
                    {/* Prior Diagnoses */}
                    {latestInsight.prior_diagnoses && latestInsight.prior_diagnoses.length > 0 && (
                        <div>
                            <h4 className="font-medium text-gray-800 mb-2">Prior Diagnoses</h4>
                            <div className="flex flex-wrap gap-2">
                                {latestInsight.prior_diagnoses.map((diagnosis, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                                        {diagnosis}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Current Medications */}
                    {latestInsight.current_medications && latestInsight.current_medications.length > 0 && (
                        <div>
                            <h4 className="font-medium text-gray-800 mb-2">Current Medications</h4>
                            <div className="space-y-2">
                                {latestInsight.current_medications.map((med, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                                        <Pill size={16} className="text-gray-600" />
                                        <div>
                                            <p className="font-medium text-gray-800">{med.name}</p>
                                            <p className="text-sm text-gray-600">{med.dosage} - {med.purpose}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Family History */}
                    {latestInsight.family_history && (
                        <div>
                            <h4 className="font-medium text-gray-800 mb-2">Family History</h4>
                            <div className="p-3 border border-gray-100 rounded-lg">
                                <p className="text-sm text-gray-700">
                                    <span className="font-medium">Mental Health:</span> {latestInsight.family_history.mental_health || "None reported"}
                                </p>
                                <p className="text-sm text-gray-700 mt-1">
                                    <span className="font-medium">Medical:</span> {latestInsight.family_history.medical || "None reported"}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </SectionCard>

            {/* Therapy Information */}
            <SectionCard title="Therapy & Goals" description="Treatment history and objectives">
                <div className="space-y-4">
                    {/* Therapy Goals */}
                    {latestInsight.therapy_goals && latestInsight.therapy_goals.length > 0 && (
                        <div>
                            <h4 className="font-medium text-gray-800 mb-2">Current Therapy Goals</h4>
                            <ul className="space-y-2">
                                {latestInsight.therapy_goals.map((goal, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">{goal}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Therapy History */}
                    {latestInsight.therapy_history && latestInsight.therapy_history.length > 0 && (
                        <div>
                            <h4 className="font-medium text-gray-800 mb-2">Therapy History</h4>
                            <div className="space-y-2">
                                {latestInsight.therapy_history.map((therapy, idx) => (
                                    <div key={idx} className="p-3 border border-gray-100 rounded-lg">
                                        <p className="font-medium text-gray-800">{therapy.type}</p>
                                        <p className="text-sm text-gray-600">Duration: {therapy.duration_months} months</p>
                                        <p className="text-sm text-gray-600">Outcome: {therapy.outcome}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </SectionCard>

            {/* Clinician Notes */}
            {(latestInsight.caregiver_notes || latestInsight.clinician_summary) && (
                <SectionCard title="Clinical Summary" description="Professional assessment notes">
                    {latestInsight.clinician_summary && (
                        <div className="mb-4 p-4 bg-purple-50 border border-purple-100 rounded-lg">
                            <h4 className="font-medium text-purple-900 mb-2">Clinician Summary</h4>
                            <p className="text-sm text-purple-800">{latestInsight.clinician_summary}</p>
                        </div>
                    )}
                    {latestInsight.caregiver_notes && (
                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">Caregiver Notes</h4>
                            <p className="text-sm text-blue-800">{latestInsight.caregiver_notes}</p>
                        </div>
                    )}
                </SectionCard>
            )}

            {/* All Insights List */}
            {insights.length > 1 && (
                <SectionCard title="All Assessments" description={`${insights.length} total assessment${insights.length > 1 ? 's' : ''}`}>
                    <div className="space-y-3">
                        {insights.map((insight) => (
                            <InsightListItem key={insight.id} insight={insight} />
                        ))}
                    </div>
                </SectionCard>
            )}
        </div>
    );
};

// ---------------- Assessment History Content ----------------
const AssessmentHistoryContent = ({ selectedInsight, setSelectedInsight }) => {
    const { getMyInsights, loading } = useInsights();
    const [insights, setInsights] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const data = await getMyInsights();
            setInsights(data.sort((a, b) => 
                new Date(b.assessment_date) - new Date(a.assessment_date)
            ));
        } catch (err) {
            console.error("Failed to load history:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-40">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // If an insight is selected, show detailed view
    if (selectedInsight) {
        return (
            <div className="space-y-6">
                <SectionCard>
                    <button
                        onClick={() => setSelectedInsight(null)}
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4"
                    >
                        <ChevronLeft size={16} />
                        <span>Back to Timeline</span>
                    </button>
                    <DetailedInsightView insight={selectedInsight} />
                </SectionCard>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <SectionCard title="Assessment Timeline" description="Chronological history of your evaluations">
                {insights.length === 0 ? (
                    <div className="text-center py-8 text-gray-600">
                        No assessment history available
                    </div>
                ) : (
                    <div className="space-y-4">
                        {insights.map((insight, index) => (
                            <TimelineItem 
                                key={insight.id} 
                                insight={insight} 
                                isLatest={index === 0}
                                onClick={() => setSelectedInsight(insight)}
                            />
                        ))}
                    </div>
                )}
            </SectionCard>
        </div>
    );
};

// ---------------- Analytics Content ----------------
const AnalyticsContent = () => {
    const { getMyInsights, loading } = useInsights();
    const [insights, setInsights] = useState([]);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            const data = await getMyInsights();
            const sorted = data.sort((a, b) => 
                new Date(a.assessment_date) - new Date(b.assessment_date)
            );
            setInsights(sorted);
        } catch (err) {
            console.error("Failed to load analytics:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-40">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (insights.length < 2) {
        return (
            <SectionCard title="Wellness Trends" description="Track your progress over time">
                <div className="text-center py-12 text-gray-600">
                    <BarChart3 size={48} className="mx-auto mb-4 text-gray-400" />
                    <p>Need at least 2 assessments to show trends</p>
                    <p className="text-sm mt-2">Complete more assessments to see your progress</p>
                </div>
            </SectionCard>
        );
    }

    const latestInsight = insights[insights.length - 1];
    const previousInsight = insights[insights.length - 2];

    const calculateChange = (current, previous) => {
        if (!current || !previous) return null;
        return current - previous;
    };

    const phq9Change = calculateChange(
        latestInsight?.assessment_scales?.["PHQ-9"]?.score,
        previousInsight?.assessment_scales?.["PHQ-9"]?.score
    );

    const gad7Change = calculateChange(
        latestInsight?.assessment_scales?.["GAD-7"]?.score,
        previousInsight?.assessment_scales?.["GAD-7"]?.score
    );

    const pssChange = calculateChange(
        latestInsight?.assessment_scales?.PSS?.score,
        previousInsight?.assessment_scales?.PSS?.score
    );

    const resilienceChange = calculateChange(
        latestInsight?.resilience_score?.["CD-RISC"]?.score,
        previousInsight?.resilience_score?.["CD-RISC"]?.score
    );

    return (
        <div className="space-y-6">
            {/* Progress Overview */}
            <SectionCard title="Progress Overview" description="Comparison between your latest two assessments">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ChangeCard
                        title="PHQ-9"
                        label="Depression"
                        current={latestInsight?.assessment_scales?.["PHQ-9"]?.score}
                        previous={previousInsight?.assessment_scales?.["PHQ-9"]?.score}
                        change={phq9Change}
                        lowerIsBetter={true}
                    />
                    <ChangeCard
                        title="GAD-7"
                        label="Anxiety"
                        current={latestInsight?.assessment_scales?.["GAD-7"]?.score}
                        previous={previousInsight?.assessment_scales?.["GAD-7"]?.score}
                        change={gad7Change}
                        lowerIsBetter={true}
                    />
                    <ChangeCard
                        title="PSS"
                        label="Stress"
                        current={latestInsight?.assessment_scales?.PSS?.score}
                        previous={previousInsight?.assessment_scales?.PSS?.score}
                        change={pssChange}
                        lowerIsBetter={true}
                    />
                    <ChangeCard
                        title="Resilience"
                        label="CD-RISC"
                        current={latestInsight?.resilience_score?.["CD-RISC"]?.score}
                        previous={previousInsight?.resilience_score?.["CD-RISC"]?.score}
                        change={resilienceChange}
                        lowerIsBetter={false}
                    />
                </div>
            </SectionCard>

            {/* Assessment Comparison */}
            <SectionCard title="Assessment Dates">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-100 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Previous Assessment</p>
                        <p className="text-lg font-semibold text-gray-800">
                            {new Date(previousInsight.assessment_date).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-600 mb-1">Latest Assessment</p>
                        <p className="text-lg font-semibold text-purple-800">
                            {new Date(latestInsight.assessment_date).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </SectionCard>

            {/* All Assessments Summary */}
            <SectionCard title="All Assessments" description={`${insights.length} total assessments`}>
                <div className="space-y-3">
                    {insights.map((insight, index) => (
                        <div key={insight.id} className="p-4 border border-gray-100 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-800">
                                        Assessment #{insights.length - index}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {new Date(insight.assessment_date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex gap-4 text-sm">
                                    <span className="text-gray-700">
                                        PHQ-9: <span className="font-medium">{insight.assessment_scales?.["PHQ-9"]?.score || "N/A"}</span>
                                    </span>
                                    <span className="text-gray-700">
                                        GAD-7: <span className="font-medium">{insight.assessment_scales?.["GAD-7"]?.score || "N/A"}</span>
                                    </span>
                                    <span className="text-gray-700">
                                        Resilience: <span className="font-medium">{insight.resilience_score?.["CD-RISC"]?.score || "N/A"}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>
        </div>
    );
};

// ---------------- Subcomponents ----------------
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

const LatestInsightSummary = ({ insight }) => {
    if (!insight) return null;

    return (
        <SectionCard>
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText size={24} className="text-purple-600" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Latest Assessment
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <span className="text-gray-600">Date:</span>
                            <span className="ml-2 font-medium text-gray-800">
                                {new Date(insight.assessment_date).toLocaleDateString()}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-600">Assessed by:</span>
                            <span className="ml-2 font-medium text-gray-800">
                                {insight.assessed_by || "N/A"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </SectionCard>
    );
};

const ScoreCard = ({ title, score, severity, maxScore, label, icon }) => {
    const percentage = score !== null && score !== undefined ? (score / maxScore) * 100 : 0;
    const getColor = () => {
        if (severity) {
            const sev = severity.toLowerCase();
            if (sev.includes('mild') || sev.includes('minimal') || sev.includes('low')) return "text-green-600";
            if (sev.includes('moderate')) return "text-yellow-600";
            if (sev.includes('severe') || sev.includes('high')) return "text-red-600";
        }
        if (percentage <= 33) return "text-green-600";
        if (percentage <= 66) return "text-yellow-600";
        return "text-red-600";
    };

    return (
        <div className="p-4 border border-gray-100 rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <div className="text-gray-700">{icon}</div>
                <span className="text-xs text-gray-500">{label}</span>
            </div>
            <div className={`text-2xl font-semibold ${getColor()}`}>
                {score !== null && score !== undefined ? score : "N/A"}
                <span className="text-sm text-gray-500">/{maxScore}</span>
            </div>
            <div className="text-xs text-gray-600 mt-1">{title}</div>
            {severity && (
                <div className="text-xs text-gray-500 mt-1 capitalize">{severity}</div>
            )}
        </div>
    );
};

const DemoItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
        <div className="w-9 h-9 flex items-center justify-center text-gray-700">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-800">{label}</p>
            <p className="text-sm text-gray-600">{value}</p>
        </div>
    </div>
);

const LifestyleItem = ({ icon, label, value }) => (
    <div className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg">
        <div className="w-9 h-9 flex items-center justify-center text-gray-700 flex-shrink-0">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-800">{label}</p>
            <p className="text-sm text-gray-600">{value}</p>
        </div>
    </div>
);

const InsightListItem = ({ insight }) => (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
            <Calendar size={16} className="text-gray-500" />
            <div>
                <p className="font-medium text-gray-800">
                    {new Date(insight.assessment_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                    PHQ-9: {insight.assessment_scales?.["PHQ-9"]?.score || "N/A"} | 
                    GAD-7: {insight.assessment_scales?.["GAD-7"]?.score || "N/A"}
                </p>
            </div>
        </div>
        <button className="w-8 h-8 bg-white border border-gray-100 rounded-md flex items-center justify-center hover:bg-gray-50">
            <Eye size={14} className="text-gray-600" />
        </button>
    </div>
);

const TimelineItem = ({ insight, isLatest, onClick }) => (
    <div className="relative pl-8 pb-4 border-l-2 border-gray-200">
        <div className={`absolute -left-2 w-4 h-4 rounded-full ${isLatest ? 'bg-purple-500' : 'bg-gray-300'}`} />
        <div 
            className="bg-white border border-gray-100 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={onClick}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="font-semibold text-gray-800">
                        {new Date(insight.assessment_date).toLocaleDateString()}
                    </p>
                    <div className="flex gap-4 mt-3 text-sm">
                        <span className="text-gray-700">
                            PHQ-9: <span className="font-medium">{insight.assessment_scales?.["PHQ-9"]?.score || "N/A"}</span>
                            <span className="text-xs text-gray-500 ml-1">({insight.assessment_scales?.["PHQ-9"]?.severity})</span>
                        </span>
                        <span className="text-gray-700">
                            GAD-7: <span className="font-medium">{insight.assessment_scales?.["GAD-7"]?.score || "N/A"}</span>
                            <span className="text-xs text-gray-500 ml-1">({insight.assessment_scales?.["GAD-7"]?.severity})</span>
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {isLatest && (
                        <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md">
                            Latest
                        </span>
                    )}
                    <Eye size={16} className="text-gray-400" />
                </div>
            </div>
        </div>
    </div>
);

// Detailed view for a single insight
const DetailedInsightView = ({ insight }) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Assessment Details
                </h2>
                <p className="text-sm text-gray-600">
                    {new Date(insight.assessment_date).toLocaleDateString()}
                </p>
            </div>

            {/* Assessment Scores */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Assessment Scores</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ScoreCard
                        title="PHQ-9"
                        score={insight.assessment_scales?.["PHQ-9"]?.score}
                        severity={insight.assessment_scales?.["PHQ-9"]?.severity}
                        maxScore={27}
                        label="Depression"
                        icon={<Activity size={18} />}
                    />
                    <ScoreCard
                        title="GAD-7"
                        score={insight.assessment_scales?.["GAD-7"]?.score}
                        severity={insight.assessment_scales?.["GAD-7"]?.severity}
                        maxScore={21}
                        label="Anxiety"
                        icon={<Heart size={18} />}
                    />
                    <ScoreCard
                        title="PSS"
                        score={insight.assessment_scales?.PSS?.score}
                        severity={insight.assessment_scales?.PSS?.interpretation}
                        maxScore={40}
                        label="Stress"
                        icon={<Activity size={18} />}
                    />
                    <ScoreCard
                        title="CD-RISC"
                        score={insight.resilience_score?.["CD-RISC"]?.score}
                        severity={`${insight.resilience_score?.["CD-RISC"]?.percentile}th percentile`}
                        maxScore={100}
                        label="Resilience"
                        icon={<TrendingUp size={18} />}
                    />
                </div>
            </div>

            {/* Clinician Summary */}
            {insight.clinician_summary && (
                <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Clinician Summary</h4>
                    <p className="text-sm text-purple-800">{insight.clinician_summary}</p>
                </div>
            )}

            {/* Therapy Goals */}
            {insight.therapy_goals && insight.therapy_goals.length > 0 && (
                <div>
                    <h4 className="font-medium text-gray-800 mb-2">Therapy Goals</h4>
                    <ul className="space-y-2">
                        {insight.therapy_goals.map((goal, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{goal}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Lifestyle */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Lifestyle Factors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <LifestyleItem icon={<Clock size={16} />} label="Sleep" value={insight.sleep_pattern} />
                    <LifestyleItem icon={<Activity size={16} />} label="Exercise" value={insight.exercise_habits} />
                    <LifestyleItem icon={<Pill size={16} />} label="Substance Use" value={insight.substance_use} />
                    <LifestyleItem icon={<Heart size={16} />} label="Nutrition" value={insight.nutrition_pattern} />
                </div>
            </div>
        </div>
    );
};

// Change card for analytics
const ChangeCard = ({ title, label, current, previous, change, lowerIsBetter }) => {
    const getChangeColor = () => {
        if (change === null || change === 0) return "text-gray-600";
        if (lowerIsBetter) {
            return change < 0 ? "text-green-600" : "text-red-600";
        } else {
            return change > 0 ? "text-green-600" : "text-red-600";
        }
    };

    const getChangeIcon = () => {
        if (change === null || change === 0) return <Minus size={16} />;
        if (lowerIsBetter) {
            return change < 0 ? <ArrowDown size={16} /> : <ArrowUp size={16} />;
        } else {
            return change > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
        }
    };

    return (
        <div className="p-4 border border-gray-100 rounded-lg">
            <div className="text-xs text-gray-500 mb-2">{label}</div>
            <div className="text-2xl font-semibold text-gray-800 mb-1">
                {current !== null && current !== undefined ? current : "N/A"}
            </div>
            <div className="text-sm text-gray-600 mb-2">
                Previous: {previous !== null && previous !== undefined ? previous : "N/A"}
            </div>
            {change !== null && (
                <div className={`flex items-center gap-1 text-sm font-medium ${getChangeColor()}`}>
                    {getChangeIcon()}
                    <span>{Math.abs(change)}</span>
                </div>
            )}
            <div className="text-xs text-gray-600 mt-1">{title}</div>
        </div>
    );
};

export default InsightsDashboard;