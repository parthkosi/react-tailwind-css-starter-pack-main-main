import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-black shadow-md px-6 py-3 flex flex-wrap justify-between items-center z-50">
      {/*  Logo */}
      <Link to="/" className="text-white text-2xl font-bold flex-wrap">
        Splitwise
      </Link>

      {/*  Buttons */}
      <div className="flex space-x-4 flex-wrap">
        {/* Login Button */}
        <Link to="/Login">
          <button className="px-4 py-2 text-white text-sm border border-white rounded-md hover:bg-white hover:text-black transition ">
            Log in
          </button>
        </Link>

        {/* Sign Up Button */}
        <Link to="/signup">
          <button className="bg-teal-500 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-teal-600 transition ">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
