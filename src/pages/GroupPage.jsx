import React from "react";
import { Link } from "react-router-dom";

const GroupPage = () => {
  return (
    <div>
      <ul>
        <li className="px-8 py-8">Groups</li>
        <li className="px-8 py-4">Friends</li>
        <li className="px-8 py-8">Activity</li>
      </ul>

      <Link to="/Login">
        <button className=" px-4 py-4 text-white bg-teal-500 rounded-full shadow-md hover:bg-teal-600 m-5">
          Back
        </button>
      </Link>
    </div>
  );
};

export default GroupPage;
