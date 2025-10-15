// App.jsx
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// Layout
import MainLayout from "./layouts/MainLayout";

// Lazy load pages
const UnifiedAuth = React.lazy(() => import("./pages/UnifiedAuth"));
const Insights = React.lazy(() => import("./pages/Insights")); 
const Onboarding = React.lazy(() => import("./pages/OnboardingFlow"));
const DailyLogs = React.lazy(() => import("./pages/DailyLogs"));

const Dashboard = React.lazy(() => import("./pages/Insights"));
const Community = React.lazy(() => import("./pages/Community"));
const SageBot = React.lazy(() => import("./pages/SageBot"));
const Recommendation = React.lazy(() => import("./pages/Recommendation"));

// Common components
import ErrorFallback from "./components/common/ErrorFallback";
import LoadingSpinner from "./components/common/LoadingSpinner";

// TODO: Replace with real authentication (context or state)
const isAuthenticated = true;

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public routes - Unified Authentication Page */}
            <Route path="/login" element={<UnifiedAuth />} />

            {/* Protected routes with MainLayout */}
            {isAuthenticated && (
              <Route element={<MainLayout />}>
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/insights" element={<Insights />} /> 
                <Route path="/dailylogs" element={<DailyLogs />} /> 
                
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/community" element={<Community />} />
                <Route path="/sagebot" element={<SageBot />} />
                <Route path="/recommendation" element={<Recommendation />} />
              </Route>
            )}

            {/* Redirects */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;