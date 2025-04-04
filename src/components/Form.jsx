import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Form() {
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
        localStorage.setItem("token", data.token); // Store token in localStorage
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
    <div className="bg-gray-100 w-[100vw]  flex flex-wrap items-center justify-center">
      <div className=" w-full max-w-md p-14 bg-white shadow-lg rounded-xl ml-3 items-center justify-center flex flex-wrap m-8">
        <h1 className="text-4xl mb-6 flex flex-wrap  justify-center">Log in</h1>

        <form onSubmit={handleLogin}>
          {" "}
          {/*  Form submission calls handleLogin */}
          <div className="mb-4 flex flex-wrap">
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              className="w-full flex flex-wrap p-2 mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 mr-20 border border-gray-400 rounded-md">
            <div className="bg-gray-200 p-5 rounded-md flex">
              <label className="flex space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-6 w-6 text-blue-600 border-black-400 rounded"
                  required
                />
                <span className="text-black">I'm not a robot</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={!email || !password}
            className="w-full py-2 text-white bg-teal-500 rounded-md shadow-md hover:bg-teal-600 disabled:bg-gray-400"
          >
            Log in
          </button>
        </form>

        <div className="mt-4 text-center mb-5">
          <Link to="/password_reset" className="text-teal-600 hover:underline">
            Forgot your password?
          </Link>
        </div>

        <div className="flex items-center justify-center my-4 mx-20">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button className="w-full py-2 text-black border-black border-b-4 rounded-md hover:bg-gray-200 border border-black-800 mb-4">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Form;
