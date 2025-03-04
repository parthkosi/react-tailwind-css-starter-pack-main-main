import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Activity from "../components/Activity";
import Groups from "../components/Groups";
import Friends from "../components/Friends";
import Account from "../components/Account";
import Dashboard from "../components/Dashboard";

const sections = {
  Dashboard: <Dashboard />,
  Groups: <Groups />,
  Friends: <Friends />,
  Activity: <Activity />,
  Account: <Account />,
};

const GroupPage = () => {
  // Retrieve selected section from localStorage, defaulting to "Dashboard"
  const [selectedSection, setSelectedSection] = useState(
    localStorage.getItem("selectedSection") || "Dashboard"
  );

  useEffect(() => {
    localStorage.setItem("selectedSection", selectedSection);
  }, [selectedSection]);

  // Function to handle section selection
  const handleNavigation = (section) => {
    setSelectedSection(section);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("selectedSection");
    setSelectedSection("Dashboard");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/*  Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>

      {/*  Main Content Wrapper */}
      <div className="flex flex-grow pt-16">
        {/*  Fixed Sidebar */}
        <nav className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-48 bg-white border-r border-black flex flex-col shadow-lg">
          <div className="flex flex-col">
            {Object.keys(sections).map((section) => (
              <button
                key={section}
                onClick={() => handleNavigation(section)}
                className={`p-3 hover:bg-gray-50 border-b border-gray-200 ${
                  selectedSection === section
                    ? "text-black font-semibold bg-gray-100"
                    : "text-gray-600"
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Logout Button */}
          <div className="mt-auto p-2 border-t border-gray-200">
            <Link to="/Login" onClick={handleLogout}>
              <button className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors">
                Logout
              </button>
            </Link>
          </div>
        </nav>

        {/*  Main Content Area */}
        <div className="ml-48 flex-1 overflow-y-auto">
          <div className="bg-white rounded-lg  ">
            {sections[selectedSection]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
