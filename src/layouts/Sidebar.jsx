// src/layouts/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiHome, FiStar, FiMessageCircle, FiUser, FiAlertCircle } from "react-icons/fi";
import Button from "../components/common/Button";

const Sidebar = ({ activeTab, setActiveTab }) => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { id: "dashboard", path: "/dashboard", icon: FiHome, label: "Dashboard" },
        { id: "recommendation", path: "/recommendation", icon: FiStar, label: "Recommendation" },
        { id: "community", path: "/community", icon: FiMessageCircle, label: "Community" },
        { id: "sagebot", path: "/sagebot", icon: FiMessageCircle, label: "SageBot" },
        { id: "profile", path: "/profile", icon: FiUser, label: "Profile" },
    ];

    useEffect(() => {
        const current = menuItems.find(item => item.path === location.pathname);
        if (current) {
            setActiveTab?.(current.id);
        }
    }, [location.pathname, setActiveTab]);

    return (
        <aside
            className={`hidden md:flex flex-col bg-white rounded-r-2xl shadow-lg border-r border-gray-200 h-screen sticky top-0 z-50 transition-all duration-300 ${collapsed ? "w-20" : "w-64"
                }`}
        >
            {/* App Title */}
            <div
                className={`flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100 transition`}
                onClick={() => setCollapsed(!collapsed)}
            >
                <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg`}
                >
                    <span className="text-white font-bold text-lg">H</span>
                </div>
                {!collapsed && (
                    <span className="text-2xl font-bold text-gray-800">Harmony</span>
                )}
            </div>

            {/* Menu */}
            <div className="flex-1 flex flex-col p-2 space-y-2 overflow-y-auto">
                <nav className="space-y-2 flex-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path || activeTab === item.id;

                        return (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                onClick={() => setActiveTab?.(item.id)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 pointer-events-auto ${isActive || activeTab === item.id
                                        ? "p-2 rounded-lg transition-colors bg-blue-50"
                                        : "text-gray-700 hover:bg-gray-50 hover:shadow-sm"
                                    } ${collapsed ? "justify-center" : ""}`
                                }
                            >
                                <Icon
                                    className={`w-6 h-6 min-w-[24px] min-h-[24px] ${location.pathname === item.path || activeTab === item.id
                                            ? "text-blue-600"
                                            : "text-gray-500"
                                        } transition-colors`}
                                />
                                {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom SOS Button */}
            <div className="p-4 border-t border-gray-200">
                <Button
                    variant="danger"
                    className={`w-full flex items-center justify-center gap-2 
            bg-gradient-to-r from-red-500 to-red-500 
            hover:from-red-500 hover:to-red-500 
            border-4 border-transparent 
            hover:border-red-700 
            text-white 
            font-semibold 
            rounded-xl 
            py-3 
            shadow-lg 
            transition-all duration-200 ease-in-out
            ${collapsed ? "justify-center p-2" : ""}
        `}
                >
                    <FiAlertCircle className="min-w-[24px] min-h-[24px] w-5 h-5 animate-pulse" />
                    {!collapsed && "SOS"}
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;
