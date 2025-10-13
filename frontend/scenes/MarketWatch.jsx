import React, { useState, useEffect } from "react";
import TickerCard from "../components/TickerCard";
import Chart from "../components/Chart";
import GLCard from "../components/GLCard";
import Watchlist from "../components/Watchlist";

const MarketWatch = () => {
  const [sampleData, setSampleData] = useState({});
  const [chartData, setChartData] = useState({});
  const [watchlist, setWatchlist] = useState([]);
  const symbol = chartData?.data?.name || sampleData?.data?.name || "AAPL";

  useEffect(() => {
    const isChartData = Object.keys(chartData).length === 0;

    if (isChartData) {
      getSampleData();
    }
  }, []);

  async function getSampleData() {
    try {
      const res = await fetch("api/data/chartData/AAPL/1day", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.error)
        return console.error("Error fetching sample data:", data.error);

      setSampleData(data);

      console.log("Sample Data: ", data);
    } catch (error) {
      console.error("Error fetching sample data:", error);
    }
  }

  async function changeChartData(newTicker) {
    const res = await fetch(`/api/data/chartData/${newTicker}/1day`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.error) {
      return console.log("Error getting chart data: ", data.error);
    }
    setChartData(data);
  }
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
        <div className="h-[450px] w-full col-span-3 rounded-2xl bg-zinc-900 border border-black shadow-lg">
          <Chart
            chartData={
              Object.keys(chartData).length === 0 ? sampleData : chartData
            }
            symbol={symbol}
            setChartData={setChartData}
            setWatchlist={setWatchlist}
          />
        </div>
        <div className="h-[450px] w-full col-span-2 rounded-2xl bg-zinc-900 border border-black shadow-lg">
          <Watchlist watchlist={watchlist} />
        </div>
      </div>
      <div className="grid grid-cols-5 w-[90%] gap-x-10">
        <div className="h-[450px] w-full col-span-5 rounded-2xl bg-zinc-900 border border-black shadow-lg">
          <GLCard
            changeChartData={changeChartData}
            setWatchlist={setWatchlist}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketWatch;
