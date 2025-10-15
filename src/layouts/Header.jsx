import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiAlertCircle } from "react-icons/fi";
import Button from "../components/common/Button";

const Header = () => {
    const [hideHeader, setHideHeader] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // Scrolling down
                setHideHeader(true);
            } else {
                // Scrolling up
                setHideHeader(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <header
            className={`md:hidden bg-white border-b border-gray-200 px-4 py-2 sticky top-0 z-40 backdrop-blur-sm bg-white/95 transition-transform duration-300 ease-in-out ${hideHeader ? "-translate-y-full" : "translate-y-0"
                }`}
        >
            <div className="flex items-center justify-between max-w-full mx-auto">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">H</span>
                    </div>
                </Link>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/profile"
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                        <FiUser className="min-w-[24px] min-h-[24px] w-5 h-5 text-gray-700" />
                    </Link>

                    <Button
                        variant="danger"
                        className="flex items-center justify-center gap-2 p-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-pink-500 border-2 border-transparent hover:border-red-700 text-white font-semibold rounded-lg shadow transition-all"
                    >
                        <FiAlertCircle className="min-w-[24px] min-h-[24px] w-5 h-5 animate-pulse" />
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
