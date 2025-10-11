import React from "react";
import TickerCard from "./TickerCard";

const MarketWatch = () => {
  return (
    <div className="flex flex-col h-[91.5%] items-center gap-8 h-screen">
      <div className="mt-24"></div>
      <div className="grid grid-cols-5 h-[175px] w-[90%] gap-x-10">
        <TickerCard
          ticker={"NDAQ"}
          name={"Nasdaq"}
          logo={"../assets/nasdaq_logo.jpeg"}
          price={"9,876.54"}
          change={"-123.45"}
          percentageChange={"-1.23%"}
        />
        <TickerCard
          ticker={"SPY"}
          name={"Spider"}
          logo={"../assets/spy_logo.jpeg"}
          price={"4,567.89"}
          change={"+45.67"}
          percentageChange={"+1.01%"}
        />
        <TickerCard
          ticker={"DOW"}
          name={"Dow Jones"}
          logo={"../assets/dow_logo.jpeg"}
          price={"34,567.89"}
          change={"+234.56"}
          percentageChange={"+0.68%"}
        />
        <TickerCard
          ticker={"AAPL"}
          name={"Apple, Inc."}
          logo={"../assets/apple_logo.jpeg"}
          price={"145.09"}
          change={"+1.23"}
          percentageChange={"+0.85%"}
        />
        <TickerCard
          ticker={"MFST"}
          name={"Microsoft"}
          logo={"../assets/microsoft_logo.jpeg"}
          price={"299.35"}
          change={"-2.45"}
          percentageChange={"-0.81%"}
        />
      </div>
      <div className="grid grid-cols-5 w-[90%] gap-x-10">
        <div className="h-[450px] w-full col-span-3 rounded-2xl bg-zinc-900 shadow-lg">
          Chart
        </div>
        <div className="h-[450px] w-full col-span-2 rounded-2xl bg-zinc-900 shadow-lg">
          Chart Metrics
        </div>
      </div>
      <div className="grid grid-cols-5 w-[90%] gap-x-10">
        <div className="h-[450px] w-full col-span-5 rounded-2xl bg-zinc-900 shadow-lg">
          Watchlist
        </div>
      </div>
    </div>
  );
};

export default MarketWatch;
