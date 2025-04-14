import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { MdDeleteOutline } from "react-icons/md";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [balance, setBalance] = useState("");
  
  const fetchFriends = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/friends");
      const data = await response.json();
      setFriends(data);
    } catch (error) {
      console.error("Error fetching friends:", error);
      toast.error("Failed to fetch friends.");
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  // Handle new friend addition
  const handleAddFriend = async () => {
    if (!name || !phone || !balance) {
      toast.error("Please fill all fields!");
      return;
    }

    const newFriend = {
      name,
      phone: Number(phone),
      balance: Number(balance),
    };

    try {
      const response = await fetch("http://localhost:5000/api/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFriend),
      });

      if (response.ok) {
        toast.success("New Friend Added!");
        fetchFriends(); // Refresh the list after adding a new friend
        setShowModal(false);
        setName("");
        setPhone("");
        setBalance("");
      } else {
        toast.error("Failed to add friend.");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Handle friend removal
  const handleRemoveFriend = async (id, name) => {
    try {
      const response = await fetch(`http://localhost:5000/api/friends/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFriends((prev) => prev.filter((friend) => friend._id !== id));
        toast.success(`${name} has been removed.`);
      } else {
        toast.error("Failed to remove friend.");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 ml-48 bg-gray-100">
        <Navbar />
        
        {/* Header */}
        <div className="fixed top-14 left-48 w-[calc(100%-12rem)] bg-yellow-500 shadow-md p-4 flex justify-between items-center z-10">
          <h1 className="text-2xl font-semibold">Friends List</h1>
          <button
            className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
            onClick={() => setShowModal(true)}
          >
            New Friend
          </button>
        </div>

        {/* Friend List */}
        <div className="mt-32 p-4">
          {friends.length > 0 ? (
            <div className="grid gap-4">
              {friends.map((friend) => (
                <div
                  key={friend._id}
                  className="bg-white shadow-md rounded-lg p-4 border flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{friend.name}</h2>
                    <p className="text-gray-600">Phone: +91{friend.phone}</p>
                    <p
                      className={`font-bold ${
                        friend.balance < 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      Balance: ₹{friend.balance}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveFriend(friend._id, friend.name)}
                    className="text-red-600"
                  >
                    <MdDeleteOutline size={24} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No friends found.</p>
          )}
        </div>

        {/* New Friend Form Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h2 className="text-xl font-semibold mb-4">Create New Friend</h2>
              <input
                type="text"
                placeholder="Friend's Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="number"
                placeholder="Balance"
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
                  onClick={handleAddFriend}
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

export default Friends;
