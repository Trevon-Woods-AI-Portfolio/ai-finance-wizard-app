import React from "react";

const MarketWatch = () => {
  return (
    <div className="flex flex-col h-[91.5%] items-center gap-8 h-screen">
      <div className="mt-24"></div>
      <div className="grid grid-cols-5 h-[175px] w-[90%] gap-x-10">
        <div className="h-[175px] w-full col-span-1 rounded-2xl bg-zinc-900 shadow-lg">Nasdaq</div>
        <div className="h-[175px] w-full col-span-1 rounded-2xl bg-zinc-900 shadow-lg">SPY</div>
        <div className="h-[175px] w-full col-span-1 rounded-2xl bg-zinc-900 shadow-lg">DOW</div>
        <div className="h-[175px] w-full col-span-1 rounded-2xl bg-zinc-900 shadow-lg">Apple</div>
        <div className="h-[175px] w-full col-span-1 rounded-2xl bg-zinc-900 shadow-lg">Microsoft</div>
      </div>
      <div className="grid grid-cols-5 w-[90%] gap-x-10">
        <div className="h-[450px] w-full col-span-3 rounded-2xl bg-zinc-900 shadow-lg">Chart</div>
        <div className="h-[450px] w-full col-span-2 rounded-2xl bg-zinc-900 shadow-lg">Chart Metrics</div>
      </div>
      <div className="grid grid-cols-5 w-[90%] gap-x-10">
        <div className="h-[450px] w-full col-span-5 rounded-2xl bg-zinc-900 shadow-lg">Watchlist</div>
      </div>
    </div>
  );
};

export default MarketWatch;
