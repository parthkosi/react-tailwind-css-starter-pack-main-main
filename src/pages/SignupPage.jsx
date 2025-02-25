import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import React, { useState } from "react";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Name, setName] = useState("");

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 w-[100vw]  flex items-center justify-center ">
        <div className="w-full max-w-md p-10 bg-white shadow-lg rounded-xl ml-3 items-center justify-center m-8">
          <h1 className="text-4xl mb-6 flex  justify-center">Sign Up</h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="w-full p-2 mt-1 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={Name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              className="w-full p-2 mt-1 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Set Password
            </label>
            <input
              type="password"
              className="w-full p-2 mt-1 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={!email || !password || !Name}
            className="w-full mb-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            Sign Up
          </button>
          <div className=" text-sm font-medium text-gray-700 mb-4 flex items-center justify-center">
            Already have an account ?
            <Link className="text-blue-400 hover:text-blue-600" to="/Login">
              Log in
            </Link>
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <button className="w-full py-2 border-b-2 rounded-md hover:bg-gray-200 border border-black mb-4">
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
