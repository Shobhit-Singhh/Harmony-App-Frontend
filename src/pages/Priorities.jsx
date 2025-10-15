import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Brain,
    AlertCircle,
    BarChart3,
    ChevronLeft,
} from "lucide-react";
import { useInsights } from "../hooks/useInsights";

// Import all component modules
import { DemographicsSection, InsightListItem } from "./insights/basic_insights";
import { 
    AssessmentScoresSection, 
    LifestyleSection, 
    MedicalHistorySection 
} from "./insights/health_insights";
import { 
    TherapyInfoSection, 
    ClinicalSummarySection 
} from "./insights/work_insights";
import { 
    ProgressOverviewSection, 
    AssessmentComparisonSection 
} from "./insights/growth_insights";
import { 
    TimelineItem, 
    DetailedInsightView 
} from "./insights/relationship_insights";
import { 
    SectionCard, 
    LatestInsightSummary, 
    CopingStrategiesSection 
} from "./insights/preferences_insights";

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
                <DemographicsSection insight={latestInsight} />
            </SectionCard>

            {/* Assessment Scales */}
            <SectionCard title="Assessment Scores" description="Psychological evaluation metrics">
                <AssessmentScoresSection insight={latestInsight} />
            </SectionCard>

            {/* Coping Strategies */}
            {latestInsight.coping_score?.BriefCOPE && (
                <SectionCard title="Coping Strategies (Brief COPE)" description="Assessment of coping mechanisms">
                    <CopingStrategiesSection insight={latestInsight} />
                </SectionCard>
            )}

            {/* Lifestyle Factors */}
            <SectionCard title="Lifestyle Factors" description="Key behavioral and health patterns">
                <LifestyleSection insight={latestInsight} />
            </SectionCard>

            {/* Medical History */}
            <SectionCard title="Medical History" description="Diagnoses and medications">
                <MedicalHistorySection insight={latestInsight} />
            </SectionCard>

            {/* Therapy Information */}
            <SectionCard title="Therapy & Goals" description="Treatment history and objectives">
                <TherapyInfoSection insight={latestInsight} />
            </SectionCard>

            {/* Clinician Notes */}
            {(latestInsight.caregiver_notes || latestInsight.clinician_summary) && (
                <SectionCard title="Clinical Summary" description="Professional assessment notes">
                    <ClinicalSummarySection insight={latestInsight} />
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

    return (
        <div className="space-y-6">
            {/* Progress Overview */}
            <SectionCard title="Progress Overview" description="Comparison between your latest two assessments">
                <ProgressOverviewSection 
                    latestInsight={latestInsight} 
                    previousInsight={previousInsight} 
                />
            </SectionCard>

            {/* Assessment Comparison */}
            <SectionCard title="Assessment Dates">
                <AssessmentComparisonSection 
                    latestInsight={latestInsight} 
                    previousInsight={previousInsight} 
                />
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

export default InsightsDashboard;