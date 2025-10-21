import React, { use, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import {
  setTickerCard1,
  setTickerCard2,
  setTickerCard3,
  setTickerCard4,
  setTickerCard5,
} from "../state/state";
import { useDispatch, useSelector } from "react-redux";

const TickerCard = ({
  index,
  ticker,
  name,
  logo,
  price,
  change,
  percentageChange,
}) => {
  const [search, setSearch] = useState(false);
  const [newTicker, setNewTicker] = useState("");
  const [data, setData] = useState({});
  const tickers = Object.entries(useSelector((state) => state.tickerCards));
  const [savedTicker, setSavedTicker] = useState(
    tickers[index - 1] ? tickers[index - 1][1] : null
  );
  const plusminus = change.charAt(0) === "+" ? true : false;
  const dispatch = useDispatch();

  useEffect(() => {
    if (savedTicker !== "") {
      getData(savedTicker, index);
    }
  }, []);

  const getData = async (newTicker) => {
    const res = await fetch(`/api/data/quoteData/${newTicker}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const quote = await res.json();

    if (quote.error) {
      return console.log("Error getting quote: ", quote.error);
    }

    setData(quote.data);
    console.log(quote.data);

    switch (index) {
      case 1:
        dispatch(setTickerCard1({ tickerCard1: newTicker }));
        break;
      case 2:
        dispatch(setTickerCard2({ tickerCard2: newTicker }));
        break;
      case 3:
        dispatch(setTickerCard3({ tickerCard3: newTicker }));
        break;
      case 4:
        dispatch(setTickerCard4({ tickerCard4: newTicker }));
        break;
      case 5:
        dispatch(setTickerCard5({ tickerCard5: newTicker }));
        break;
      default:
        break;
    }

    setSearch(false);
  };

  return (
    <div
      className="h-[175px] w-full col-span-1 rounded-2xl bg-zinc-900 border border-black shadow-lg p-3"
      id="ticker-card1"
    >
      <div className="w-full h-[50%] flex justify-between p-6 gap-8">
        <div className="flex gap-3 items-center">
          <div className="border border-amber-300 border-2 rounded-full">
            <Avatar alt="Stock Logo" src={data.logo || logo} />
          </div>
          <div>
            <p className="font-bold font-sans text-amber-300">
              {data.symbol || ticker}
            </p>
            <p className="text-sm font-serif text-slate-400">
              {data.name ? data.name.slice(0, 8) : name}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {search === true ? (
            <input
              type="text"
              className="w-[60px] bg-zinc-700 rounded-lg pl-2"
              onChange={(e) => setNewTicker(e.target.value)}
            />
          ) : (
            <div onClick={() => setSearch(true)} className="cursor-pointer">
              <SearchIcon />
            </div>
          )}
          {search === true && (
            <div className="relative top-0 right-2 cursor-pointer">
              <div className="flex flex-col justify-center items-center gap-1">
                <div onClick={() => setSearch(false)} className="text-red-500">
                  <CloseIcon sx={{ width: 21, height: 21 }} />
                </div>
                <div
                  onClick={() => getData(newTicker)}
                  className="text-green-500"
                >
                  <CheckIcon sx={{ width: 21, height: 21 }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-[50%] flex justify-evenly items-center gap-6 p-4">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-mono font-bold text-amber-100">
            {data.price || price}
          </p>
          <p
            className={
              plusminus
                ? "text-xs font-mono text-green-400"
                : "text-xs font-mono text-rose-400"
            }
          >
            {`${data.change || change} (${
              data.percentageChange || percentageChange
            })`}
          </p>
        </div>
        <div>
          <img
            src={
              plusminus
                ? "../assets/upward_trend.png"
                : "../assets/downward_trend.png"
            }
            alt=""
            className="size-14"
          />
        </div>
      </div>
    </div>
  );
};

export default TickerCard;
