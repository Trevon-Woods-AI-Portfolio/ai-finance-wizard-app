import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

const Watchlist = () => {
  let [watchlistData, setWatchlistData] = useState([]);
  let watchlist = useSelector((state) => state.watchlist);

  console.log("Current Watchlist from Redux: ", watchlist);
  console.log("Watchlist Data State: ", watchlistData);

  useEffect(() => {
    if (watchlist.length > 0) {
      fetchWatchlistData();
    }
  }, [watchlist]);

  async function fetchWatchlistData() {
    try {
      const res = await fetch(`/api/data/watchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tickers: watchlist }),
      });

      const data = await res.json();

      if (data.error) {
        return console.error("Error fetching watchlist data:", data.error);
      }

      console.log("Watchlist Data: ", data);

      setWatchlistData(data.data);
    } catch (error) {
      console.error("Error fetching watchlist data:", error);
    }
  }
  return (
    <div>
      <div className="flex justify-between items-center p-4 border-b border-amber-100">
        <h1 className="text-xl font-bold text-amber-300">🔭 Watchlist</h1>
        <div className="flex gap-3 cursor-pointer">
          <AddIcon />
        </div>
      </div>
      <div>
        {watchlist.length === 0 ? (
          <p className="text-center text-slate-400 p-4">
            Your watchlist is empty. Click the + icon to add stocks to your
            watchlist.
          </p>
        ) : (
          <div className="max-h-[300px] overflow-y-auto">
            {watchlist.map((ticker, index) => {
              console.log("Ticker in watchlist: ", ticker);
              console.log("Ticker in watchlistData: ", watchlistData);
              const stock = watchlistData[index];
              return (
                <div
                  key={ticker}
                  className="flex justify-between items-center p-4 border-b border-amber-100 hover:bg-zinc-800"
                >
                    <p className="font-bold font-sans text-amber-100 w-[25%]">
                      {stock?.symbol || ticker}
                    </p>
                    <p className="font-bold font-sans text-amber-100 w-[25%]">
                      ${stock?.price || "0.00"}
                    </p>
                    <p className="text-sm font-serif text-slate-400 w-[25%]">
                      {stock?.name?.slice(0,8)+"..." || "Loading..."}
                    </p>
                    <p
                      className={`text-sm font-serif ${
                        stock?.change >= 0 ? "text-green-500 w-[25%]" : "text-red-500 w-[25%]"
                      }`}
                    >
                      {stock
                        ? `${
                            stock.change >= 0 ? "+" : ""
                          }${stock.change} (${
                            stock.percentageChange >= 0 ? "+" : ""
                          }${stock.percentageChange}%)`
                        : "Loading..."}
                    </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
