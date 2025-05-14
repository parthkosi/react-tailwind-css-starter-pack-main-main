import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { MdDeleteOutline } from "react-icons/md";

const Group = () => {
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState("");
  const [balance, setBalance] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchGroups = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/groups", {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
      toast.error("Failed to fetch groups.");
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleAddGroup = async () => {
    if (!groupName || !members || !balance) {
      toast.error("Please fill all fields!");
      return;
    }

    const newGroup = {
      name: groupName,
      members: parseInt(members),
      balance: parseFloat(balance),
    };

    try {
      const response = await fetch("http://localhost:5000/api/groups", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newGroup),
      });

      if (response.ok) {
        toast.success("Group created!");
        fetchGroups();
        setShowModal(false);
        setGroupName("");
        setMembers("");
        setBalance("");
      } else {
        toast.error("Failed to create group.");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDeleteGroup = async (id, name) => {
    try {
      const response = await fetch(`http://localhost:5000/api/groups/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        setGroups((prev) => prev.filter((group) => group._id !== id));
        toast.success(`${name} has been deleted.`);
      } else {
        toast.error("Failed to delete group.");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-48 bg-gray-100 min-h-screen">
        <Navbar />
        <div className="fixed top-14 left-48 w-[calc(100%-12rem)] bg-blue-600 shadow-md p-4 flex justify-between items-center z-10">
          <h1 className="text-2xl font-semibold text-white">Groups</h1>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => setShowModal(true)}
          >
            Add Group
          </button>
        </div>

        <div className="mt-32 p-4">
          {groups.length > 0 ? (
            <div className="grid gap-4">
              {groups.map((group) => (
                <div
                  key={group._id}
                  className="bg-white shadow-md rounded-lg p-4 border flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{group.name}</h2>
                    <p className="text-gray-600">Members: {group.members}</p>
                    <p
                      className={`font-semibold ${
                        group.balance < 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      Balance: ₹{group.balance}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteGroup(group._id, group.name)}
                    className="text-red-600"
                  >
                    <MdDeleteOutline size={24} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No groups found.</p>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
              <input
                type="text"
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="number"
                placeholder="Total Members"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="number"
                placeholder="Total Balance"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
              />
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleAddGroup}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Group;
