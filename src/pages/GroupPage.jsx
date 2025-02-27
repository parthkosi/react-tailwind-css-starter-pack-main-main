import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Activity from "../components/Activity";
import Groups from "../components/Groups";
import Friends from "../components/Friends";
import Account from "../components/Account";
import Dashboard from "../components/Dashboard";

const sections = {
  Groups: <Groups />,
  Friends: <Friends />,
  Activity: <Activity />,
  Account: <Account />,
};

const GroupPage = () => {
  // Retrieve selected section from localStorage, defaulting to "Groups"
  const [selectedSection, setSelectedSection] = useState(
    localStorage.getItem("selectedSection") || <Dashboard/>
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
    localStorage.removeItem("selectedSection"); // Clear section on logout
  };

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="flex bg-gray-100 min-h-[calc(100vh-4rem)]">
        <nav className="flex flex-col bg-white w-48 border-r border-gray-300">
          <div className="flex flex-col">
            {Object.keys(sections).map((section) => (
              <button
                key={section}
                onClick={() => handleNavigation(section)}
                className={`p-3 hover:bg-gray-50 border-b border-gray-200 ${
                  selectedSection === section
                    ? "text-black font-semibold"
                    : "text-gray-600"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
          <div className="mt-auto p-2 border-t border-gray-200">
            <Link to="/Login" onClick={handleLogout}>
              <button className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors">
                Logout
              </button>
            </Link>
          </div>
        </nav>
        <div className="flex-1 p-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-2xl font-semibold mb-4">{selectedSection}</h1>
            {sections[selectedSection]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
