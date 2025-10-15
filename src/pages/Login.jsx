// src/pages/Login.jsx
import React, { useState } from 'react';
import {
    Section,
    Container,
    Heading,
    FormGroup,
    Input,
    PasswordInput,
    Button,
    Alert,
} from "../components/common";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AnimatedImageHalf from "../components/bg/AnimatedImageHalf";


const Login = () => {
    const { login, loading, error } = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            // navigate after successful login
            navigate("/onboarding");
        } catch (err) {
            // error state is set inside the hook; logging still helpful for debugging
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex w-full max-w-4xl">
                {/* Image Half */}
                <AnimatedImageHalf />

                {/* Login Half */}
                <div className="w-1/2 p-12 flex flex-col justify-center">
                    <div className="max-w-sm mx-auto w-full">
                        <Heading level={2} className="mb-2 text-gray-800">Welcome Back</Heading>
                        <p className="text-gray-500 mb-8 text-sm">Sign in to your account</p>

                        {error && <Alert variant="error" className="mb-6">{error}</Alert>}

                        <form onSubmit={onSubmit} className="space-y-6">
                            <FormGroup>
                                <Input
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <PasswordInput
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </FormGroup>

                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                disabled={loading}
                                className="!bg-gradient-to-r from-blue-600 to-blue-700 hover:!from-blue-700 hover:!to-blue-800"
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </Button>

                            <div className="text-center">
                                <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                                    Forgot password?
                                </a>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">or</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Button variant="secondary" fullWidth className="text-sm border-gray-200 hover:bg-gray-50">
                                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Continue with Google
                                </Button>
                            </div>

                            <div className="text-center text-sm text-gray-500">
                                Don't have an account?{" "}
                                <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                                    Sign up
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
