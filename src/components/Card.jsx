import React from "react";
import { MdDeleteOutline } from "react-icons/md";

const Card = ({ id, groupname, members, balance, removegroup }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">{groupname}</h2>
        <button onClick={() => removegroup(id)}>
          <MdDeleteOutline />
        </button>
      </div>
      <p className="text-gray-600">Members: {members}</p>
      <p className="text-green-600 font-bold">Balance: ₹{balance}</p>
    </div>
  );
};

export default Card;
