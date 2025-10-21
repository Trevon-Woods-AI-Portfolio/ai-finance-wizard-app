import React from "react";
import Avatar from "@mui/material/Avatar";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../state/state";

const Toolbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const tickerCards = useSelector((state) => state.tickerCards);
  const watchlist = useSelector((state) => state.watchlist);
  const analysisTicker = useSelector((state) => state.analysisTicker);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userData: {
            id: user?.id,
            tickerCards,
            watchlist: watchlist || [],
            analysisTicker: analysisTicker || "",
          },
        }),
      });

      const data = await res.json();
      if (data.error) {
        return console.error("Error during logout:", data.error);
      }
      dispatch(setLogout());
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div className="fixed mt-3 w-[84.5%] h-[8.5%] flex justify-center items-center">
      <div className="flex justify-between items-center border border-black w-[80%] h-[73px] rounded-2xl bg-zinc-900 z-10 shadow-xl opacity-75 p-8">
        <div className="">
          <input
            type="text"
            className=" rounded-md bg-zinc-700 h-[40px] pl-4"
            placeholder="Search"
          />
          <SearchIcon className="relative right-8 bottom-[2px] text-amber-400" />
        </div>
        <div className="flex gap-3 items-center">
          <TuneIcon className="text-amber-400" style={{ fontSize: 25 }} />
          <NotificationsIcon
            className="text-amber-400"
            style={{ fontSize: 25 }}
          />
          <SettingsIcon className="text-amber-400" style={{ fontSize: 25 }} />
          <Avatar
            alt="Profile Image"
            src={"https://avatar.iran.liara.run/public/1"}
            sx={{ width: 45, height: 45 }}
            className="border border-2 border-amber-400"
          />
          <LogoutIcon
            className="text-amber-400 cursor-pointer"
            style={{ fontSize: 25 }}
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
