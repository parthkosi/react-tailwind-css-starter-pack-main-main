import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:5000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data); // Store user data
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full bg-black shadow-md px-6 py-3 flex justify-between items-center z-50">
        {/* Loading State */}
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-black shadow-md px-6 py-3 flex justify-between items-center z-50">
      {/* Logo */}
      <Link to="/" className="text-white text-2xl font-bold">
        TrueSplits
      </Link>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="text-white flex items-center space-x-2">
            {/* Display username */}
            <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              {user.username[0].toUpperCase()}
            </div>
            <span className="text-sm">{user.username}</span>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-2 text-white text-sm border border-white rounded-md hover:bg-white hover:text-black transition">
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-teal-500 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-teal-600 transition">
                Sign up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
