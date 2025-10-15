import React, { useState } from 'react';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedImageHalf from "../components/bg/AnimatedImageHalf";

const UnifiedAuth = () => {
    const [mode, setMode] = useState('login'); // 'login', 'register', 'admin-register'
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        phone_number: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let response;
            const baseURL = 'http://localhost:8000';

            if (mode === 'login') {
                response = await fetch(`${baseURL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                });
            } else if (mode === 'register') {
                response = await fetch(
                    `${baseURL}/auth/register?email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}${formData.username ? `&username=${encodeURIComponent(formData.username)}` : ''}${formData.phone_number ? `&phone_number=${encodeURIComponent(formData.phone_number)}` : ''}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
            } else if (mode === 'admin-register') {
                response = await fetch(`${baseURL}/auth/register-admin`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        password_hash: formData.password,
                        role: 'admin',
                        username: formData.username || null,
                        phone_number: formData.phone_number || null
                    })
                });
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Authentication failed');
            }

            // ✅ Store tokens / user info
            if (mode === 'login') {
                sessionStorage.setItem('access_token', data.access_token);
                sessionStorage.setItem('refresh_token', data.refresh_token);
                sessionStorage.setItem('user', JSON.stringify(data.user));
            } else {
                sessionStorage.setItem('user', JSON.stringify(data));
            }

            // ✅ Navigate based on mode
            if (mode === 'admin-register') {
                navigate('/onboarding', { replace: true });
            } else {
                navigate('/dashboard', { replace: true });
            }

        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setError('');
        setFormData({
            email: '',
            password: '',
            username: '',
            phone_number: ''
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex w-full max-w-4xl">
                <AnimatedImageHalf />

                {/* Form Half */}
                <div className="w-1/2 p-12 flex flex-col justify-center">
                    <div className="max-w-sm mx-auto w-full">
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">
                            {mode === 'login' && 'Welcome Back'}
                            {mode === 'register' && 'Create Account'}
                            {mode === 'admin-register' && 'Admin Setup'}
                        </h2>
                        <p className="text-gray-500 mb-8 text-sm">
                            {mode === 'login' && 'Sign in to your account'}
                            {mode === 'register' && 'Join us today'}
                            {mode === 'admin-register' && 'One-time admin account setup'}
                        </p>

                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Username */}
                            {(mode === 'register' || mode === 'admin-register') && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Username <span className="text-gray-400 text-xs">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Choose a username"
                                    />
                                </div>
                            )}

                            {/* Phone Number */}
                            {(mode === 'register' || mode === 'admin-register') && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number <span className="text-gray-400 text-xs">(optional)</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="+1234567890"
                                    />
                                </div>
                            )}

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : (
                                    mode === 'login' ? 'Sign In' :
                                        mode === 'register' ? 'Create Account' :
                                            'Setup Admin Account'
                                )}
                            </button>
                        </form>

                        {/* Mode Switching UI */}
                        {mode === 'login' && (
                            <div className="mt-6 flex gap-2 text-sm">
                                <span className="text-gray-600">New here?</span>
                                <button
                                    onClick={() => switchMode('register')}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Create an account
                                </button>
                                <span className="text-gray-300">|</span>
                                <button
                                    onClick={() => switchMode('admin-register')}
                                    className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                                >
                                    <Shield className="w-3 h-3" />
                                    Admin Setup
                                </button>
                            </div>
                        )}

                        {(mode === 'register' || mode === 'admin-register') && (
                            <div className="mt-6 flex gap-2 text-sm items-center justify-center">
                                <span className="text-gray-600">Already have an account?</span>
                                <button
                                    onClick={() => switchMode('login')}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Sign in
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnifiedAuth;
