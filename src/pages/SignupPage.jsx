import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import { toast } from "react-toastify";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate(); // Navigation Hook

  // Handle Signup Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent Page Reload

    if (!email || !password || !name) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("https://backend-etx6.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Signup Successful!");
        navigate("/GroupPage/dashboard"); // Redirect to Dashboard
      } else {
        toast.error(data.error || "Signup failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Sign Up
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Set Password
              </label>
              <input
                type="password"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!email || !password || !name}
              className="w-full py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-700 disabled:bg-gray-400 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Login Redirect */}
          <div className="text-sm font-medium text-gray-700 text-center mt-4">
            Already have an account?{" "}
            <Link className="text-blue-500 hover:underline" to="/Login">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
