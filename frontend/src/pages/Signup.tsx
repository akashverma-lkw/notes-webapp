import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const Signup = () => {
    const [dob, setDob] = useState<Date | null>(null);
    const [form, setForm] = useState({ name: "", email: "", dob: "", otp: "" });
    const [otpSent, setOtpSent] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const navigate = useNavigate();

    const API_BASE = import.meta.env.VITE_API_URL;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSendOTP = async () => {
        try {
            await axios.post(`${API_BASE}/api/auth/send-otp`, {
                name: form.name,
                email: form.email,
                dob: form.dob,
            });
            setOtpSent(true);
            toast.success("OTP sent successfully!");
        } catch (err: any) {
            toast.error(err?.response?.data?.error || "Failed to send OTP");
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const res = await axios.post(`${API_BASE}/api/auth/verify-otp`, {
                email: form.email,
                otp: form.otp,
            });
            localStorage.setItem("token", res.data.token);
            toast.success("Logged in successfully!");
            navigate("/dashboard");
        } catch (err: any) {
            toast.error(err?.response?.data?.error || "OTP verification failed");
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white">
            <div className="w-full md:w-1/2 flex flex-col px-4 py-8 md:px-8 relative">
                <div className="w-full md:w-1/2 flex flex-col px-4 md:px-8 py-10 relative">
                    <img
                        src="/src/assets/top.png"
                        alt="HD Logo"
                        className="absolute md:hidden mt-2 ml-32 w-[420px] h-auto"
                    />
                </div>

                <img
                    src="/src/assets/top.png"
                    alt="HD Logo"
                    className="hidden md:block absolute top-6 left-8 w-54 h-auto"
                />

                <div className="flex-1 flex flex-col justify-center mx-auto w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center md:text-left">
                        Sign up
                    </h2>
                    <p className="text-gray-500 mb-6 text-center md:text-left">
                        Sign up to enjoy the feature of HD
                    </p>

                    <div className="relative w-full mb-4">
                        <span className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-400">
                            Your Name
                        </span>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            placeholder="Jonas Khanwald"
                            onChange={handleChange}
                            className="w-full px-4 pt-4 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                    </div>

                    <div className="relative w-full mb-4">
                        <span className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-400 z-50">
                            Date of Birth
                        </span>
                        <div className="relative w-full">
                            <DatePicker
                                selected={dob}
                                onChange={(date) => {
                                    setDob(date);
                                    setForm({
                                        ...form,
                                        dob: date?.toISOString().split("T")[0] || "",
                                    });
                                }}
                                placeholderText="Enter your date of birth"
                                dateFormat="dd MMMM yyyy"
                                className="block w-full px-4 pt-4 pb-2 pl-11 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                maxDate={new Date()}
                            />
                            <FaCalendarAlt className="absolute left-4 top-7 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="relative w-full mb-4">
                        <span className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-400">
                            Email
                        </span>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            placeholder="jonas_kahnwald@gmail.com"
                            onChange={handleChange}
                            className="w-full px-4 pt-4 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                    </div>

                    {otpSent && (
                        <div className="relative w-full mb-4">
                            <span className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-400">
                                OTP
                            </span>
                            <input
                                type={showOTP ? "text" : "password"}
                                name="otp"
                                value={form.otp}
                                placeholder="OTP"
                                onChange={handleChange}
                                className="w-full px-4 pt-4 pb-2 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOTP(!showOTP)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                                aria-label="Toggle OTP visibility"
                            >
                                {showOTP ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </div>
                    )}

                    {!otpSent ? (
                        <button
                            onClick={handleSendOTP}
                            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                            Get OTP
                        </button>
                    ) : (
                        <button
                            onClick={handleVerifyOTP}
                            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                            Sign Up
                        </button>
                    )}

                    <p className="text-sm text-center mt-6 text-gray-500">
                        Already have an account?{" "}
                        <span
                            className="text-blue-600 font-medium cursor-pointer hover:underline"
                            onClick={() => navigate("/login")}
                        >
                            Sign in
                        </span>
                    </p>
                </div>
            </div>

            <div className="hidden md:flex w-1/2 items-center justify-center p-4">
                <img
                    src="/src/assets/auth-banner.png"
                    alt="Signup Visual"
                    className="rounded-xl shadow-lg w-full max-w-[600px]"
                />
            </div>
        </div>
    );
};

export default Signup;
