import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
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
import { useDispatch, useSelector } from "react-redux";
import { setAnalysisTicker, setStateWatchlist } from "../state/state";

const Chart = ({
  sampleData,
  chartData,
  symbol,
  setChartData,
  setStatistics,
  statistics,
}) => {
  const timeSeriesData =
    chartData?.data?.time_series || sampleData?.data?.time_series || [];
  const hasData = timeSeriesData.length > 0;
  const [chartType, setChartType] = useState("line");
  const [interval, setInterval] = useState("1day");
  const watchlist = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();

  console.log(chartData);
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
    setInterval(newInterval);
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

      console.log("Chart symbol change: ", newSymbol);
      dispatch(setAnalysisTicker({analysisTicker: newSymbol}));

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

  const Candlestick = (props) => {
    const { x, y, width, height, payload } = props;
    const { open, close, high, low } = payload;

    const isGrowing = close > open;
    const color = isGrowing ? "#10b981" : "#ef4444";

    // Calculate positions relative to the chart scale
    const yScale = height / (high - low);
    const wickTop = 0;
    const wickBottom = height;
    const bodyTop = (high - Math.max(open, close)) * yScale;
    const bodyBottom = (high - Math.min(open, close)) * yScale;
    const bodyHeight = Math.abs(bodyBottom - bodyTop);

    return (
      <g stroke={color} fill={color} strokeWidth="1">
        {/* High/Low wick line */}
        <line
          x1={x + width / 2}
          y1={y + wickTop}
          x2={x + width / 2}
          y2={y + wickBottom}
          stroke={color}
          strokeWidth="1"
        />
        {/* Open/Close body rectangle */}
        <rect
          x={x}
          y={y + bodyTop}
          width={width}
          height={bodyHeight || 1}
          fill={color}
          stroke={color}
        />
      </g>
    );
  };

  const prepareChartData = (data) => {
    const newData = data.map((item) => ({
      ...item,
      date: item.date,
      openClose: [item.open, item.close],
      highLow: [item.low, item.high],
      low: item.low,
      high: item.high,
    }));

    console.log("Pepared ChartData: ", newData);
    return newData;
  };

  const formatXAxisDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="p-6 font-sans">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-amber-300">📊 {symbol}</h1>
          <div
            className="cursor-pointer"
            onClick={() => dispatch(setStateWatchlist({watchlist: [...watchlist, symbol]}))}
          >
            <AddIcon />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType("line")}
            className={`px-2 rounded-xl border border-amber-300 ${
              chartType === "line"
                ? "bg-amber-300 text-zinc-900"
                : "text-amber-300"
            }`}
          >
            Line Chart
          </button>
          <button
            onClick={() => setChartType("candlestick")}
            className={`px-2 rounded-xl border border-amber-300 ${
              chartType === "candlestick"
                ? "bg-amber-300 text-zinc-900"
                : "text-amber-300"
            }`}
          >
            Candlestick
          </button>
        </div>
        <div className="w-[32%] flex gap-3">
          <button
            className={`px-2 py-2 rounded-lg ${
              interval === "15min" ? "bg-amber-100" : "bg-zinc-700"
            } text-amber-100 hover:bg-amber-100 shadow-md ${
              interval === "15min" ? "text-zinc-900" : "text-amber-100"
            } hover:text-zinc-900 hover:shadow-md ${
              interval === "15min" && "shadow-amber-400"
            } hover:shadow-amber-400`}
            onClick={() => handleChangeInterval("15min")}
          >
            15
          </button>
          <button
            className={`px-2 py-2 rounded-lg ${
              interval === "1day" ? "bg-amber-100" : "bg-zinc-700"
            } text-amber-100 hover:bg-amber-100 shadow-md ${
              interval === "1day" ? "text-zinc-900" : "text-amber-100"
            } hover:text-zinc-900 hover:shadow-md ${
              interval === "1day" && "shadow-amber-400"
            } hover:shadow-amber-400`}
            onClick={() => handleChangeInterval("1day")}
          >
            1d
          </button>
          <button
            className={`px-2 py-2 rounded-lg ${
              interval === "1week" ? "bg-amber-100" : "bg-zinc-700"
            } text-amber-100 hover:bg-amber-100 shadow-md ${
              interval === "1week" ? "text-zinc-900" : "text-amber-100"
            } hover:text-zinc-900 hover:shadow-md ${
              interval === "1week" && "shadow-amber-400"
            } hover:shadow-amber-400`}
            onClick={() => handleChangeInterval("1week")}
          >
            W
          </button>
          <button
            className={`px-2 py-2 rounded-lg ${
              interval === "1month" ? "bg-amber-100" : "bg-zinc-700"
            } text-amber-100 hover:bg-amber-100 shadow-md ${
              interval === "1month" ? "text-zinc-900" : "text-amber-100"
            } hover:text-zinc-900 hover:shadow-md ${
              interval === "1month" && "shadow-amber-400"
            } hover:shadow-amber-400`}
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
      {chartType === "candlestick" ? (
        <div className="ml-[-30px]">
          <ResponsiveContainer width="100%" height={340}>
            <ComposedChart
              data={prepareChartData(timeSeriesData)}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              className="z-10"
            >
              <XAxis
                dataKey="date"
                stroke="#FFECB3"
                tick={{ fill: "#FFECB3" }}
                tickFormatter={formatXAxisDate}
                interval="preserveStartEnd"
                angle={-45}
                textAnchor="end"
                height={45}
              />
              <YAxis
                domain={[
                  (dataMin) => Math.floor(dataMin * 0.995 - 5),
                  (dataMax) => Math.ceil(dataMax * 1.005),
                ]}
                stroke="#FFECB3"
                tick={{ fill: "#FFECB3" }}
              />
              <Tooltip
                cursor={{ fill: "rgba(200, 200, 200, 0.2)" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    const change = data.close - data.open;
                    const changePercent = ((change / data.open) * 100).toFixed(
                      2
                    );
                    return (
                      <div className="bg-amber-100 p-3 border border-gray-300 rounded shadow-lg">
                        <p className="text-sm font-semibold">{data.datetime}</p>
                        <p className="text-xs flex gap-1">
                          <p className="text-zinc-900">Open: </p>
                          <span className="font-medium text-amber-400">
                            ${data.open?.toFixed(2)}
                          </span>
                        </p>
                        <p className="text-xs flex gap-1">
                          <p className="text-zinc-900">High:</p>
                          <span className="font-medium text-green-600">
                            ${data.high?.toFixed(2)}
                          </span>
                        </p>
                        <p className="text-xs flex gap-1">
                          <p className="text-zinc-900">Low: </p>
                          <span className="font-medium text-red-600">
                            ${data.low?.toFixed(2)}
                          </span>
                        </p>
                        <p className="text-xs flex gap-1">
                          <p className="text-zinc-900">Close: </p>
                          <span className="font-medium text-amber-400">
                            ${data.close?.toFixed(2)}
                          </span>
                        </p>
                        <p
                          className={`text-xs font-semibold ${
                            change >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          Change: {change >= 0 ? "+" : ""}
                          {change.toFixed(2)} ({change >= 0 ? "+" : ""}
                          {changePercent}%)
                        </p>
                        <p className="text-xs flex gap-1">
                          <p className="text-zinc-900">Volume: </p>
                          <span className="font-medium text-amber-400">
                            {data.volume?.toLocaleString()}
                          </span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="highLow" shape={<Candlestick />} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="relative top-[-120px] right-[-60px]">
            <ResponsiveContainer width="100%" height={75}>
              <ComposedChart
                data={prepareChartData(timeSeriesData)}
                margin={{ top: 0, right: 30, left: 0, bottom: 5 }}
                
              >
                <YAxis
                  orientation="right"
                  stroke="#FFECB3"
                  tick={{ fill: "#FFECB3" }}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                />
                <Tooltip
                  cursor={{ fill: "rgba(200, 200, 200, 0.2)" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-2 border border-gray-300 rounded shadow-lg">
                          <p className="text-xs">
                            Volume:{" "}
                            <span className="font-medium">
                              {data.volume?.toLocaleString()}
                            </span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="volume" className="opacity-50">
                  {prepareChartData(timeSeriesData).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.close > entry.open ? "#10b981" : "#ef4444"}
                    />
                  ))}
                </Bar>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : hasData ? (
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
