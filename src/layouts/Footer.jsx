import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiStar, FiMessageCircle } from "react-icons/fi";

const Footer = ({ activeTab, setActiveTab }) => {
    const location = useLocation();

    const menuItems = [
        { id: "dashboard", path: "/dashboard", icon: FiHome, label: "Dashboard" },
        { id: "recommendation", path: "/recommendation", icon: FiStar, label: "Recommend" },
        { id: "sagebot", path: "/sagebot", icon: FiMessageCircle, label: "SageBot" },
        { id: "community", path: "/community", icon: FiMessageCircle, label: "Community" }
    ];

    return (
        <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
            <nav className="flex items-center justify-around">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path || activeTab === item.id;

                    return (
                        <Link
                            key={item.id}
                            to={item.path}
                            onClick={() => setActiveTab?.(item.id)}
                            className="flex flex-col items-center gap-1 min-w-0 flex-1"
                        >
                            <div className={`p-2 rounded-lg transition-colors ${
                                isActive ? "bg-blue-50" : ""
                            }`}>
                                <Icon className={`min-w-[24px] min-h-[24px] w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
                            </div>
                            <span className={`text-xs font-medium truncate ${
                                isActive ? "text-blue-600" : "text-gray-500"
                            }`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </footer>
    );
};

export default Footer;
