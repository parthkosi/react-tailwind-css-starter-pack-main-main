import React, { useState } from "react";
import GroupData from "./GroupData";
import data from "../data";

const Groups = () => {
  const [groupdata, setgroupdata] = useState(data);

  function removeGroup(id) {
    const newGroup = groupdata.filter((group) => group.id !== id);
    setgroupdata(newGroup);
  }

  return (
    <div className="w-full flex flex-col bg-gray-100">
      <div className="fixed top-14 left-48 w-[calc(100%-12rem)] bg-yellow-500 shadow-md p-4 flex justify-between items-center z-10">
        <h1 className="text-2xl font-semibold">Group List</h1>
        <button className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600">
          New Group
        </button>
      </div>
      <div className="mt-14 p-4">
        <GroupData groupdata={groupdata} removegroup={removeGroup} />
      </div>
      <div className="flex justify-center p-4">
        <button
          className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
          onClick={() => setgroupdata(data)}
        >
          undo
        </button>
      </div>
    </div>
  );
};

export default Groups;
