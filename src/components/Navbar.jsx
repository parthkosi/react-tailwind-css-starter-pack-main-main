import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-black ">
      <button className="text-white text-xl font-bold cursor-pointer">
        <Link to="/"> Splitwise</Link>
      </button>
      <div>
        {/* Login Button */}
        <Link to="/Login">
          <button className="px-4 py-2 text-white text-sm cursor-pointer border">
            Log in
          </button>
        </Link>

        {/* Sign Up Button */}
        <Link to="/SignUp">
          <button className="bg-teal-500 text-white text-sm cursor-pointer px-4 py-2 rounded-md shadow-md hover:bg-teal-600">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
