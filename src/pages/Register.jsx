// src/pages/Register.jsx
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
import { useRegister } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AnimatedImageHalf from "../components/bg/AnimatedImageHalf";

const Register = () => {
    const { register, loading, error } = useRegister();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({
                username,
                email,
                phone_number: phone,
                password,
            });

            // navigate after successful registration
            navigate("/onboarding");
        } catch (err) {
            // register hook sets error; still log for debugging
            console.error("Registration failed:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex w-full max-w-4xl">
                {/* Image Half */}
                <AnimatedImageHalf />

                {/* Form Half */}
                <div className="w-1/2 p-12 flex flex-col justify-center">
                    <div className="max-w-sm mx-auto w-full">
                        <Heading level={2} className="mb-2 text-gray-800">Create Account</Heading>
                        <p className="text-gray-500 mb-8 text-sm">Sign up to get started</p>

                        {error && <Alert variant="error" className="mb-6">{error}</Alert>}

                        <form onSubmit={onSubmit} className="space-y-6">
                            <FormGroup>
                                <Input
                                    label="Username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </FormGroup>

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
                                <Input
                                    label="Phone Number"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    pattern="\d{10,20}"
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
                                {loading ? 'Signing up...' : 'Sign Up'}
                            </Button>

                            <div className="text-center text-sm text-gray-500 mt-4">
                                Already have an account?{" "}
                                <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                                    Sign in
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
