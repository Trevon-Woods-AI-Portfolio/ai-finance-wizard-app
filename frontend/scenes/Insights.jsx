import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { set } from "mongoose";

const Insights = () => {
  const [insightsData, setInsightsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [ticker, setTicker] = useState("");
  const [openPositive, setOpenPositive] = useState(false);
  const [openNegative, setOpenNegative] = useState(false);
  const [openSummary, setOpenSummary] = useState(false);
  const symbol = ticker.toUpperCase() || "Stock";

  async function fetchData(e) {
    setLoading(true);
    try {
      if (e.key === "Enter") {
        const newSymbol = e.target.value.toUpperCase();
        const res = await fetch(`/api/data/insights/${newSymbol}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const insights = await res.json();

        if (insights.error) {
          console.error("Error fetching data:", insights.error);
          setInsightsData([]);
        } else {
          console.log("Insights: ", insights);
          setTicker(newSymbol);
          setInsightsData(insights);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setInsightsData([]);
    } finally {
      setLoading(false);
    }
  }

  async function isPositive() {
    setOpenPositive(true);
    setOpenNegative(false);
    setOpenSummary(false);
  }
  async function isNegative() {
    setOpenNegative(true);
    setOpenPositive(false);
    setOpenSummary(false);
  }
  async function isSummary() {
    setOpenSummary(true);
    setOpenPositive(false);
    setOpenNegative(false);
  }

  return (
    <div className="flex flex-col h-[91.5%] items-center gap-8 h-screen">
      <div className="mt-20 grid grid-cols-5 w-[90%] gap-x-10"></div>
      <div className="grid grid-cols-5 w-[90%] gap-x-10">
        <div className="h-[800px] w-full col-span-5 rounded-2xl bg-zinc-900 border border-black shadow-lg p-4">
          <div className="flex p-4 gap-4">
            <input
              type="text"
              className="bg-zinc-700 w-[80px] rounded-md pl-2"
              onKeyDown={(e) => fetchData(e)}
            />
            <label className="text-amber-300 font-semibold mr-2">
              {`${symbol} Insights`}
            </label>
          </div>
          <div className="bg-zinc-700 h-[710px] w-full rounded-md">
            {Object.entries(insightsData).length > 0 && (
              <List
                sx={{
                  bgcolor: "rgb(63, 63, 70)",
                  height: "100%",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={() => isSummary()}>
                  <ListItemIcon>
                    <SummarizeIcon className="text-amber-400"/>
                  </ListItemIcon>
                  <ListItemText primary="Summary" className="text-amber-400" />
                  {openSummary === "Summary" ? <ExpandLess className="text-zinc-900"/> : <ExpandMore className="text-zinc-900"/>}
                </ListItemButton>
                <Collapse in={openSummary} timeout="auto" unmountOnExit>
                  <div className="flex flex-col gap-2 bg-amber-100 overflow-auto p-4 text-zinc-900">
                    {insightsData?.data?.[0].summary}
                  </div>
                </Collapse>
                <ListItemButton onClick={() => isPositive()}>
                  <ListItemIcon>
                    <ThumbUpAltIcon className="text-green-600"/>
                  </ListItemIcon>
                  <ListItemText primary="Positive Insights" className="text-green-600" />
                  {openPositive ? <ExpandLess className="text-zinc-900"/> : <ExpandMore className="text-zinc-900"/>}
                </ListItemButton>
                <Collapse in={openPositive} timeout="auto" unmountOnExit>
                  <div className="flex flex-col gap-2 bg-amber-100 overflow-auto p-4 text-zinc-900">
                    {insightsData?.data?.[0].positive.map((s, i) => (
                      <p key={i}>{`${i+1}. ${s}`}</p>
                    ))}
                  </div>
                </Collapse>
                <ListItemButton onClick={() => isNegative()}>
                  <ListItemIcon>
                    <ThumbDownAltIcon className="text-red-600"/>
                  </ListItemIcon>
                  <ListItemText primary="Negative Insights" className="text-red-600" />
                  {openNegative ? <ExpandLess className="text-zinc-900" /> : <ExpandMore className="text-zinc-900"/>}
                </ListItemButton>
                <Collapse in={openNegative} timeout="auto" unmountOnExit>
                  <div className="flex flex-col gap-2 bg-amber-100 overflow-auto p-4 text-zinc-900">
                    {insightsData?.data?.[0].negative.map((s, i) => (
                      <p key={i}>{`${i+1}. ${s}`}</p>
                    ))}
                  </div>
                </Collapse>
                
              </List>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
