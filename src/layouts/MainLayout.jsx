// src/layouts/MainLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar (desktop) */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main content area */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Header (desktop) */}
                <Header />

                {/* Page content */}
                <main className="flex-1 p-6 pb-24 md:pb-6 overflow-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>

                {/* Footer (mobile only) */}
                <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        </div>
    );
};

export default MainLayout;