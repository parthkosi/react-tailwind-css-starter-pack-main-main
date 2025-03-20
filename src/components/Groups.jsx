import React, { useState } from "react";
import GroupData from "./GroupData";
import data from "../data";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const Groups = () => {
  const [groupdata, setgroupdata] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [groupname, setGroupname] = useState("");
  const [members, setMembers] = useState("");
  const [balance, setBalance] = useState("");

  function removeGroup(id) {
    const newGroup = groupdata.filter((group) => group.id !== id);
    setgroupdata(newGroup);
    toast.success("Group Deleted");
  }

  function handleNewGroup() {
    if (!groupname || !members || !balance) {
      toast.error("Please fill all fields!");
      return;
    }

    const newGroup = {
      id: Date.now(),
      groupname,
      members: Number(members),
      balance: Number(balance),
    };

    setgroupdata([...groupdata, newGroup]);
    setShowModal(false);
    setGroupname("");
    setMembers("");
    setBalance("");
    toast.success("New Group Created!");
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-100 relative">
      <Navbar />
      <Sidebar />
      {/* Header */}
      <div className="fixed top-14 left-48 w-[calc(100%-12rem)] bg-yellow-500 shadow-md p-4 flex justify-between items-center z-10">
        <h1 className="text-2xl font-semibold">Group List</h1>
        <button
          className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
          onClick={() => setShowModal(true)}
        >
          New Group
        </button>
      </div>

      {/* Group List */}
      <div className="mt-14 p-4">
        <GroupData groupdata={groupdata} removegroup={removeGroup} />
      </div>

      {/* New Group Form Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              value={groupname}
              onChange={(e) => setGroupname(e.target.value)}
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
                onClick={handleNewGroup}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;
