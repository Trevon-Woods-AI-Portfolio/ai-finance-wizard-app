import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full p-8 flex justify-between items-center fixed z-10">
        <div className="text-xl sm:text-2xl font-bold text-amber-400 cursor-pointer" onClick={() => navigate("/")}>Finance Wizard</div>
        <div className="flex gap-2 sm:gap-4">
          <button className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-xs sm:text-sm lg:text-base text-amber-400 rounded hover:bg-zinc-700 transition z-10">
            Forums
          </button>
          <button className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-xs sm:text-sm lg:text-base text-amber-400 rounded hover:bg-zinc-700 transition z-10">
            API
          </button>
          <button className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-xs sm:text-sm lg:text-base text-amber-400 rounded hover:bg-zinc-700 transition z-10">
            Mentors
          </button>
          <button className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-xs sm:text-sm lg:text-base text-amber-400 rounded hover:bg-zinc-700 transition z-10">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
