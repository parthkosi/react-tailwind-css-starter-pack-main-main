import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { setToken } from "../utils/auth";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  async function handleLogin(event) {
    event.preventDefault(); // Prevent form refresh

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        setToken(data.token); // Save the token in localStorage
        localStorage.setItem("userId", data.userId);
        navigate("/GroupPage/dashboard"); // Redirect after login
      } else {
        toast.error(data.message || "Login failed!");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again later.");
      console.error("Login error:", error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center bg-gray-100 min-h-screen pt-14">
        <div className="w-full max-w-md p-14 bg-white shadow-lg rounded-xl m-4">
          <h1 className="text-4xl mb-6 text-center font-bold text-gray-800">
            Log in
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4 border border-gray-400 rounded-md">
              <div className="bg-gray-200 p-4 rounded-md flex items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-blue-600 border-black-400 rounded"
                    required
                  />
                  <span className="text-black">I'm not a robot</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={!email || !password}
              className="w-full py-2 text-white bg-teal-500 rounded-md shadow-md hover:bg-teal-600 disabled:bg-gray-400 transition"
            >
              Log in
            </button>
          </form>

          <div className="mt-4 text-center mb-4">
            <Link
              to="/forgot_password"
              className="text-teal-600 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="flex items-center justify-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <button className="w-full py-2 text-black border border-black rounded-md hover:bg-gray-100 transition">
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
