import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();

  // Countdown logic
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot_password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setTimer(30);
        toast.success("OTP sent to your email!");
      } else {
        toast.error(data.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Send OTP Error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      handleSendOtp();
    } else {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/forgot_password",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          toast.success("OTP Verified!");
          navigate("/reset_password", { state: { email, otp } });
        } else {
          toast.error(data.error || "Invalid or expired OTP");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Navbar />
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {otpSent ? "Verify OTP" : "Forgot Password"}
        </h2>
        <p className="text-gray-600 text-sm text-center mb-4">
          {otpSent
            ? "Enter the OTP sent to your email"
            : "Enter your email to receive an OTP"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            disabled={otpSent}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {otpSent && (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {otpSent ? "Verify OTP" : "Send OTP"}
          </button>
        </form>

        {otpSent && (
          <div className="text-center mt-4">
            {timer > 0 ? (
              <p className="text-gray-600 text-sm">
                Resend OTP in <span className="font-semibold">{timer}s</span>
              </p>
            ) : (
              <button
                onClick={handleSendOtp}
                className="text-blue-500 hover:underline text-sm font-medium"
              >
                Resend OTP ?
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
