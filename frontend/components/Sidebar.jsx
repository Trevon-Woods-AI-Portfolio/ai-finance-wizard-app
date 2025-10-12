import React from "react";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsightsIcon from '@mui/icons-material/Insights';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HelpIcon from '@mui/icons-material/Help';
import ForumIcon from '@mui/icons-material/Forum';

const Sidebar = ({setChangeGrid}) => {
  return (
    <div className="min-h-screen w-[15.5%] bg-zinc-900 border-r border-amber-400 shadow-md shadow-r shadow-amber-400">
      <div className="flex justify-between items-center p-4">
        <Avatar
          alt="Profile Image"
          src={"../assets/finance_app_logo.png"}
          sx={{ width: 65, height: 65 }}
          className="border border-2 border-amber-400"
        />
        <div className="relative left-7 cursor-pointer border border-black text-zinc-900 rounded-xl bg-amber-400 shadow-xl z-10">
          <KeyboardArrowLeftIcon />
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-2 p-4">
        <div className="flex gap-2 items-center cursor-pointer p-2 rounded-lg hover:bg-zinc-700" onClick={() => setChangeGrid("Overview")}>
          <DashboardIcon className="text-amber-400" />
          <p className="text-amber-100 font-semibold">Overview</p>
        </div>
        <div className="flex gap-2 items-center cursor-pointer p-2 rounded-lg hover:bg-zinc-700" onClick={() => setChangeGrid("Analysis")}>
          <InsightsIcon className="text-amber-400" />
          <p className="text-amber-100 font-semibold">Analysis</p>
        </div>
        <div className="flex gap-2 items-center cursor-pointer p-2 rounded-lg hover:bg-zinc-700" onClick={() => setChangeGrid("News")}>
          <NewspaperIcon className="text-amber-400" />
          <p className="text-amber-100 font-semibold">News</p>
        </div>
        <div className="flex gap-2 items-center cursor-pointer p-2 rounded-lg hover:bg-zinc-700 mb-5" onClick={() => setChangeGrid("Insights")}>
          <AutoAwesomeIcon className="text-amber-400" />
          <p className="text-amber-100 font-semibold">Insights</p>
        </div>
        <div className="border-b border-amber-100"></div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex gap-2 items-center cursor-pointer p-2 rounded-lg hover:bg-zinc-700">
          <SupportAgentIcon className="text-amber-400" />
          <p className="text-amber-100 font-semibold">Support</p>
        </div>
        <div className="flex gap-2 items-center cursor-pointer p-2 rounded-lg hover:bg-zinc-700">
          <HelpIcon className="text-amber-400" />
          <p className="text-amber-100 font-semibold">Help Center</p>
        </div>
        <div className="flex gap-2 items-center cursor-pointer p-2 rounded-lg hover:bg-zinc-700">
          <ForumIcon className="text-amber-400" />
          <p className="text-amber-100 font-semibold">Forum</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
