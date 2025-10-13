import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const News = () => {
  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [ticker, setTicker] = useState("");
  const symbol = ticker.toUpperCase() || null;

  async function fetchData(e) {
    setLoading(true);
    try {
      if (e.key === "Enter") {
        const newSymbol = e.target.value.toUpperCase();
        const res = await fetch(`/api/data/news/${newSymbol}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const news = await res.json();

        if (news.error) {
          console.error("Error fetching data:", news.error);
          setNewsData([]);
        } else {
          const dataWithIds = news.data.map((item, index) => ({
            id: item.url || index, // Use URL as unique id, or fallback to index
            ...item,
          }));
          console.log(dataWithIds)
          setNewsData({ data: dataWithIds });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setNewsData([]);
    } finally {
      setLoading(false);
    }
  }

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      headerClassName: "text-amber-100",
      renderCell: (params) => (
        <button className="text-amber-100 hover:text-amber-300 underline cursor-pointer font-semibold">
          {params.value}
        </button>
      ),
    },
    {
      field: "url",
      headerName: "Website",
      flex: 1,
      headerClassName: "text-amber-100",
      renderCell: (params) => (
        <a
          href={params.value}
          className="text-amber-100 hover:text-amber-300 underline cursor-pointer font-semibold pl-5"
        >
          Link
        </a>
      ),
    },
    {
      field: "source",
      headerName: "Source",
      flex: 1,
      headerClassName: "text-amber-100",
    },
    {
      field: "topic",
      headerName: "Topic",
      flex: 1,
      headerClassName: "text-amber-100",
    },
    {
      field: "sentiment_score",
      headerName: "Sentiment Score",
      flex: 1,
      headerClassName: "text-amber-100",
      valueFormatter: (params) => {
        return params.toFixed(2);
      },
      cellClassName: (params) => {
        return params.row.sentiment_score < -0.15
          ? "text-red-400"
          : params.row.sentiment_score > 0.15
          ? "text-green-400"
          : "text-amber-100";
      },
    },
    {
      field: "sentiment_label",
      headerName: "Sentiment Label",
      flex: 1,
      headerClassName: "text-amber-100",
      valueFormatter: (params) => {
        <span className="text-amber-100 font-semibold">{params.value}</span>;
      },
      cellClassName: (params) => {
        return params.row.sentiment_score < -0.15
          ? "text-red-400"
          : params.row.sentiment_score > 0.15
          ? "text-green-400"
          : "text-amber-100";
      },
    },
    {
      field: "time_published",
      headerName: "Published",
      flex: 1,
      headerClassName: "text-amber-100",
      renderCell: (params) => (
        <p className="text-amber-100 font-semibold">
          {`${params.value.slice(4,6)}-${params.value.slice(6,8)}-${params.value.slice(0,4)}`}
        </p>
      ),
    },
  ];
  return (
    <div className="flex flex-col h-[91.5%] items-center gap-8 h-screen">
      <div className="mt-20 grid grid-cols-5 w-[90%] gap-x-10"></div>
      <div className="grid grid-cols-5 w-[90%] gap-x-10">
        <div className="h-[800px] w-full col-span-5 rounded-2xl bg-zinc-900 border border-black shadow-lg p-2">
          <div className="p-4">
            <label className="text-amber-100 font-semibold mr-2">
              {symbol}
            </label>
            <input
              type="text"
              className="bg-zinc-700 w-[80px] rounded-md pl-2"
              onKeyDown={(e) => fetchData(e)}
            />
          </div>
          <Box
            sx={{
              height: "93%",
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
              rows={newsData.data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[10, 25, 50]}
              loading={loading}
              disableSelectionOnClick
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default News;
