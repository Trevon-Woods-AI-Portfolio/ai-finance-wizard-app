import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const GLCard = ({changeChartData, setWatchlist}) => {
  const [topic, setTopic] = useState("Gainers");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch data when topic changes
  useEffect(() => {
    fetchData(topic);
  }, [topic]);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(`/api/data/gainerslosers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const result = await res.json();

      if (result.error) {
        console.error("Error fetching data:", result.error);
        setData([]);
      } else {
        console.log(result)
        // Add unique id to each row
        const gainersWithIds = result?.data?.top_gainers?.map((item, index) => ({
          id: item.ticker || index,
          ...item,
        }));
        const losersWithIds = result?.data?.top_losers?.map((item, index) => ({
          id: item.ticker || index,
          ...item,
        }));
        setData({gainers: gainersWithIds, losers: losersWithIds});
      }
    } catch (error) {
      console.error("Error:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      field: "ticker",
      headerName: "Symbol",
      flex: 0.8,
      headerClassName: "text-amber-100",
      renderCell: (params) => (
        <button
          className="text-amber-100 hover:text-amber-300 underline cursor-pointer font-semibold"
          onClick={() => changeChartData(params.row.ticker)}
        >
          {params.value}
        </button>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      headerClassName: "text-amber-100",
      valueFormatter: (params) => `$${parseFloat(params).toFixed(2)}`,
    },
    {
      field: "change_amount",
      headerName: "Change",
      flex: 1,
      headerClassName: "text-amber-100",
      valueFormatter: (params) => `$${parseFloat(params).toFixed(2)}`,
      cellClassName: (params) => {
        return params.value >= 0 ? "text-green-400" : "text-red-400";
      },
    },
    {
      field: "change_percentage",
      headerName: "Change %",
      flex: 1,
      headerClassName: "text-amber-100",
      valueFormatter: (params) => `${parseFloat(params).toFixed(2)}%`,
      cellClassName: (params) => {
        return parseFloat(params) >= 0 ? "text-green-400" : "text-red-400";
      },
    },
    {
      field: "volume",
      headerName: "Volume",
      flex: 1.2,
      headerClassName: "text-amber-100",
      valueFormatter: (params) => {
        if (params >= 1000000) {
          return `${(params / 1000000).toFixed(2)}M`;
        } else if (params >= 1000) {
          return `${(params / 1000).toFixed(2)}K`;
        }
        return params.toLocaleString();
      },
    },
    {
        field: "",
      headerName: "",
      flex: .4,
      headerClassName: "text-amber-100",
      renderCell: (params) => (
        <button
          className="w-full text-amber-100 hover:text-amber-300 underline cursor-pointer font-semibold"
          onClick={() => setWatchlist(prev => [...prev, params.row.ticker])}
        >
          <AddIcon />
        </button>
      ),
    }
  ];

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center p-4 border-b border-amber-100">
        <h1 className="text-xl font-bold text-amber-100">
          {topic === "Gainers" ? (
            <p className="flex justify-center items-center gap-4">
              <img src="../assets/upward_trend.png" alt="" className="size-8" />{" "}
              Top {topic}
            </p>
          ) : (
            <p className="flex justify-center items-center gap-4">
              <img
                src="../assets/downward_trend.png"
                alt=""
                className="size-8"
              />
              Top {topic}
            </p>
          )}
        </h1>
        <div className="flex gap-3">
          <button
            className={`border px-3 py-1 rounded-xl transition-colors ${
              topic === "Gainers"
                ? "bg-green-400 text-zinc-900 border-green-400"
                : "border-green-400 text-green-400 hover:bg-green-400 hover:text-zinc-900"
            }`}
            onClick={() => setTopic("Gainers")}
          >
            Gainers
          </button>
          <button
            className={`border px-3 py-1 rounded-xl transition-colors ${
              topic === "Losers"
                ? "bg-red-400 text-zinc-900 border-red-400"
                : "border-red-400 text-red-400 hover:bg-red-400 hover:text-zinc-900"
            }`}
            onClick={() => setTopic("Losers")}
          >
            Losers
          </button>
        </div>
      </div>
      <Box
        sx={{
          height: 375,
          width: "100%",
          padding: 2,
          "& .MuiDataGrid-root": {
            border: "none",
            color: "#FFECB3",
            backgroundColor: "#18181b",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #3f3f46",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#3f3f46 !important",
            borderBottom: "2px solid #FFECB3",
            color: "#FFECB3",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#3f3f46 !important",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#FFECB3",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-filler": {
            backgroundColor: "#3f3f46 !important",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #3f3f46",
            backgroundColor: "#27272a",
            color: "#FFECB3",
          },
          "& .MuiTablePagination-root": {
            color: "#FFECB3",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#3f3f46 !important",
            cursor: "pointer",
          },
        }}
      >
        <DataGrid
          rows={topic === "Gainers" ? data.gainers || [] : data.losers || []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          loading={loading}
          disableSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
        />
      </Box>
    </div>
  );
};

export default GLCard;
