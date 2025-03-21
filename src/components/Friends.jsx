import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFriend } from "../redux/slice/friendsSlice";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Friends = () => {
  const friends = useSelector((state) => state.friends.friends);
  const dispatch = useDispatch();

  const handleRemoveFriend = (id, name) => {
    dispatch(removeFriend(id));
    toast.success(`${name} has been removed.`);
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="fixed top-14 left-48 w-[calc(100%-12rem)] bg-yellow-500 shadow-md p-5 flex justify-between items-center z-10">
        <h1 className="text-2xl font-semibold">Friends List</h1>
      </div>

      <div className="mt-28 p-8 bg-white shadow-md rounded-lg border ml-44">
        {friends.length > 0 ? (
          <div className="grid gap-4">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="bg-white shadow-md rounded-lg p-4 border flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{friend.name}</h2>
                  <p className="text-gray-600">Phone: +91 {friend.phone}</p>
                  <p
                    className={`font-bold ${
                      friend.balance < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    Balance: ₹{friend.balance}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveFriend(friend.id, friend.name)}
                  className="text-red-600 "
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
    </div>
  );
};

export default Friends;
