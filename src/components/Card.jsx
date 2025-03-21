import React from "react";
import { MdDeleteOutline } from "react-icons/md";

const Card = ({ id, groupname, members, balance, removegroup }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border ml-44">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">{groupname}</h2>
        <button
          onClick={() => removegroup(id, groupname)}
          className="text-red-600 hover:text-red-800"
        >
          <MdDeleteOutline size={24} />
        </button>
      </div>
      <p className="text-gray-600">Members: {members}</p>
      <p className="text-green-600 font-bold">Balance: ₹{balance}</p>
    </div>
  );
};

export default Card;
