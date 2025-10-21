import React, { useEffect, useState } from "react";
import Chart from "../components/Chart";
import DescriptionCard from "../components/DescriptionCard";
import StatisticsCard from "../components/StatisticsCard";
import { useSelector } from "react-redux";

const Analysis = () => {
  const [sampleData, setSampleData] = useState({});
  const [chartData, setChartData] = useState({});
  const [statistics, setStatistics] = useState({});
  const symbol = chartData?.data?.name || sampleData?.data?.name || null;
  let currentSymbol = useSelector((state) => state.analysisTicker);
  console.log("Saved symbol in Analysis: ", currentSymbol);

  useEffect(() => {
    const isChartData = Object.keys(chartData).length === 0;

    if (isChartData) {
      getSampleData();
    }
  }, []);

  async function getSampleData() {
    try {
      const res = await fetch(`api/data/chartData/${currentSymbol || "AAPL"}/1day`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.error)
        return console.error("Error fetching sample data:", data.error);

      const res2 = await fetch(`/api/data/overview/${currentSymbol || "AAPL"}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const overviewData = await res2.json();

      if (overviewData.error) {
        return console.log("Error getting overview data: ", overviewData.error);
      }

      setSampleData(data);
      setStatistics(overviewData);

      console.log("Sample Data: ", data);
    } catch (error) {
      console.error("Error fetching sample data:", error);
    }
  }
  return (
    <div className="flex flex-col h-[91.5%] items-center gap-8 h-screen">
      <div className="mt-32 grid grid-cols-5 w-[90%] gap-x-10">
        <div className="h-[450px] w-full col-span-3 rounded-2xl bg-zinc-900 border border-black shadow-lg">
          <Chart
            chartData={
              Object.keys(chartData).length === 0 ? sampleData : chartData
            }
            symbol={symbol}
            setChartData={setChartData}
            setStatistics={setStatistics}
            statistics={statistics}
          />
        </div>
        <div className="h-[450px] w-full col-span-2 rounded-2xl bg-zinc-900 border border-black shadow-lg">
            <DescriptionCard symbol={symbol} statistics={statistics} />
        </div>
      </div>
      <div className="grid grid-cols-5 w-[90%] gap-x-10">
        <div className="h-[450px] w-full col-span-5 rounded-2xl bg-zinc-900 border border-black shadow-lg">
            <StatisticsCard statistics={statistics} />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
