import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React from "react";
import Navbar from "../components/Navbar";
import Activity from "../components/Activity";
import Groups from "../components/Groups";
import Friends from "../components/Friends";
import Account from "../components/Account";
import Dashboard from "../components/Dashboard";
import NotFound from "../components/NotFound";
import { toast } from "react-toastify";

const GroupPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Function to handle logout
  const handleLogout = () => {
    toast.success("Logout Successfully");
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex flex-grow pt-16">
        {/* Fixed Sidebar */}
        <nav className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-48 bg-white border-r border-black flex flex-col shadow-lg">
          <div className="flex flex-col">
            {[
              { name: "Dashboard", path: "/GroupPage/dashboard" },
              { name: "Groups", path: "/GroupPage/groups" },
              { name: "Friends", path: "/GroupPage/friends" },
              { name: "Activity", path: "/GroupPage/activity" },
              { name: "Account", path: "/GroupPage/account" },
            ].map(({ name, path }) => (
              <button
                key={name}
                onClick={() => handleNavigation(path)}
                className={`p-3 border-b border-gray-200 transition-all ${
                  location.pathname === path
                    ? "bg-gray-800 text-white font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Logout Button */}
          <div className="mt-auto p-2 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Main Content Area with Routes */}
        <div className="ml-48 flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="groups" element={<Groups />} />
            <Route path="friends" element={<Friends />} />
            <Route path="activity" element={<Activity />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
