import React from "react";
import Toolbar from "./Toolbar";
import MarketWatch from "../scenes/MarketWatch";
import Analysis from "../scenes/Analysis";
import News from "../scenes/News";
import Insights from "../scenes/Insights";

const Grid = ({ changeGrid }) => {
  return (
    <div className="relative border border-black min-h-screen w-[84.5%] overflow-auto">
      <Toolbar />
      {changeGrid === "Overview" && <MarketWatch />}
      {changeGrid === "Analysis" && <Analysis />}
      {changeGrid === "News" && <News />}
      {changeGrid === "Insights" && <Insights />}
    </div>
  );
};

export default Grid;
