import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");

  // Get email & otp from navigation state (sent from ForgotPassword page)
  const email = location.state?.email;
  const otp = location.state?.otp;

  // Redirect if no email/otp found in state
  useEffect(() => {
    if (!email || !otp) {
      setTimeout(() => {
        toast.error("Access denied. Please verify OTP first.");
        navigate("/password_reset");
      }, 100);
    }
  }, [email, otp, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset_password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, newPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset successful!");
        navigate("/login");
      } else {
        toast.error(data.error || "Reset failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Reset password error:", error);
    }
  };

  // Prevent rendering if no email/otp available
  if (!email || !otp) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="Enter New Password"
          className="w-full p-2 border rounded mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={newPassword.length < 6}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
