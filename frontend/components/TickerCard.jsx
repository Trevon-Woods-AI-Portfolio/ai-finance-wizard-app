import React from "react";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";

const TickerCard = ({ticker, name, logo, price, change}) => {
    const plusminus = change.charAt(0) === '+' ? true : false;
  return (
    <div
      className="h-[175px] w-full col-span-1 rounded-2xl bg-zinc-900 shadow-lg"
      id="ticker-card1"
    >
      <div className="w-full flex justify-between p-6">
        <div className="flex gap-3 items-center">
          <div>
            <Avatar alt="Stock Logo" src={logo} />
          </div>
          <div>
            <p className="font-bold font-sans text-amber-100">{ticker}</p>
            <p className="text-sm font-serif text-slate-400">{name}</p>
          </div>
        </div>
        <div>
          <SearchIcon />
        </div>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <p className="text-xl font-mono font-bold text-amber-100">
          {price}
        </p>
        <p className={plusminus ? "text-xs font-mono text-green-400" : "text-xs font-mono text-rose-400"}>{change}</p>
      </div>
      <div></div>
    </div>
  );
};

export default TickerCard;
