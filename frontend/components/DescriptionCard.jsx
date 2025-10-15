import React from "react";
import TextType from "../utils/TextType.jsx";

const DescriptionCard = ({ statistics, symbol }) => {
  console.log("DescriptionCard statistics: ", statistics);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-amber-300 mb-4">
        {symbol} Description
      </h2>
      <TextType
        text={statistics?.data?.Description}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="|"
      />
    </div>
  );
};

export default DescriptionCard;
