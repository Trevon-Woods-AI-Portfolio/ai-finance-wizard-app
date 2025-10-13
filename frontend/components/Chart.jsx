import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { BarPlot, barElementClasses } from "@mui/x-charts/BarChart";
import { LineHighlightPlot, LinePlot } from "@mui/x-charts/LineChart";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { ChartsAxisHighlight } from "@mui/x-charts/ChartsAxisHighlight";
import { ChartsGrid, chartsGridClasses } from "@mui/x-charts/ChartsGrid";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import AddIcon from "@mui/icons-material/Add";

const Chart = ({
  sampleData,
  chartData,
  symbol,
  setChartData,
  setWatchlist,
  setStatistics,
  statistics,
}) => {
  const timeSeriesData =
    chartData?.data?.time_series || sampleData?.data?.time_series || [];
  const hasData = timeSeriesData.length > 0;

  async function handleChangeInterval(newInterval) {
    const res = await fetch(`/api/data/chartData/${symbol}/${newInterval}`, {
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

  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      const newSymbol = e.target.value.toUpperCase();
      const res = await fetch(`/api/data/chartData/${newSymbol}/1day`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.error) {
        return console.log("Error getting chart data: ", data.error);
      }

      const res2 = await fetch(`/api/data/overview/${newSymbol}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const overviewData = await res2.json();

      if (overviewData.error) {
        return console.log("Error getting overview data: ", overviewData.error);
      }

      setChartData(data);
      setStatistics(overviewData);
    }
  }

  const series = [
    {
      type: "bar",
      yAxisId: "volume",
      label: "Volume",
      color: "lightgray",
      data: hasData ? timeSeriesData.map((day) => day.volume) : [],
      highlightScope: { highlight: "item" },
    },
    {
      type: "line",
      yAxisId: "price",
      color: "#FFCA28",
      label: "Close",
      data: hasData ? timeSeriesData.map((day) => day.close) : [],
      highlightScope: { highlight: "item" },
    },
  ];

  return (
    <div className="p-6 font-sans">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-amber-300">📊 {symbol}</h1>
          <div
            className="cursor-pointer"
            onClick={() => setWatchlist((prev) => [...prev, symbol])}
          >
            <AddIcon />
          </div>
        </div>
        <div className="w-[32%] flex gap-3">
          <button
            className="px-2 py-2 rounded-lg bg-zinc-700 text-amber-100 hover:bg-amber-100 shadow-xl hover:text-zinc-900"
            onClick={() => handleChangeInterval("15min")}
          >
            15
          </button>
          <button
            className="px-2 py-2 rounded-lg bg-zinc-700 text-amber-100 hover:bg-amber-100 shadow-xl hover:text-zinc-900"
            onClick={() => handleChangeInterval("1day")}
          >
            1d
          </button>
          <button
            className="px-[8.5px] py-2 rounded-lg bg-zinc-700 text-amber-100 hover:bg-amber-100 shadow-xl hover:text-zinc-900"
            onClick={() => handleChangeInterval("1week")}
          >
            W
          </button>
          <button
            className="px-[8.5px] py-2 rounded-lg bg-zinc-700 text-amber-100 hover:bg-amber-100 shadow-xl hover:text-zinc-900"
            onClick={() => handleChangeInterval("1month")}
          >
            M
          </button>
          <input
            className="bg-zinc-700 rounded-lg p-2 w-[100%] text-center text-amber-100"
            defaultValue={symbol}
            onKeyDown={(e) => handleKeyDown(e)}
            placeholder="Enter stock symbol..."
          />
        </div>
      </div>

      {hasData ? (
        <Box className="h-[350px] w-full">
          <ChartContainer
            series={series}
            xAxis={[
              {
                id: "date",
                data: timeSeriesData.map((day) => new Date(day.date)),
                scaleType: "band",
                valueFormatter: (value) => value.toLocaleDateString(),
              },
            ]}
            yAxis={[
              { id: "price", scaleType: "linear" },
              {
                id: "volume",
                scaleType: "linear",
                valueFormatter: (value) => `${(value / 1000000).toFixed(1)}M`,
              },
            ]}
            sx={{
              [`& .${barElementClasses.root}`]: {
                opacity: 0.3,
              },
            }}
          >
            <ChartsGrid
              horizontal
              vertical
              sx={{
                [`& .${chartsGridClasses.line}`]: {
                  stroke: "#e0e0e0",
                  strokeDasharray: "1 1",
                  opacity: "10%",
                },
              }}
            />
            <ChartsAxisHighlight x="line" />
            <BarPlot />
            <LinePlot />
            <LineHighlightPlot />
            <ChartsXAxis
              label="Date"
              axisId="date"
              tickLabelInterval={(value, index) => index % 5 === 0}
              tickLabelStyle={{
                fontSize: 2,
                fill: "#FFECB3",
                angle: -45,
                textAnchor: "end",
              }}
              labelStyle={{
                fill: "#FFECB3",
              }}
              sx={{
                [`& .${axisClasses.line}`]: {
                  stroke: "#FFECB3",
                },
              }}
            />
            <ChartsYAxis
              label="Price"
              axisId="price"
              position="left"
              tickLabelStyle={{
                fontSize: 10,
                fill: "FFECB3",
              }}
              labelStyle={{
                fill: "FFECB3",
              }}
              sx={{
                [`& .${axisClasses.line}`]: {
                  stroke: "#FFECB3",
                },
              }}
            />
            <ChartsYAxis
              label="Volume"
              axisId="volume"
              position="right"
              tickLabelStyle={{
                fontSize: 10,
                fill: "FFECB3",
              }}
              labelStyle={{
                fill: "FFECB3",
              }}
              sx={{
                [`& .${axisClasses.line}`]: {
                  stroke: "#FFECB3",
                },
              }}
            />
            <ChartsTooltip />
          </ChartContainer>
        </Box>
      ) : (
        <div className="text-amber-100 text-center">Loading chart data...</div>
      )}
    </div>
  );
};

export default Chart;
