import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Activity() {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.warn("User ID not found. Cannot fetch activities.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/activity?userId=${userId}`
      );
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="fixed top-14 left-48 w-[calc(100%-12rem)] bg-yellow-500 shadow-md p-4 flex justify-between items-center z-10">
        <h1 className="text-xl font-semibold">Activity Log</h1>
      </div>

      <div className="mt-28 ml-48 p-6">
        {activities.length > 0 ? (
          <ul className="space-y-3">
            {activities.map((activity, index) => (
              <li key={index} className="bg-white shadow p-4 rounded">
                <div>{activity.action}</div>
                <div className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No activities found.</p>
        )}
      </div>
    </div>
  );
}

export default Activity;
