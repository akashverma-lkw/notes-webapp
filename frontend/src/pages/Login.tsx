import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const handleSendOTP = async () => {
    try {
      await axios.post(`${API}/api/auth/send-otp`, {
        email,
        name: "Your OTP is given below,",
        dob: "1990-01-01",
      });
      setOtpSent(true);
      toast.success("OTP sent to your email.");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to send OTP.");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await axios.post(`${API}/api/auth/verify-otp`, {
        email,
        otp,
      });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "OTP verification failed.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    otpSent ? handleVerifyOTP() : handleSendOTP();
  };

  return (
    <div className="min-h-screen flex bg-white top-0">
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <form className="w-full max-w-[400px] px-4" onSubmit={handleSubmit}>
          {/* Mobile Logo */}
          <img
            src="/src/assets/top.png"
            alt="HD Logo"
            className="absolute md:hidden mb-12 top-36 ml-36 w-[420px] h-auto"
          />

          {/* Desktop Logo */}
          <img
            src="/src/assets/top.png"
            alt="HD Logo"
            className="hidden md:block absolute top-6 left-8 w-54 h-auto"
          />

          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center md:text-left">
            Sign in
          </h2>
          <p className="mb-8 text-gray-500 text-center md:text-left">
            Please login to continue to your account.
          </p>

          {/* Email Field */}
          <div className="relative w-full mb-8">
            <span className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-400">
              Email
            </span>
            <input
              type="email"
              value={email}
              required
              placeholder="your_email@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 pt-4 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              disabled={otpSent}
            />
          </div>

          {/* OTP Field */}
          <div className="relative w-full mb-4">
            <span className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-400">
              OTP
            </span>
            <input
              type={showOTP ? "text" : "password"}
              value={otp}
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              disabled={!otpSent}
            />
            <button
              type="button"
              onClick={() => setShowOTP(!showOTP)}
              className="absolute right-3 top-4 text-gray-400 hover:text-blue-600"
              tabIndex={-1}
              aria-label="Toggle OTP visibility"
            >
              {showOTP ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {/* Resend OTP */}
          {otpSent && (
            <p className="mb-4">
              <button
                type="button"
                className="text-blue-600 text-sm hover:underline"
                onClick={handleSendOTP}
              >
                Resend OTP
              </button>
            </p>
          )}

          {/* Keep me logged in */}
          <div className="flex items-center mb-6">
            <input
              id="keepLoggedIn"
              type="checkbox"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
              className="mr-2 accent-blue-600"
            />
            <label htmlFor="keepLoggedIn" className="text-sm text-gray-700">
              Keep me logged in
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 transition mb-6"
          >
            {otpSent ? "Sign in" : "Get OTP"}
          </button>

          {/* Divider */}
          <div className="relative my-6 w-full flex items-center">
            <hr className="w-full border-gray-300" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-sm text-gray-400">
              OR
            </span>
          </div>

          {/* Google Login */}
          <div className="my-4">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await axios.post(`${API}/api/auth/google`, {
                    credential: credentialResponse.credential,
                  });
                  localStorage.setItem("token", res.data.token);
                  toast.success("Google login successful!");
                  navigate("/dashboard");
                } catch (err: any) {
                  toast.error(err?.response?.data?.error || "Google login failed");
                }
              }}
              onError={() => toast.error("Google login failed")}
            />
          </div>

          {/* Sign up */}
          <div className="text-center text-gray-500 text-sm mt-4">
            Need an account?{" "}
            <span
              className="text-blue-600 font-medium hover:underline cursor-pointer"
              onClick={() => navigate("/")}
            >
              Create one
            </span>
          </div>
        </form>
      </div>

      {/* Right image */}
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

export default Login;
