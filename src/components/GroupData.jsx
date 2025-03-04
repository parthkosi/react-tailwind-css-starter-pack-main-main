import React from "react";
import Card from "./Card";

const GroupData = ({ groupdata, removegroup }) => {
  return (
    <div className="p-4 grid gap-4">
      {groupdata.map((group) => (
        <Card key={group.id} {...group} removegroup={removegroup} />
      ))}
    </div>
  );
};

export default GroupData;
