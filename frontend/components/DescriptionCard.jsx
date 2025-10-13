import React from "react";

const DescriptionCard = ({ statistics, symbol }) => {
  console.log("DescriptionCard statistics: ", statistics);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-amber-300 mb-4">{symbol} Description</h2>
      <p className="text-amber-100">{statistics?.data?.Description}</p>
    </div>
  );
};

export default DescriptionCard;
