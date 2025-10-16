import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="w-full p-4 flex justify-between items-center">
        <div className="text-xl sm:text-2xl font-bold text-amber-400">Finance Wizard</div>
        <div className="flex gap-2 sm:gap-4">
          <button className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-xs sm:text-sm lg:text-base bg-zinc-700 text-amber-400 rounded hover:bg-zinc-400 transition">
            Forums
          </button>
          <button className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-xs sm:text-sm lg:text-base bg-zinc-700 text-amber-400 rounded hover:bg-zinc-400 transition">
            API
          </button>
          <button className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-xs sm:text-sm lg:text-base bg-zinc-700 text-amber-400 rounded hover:bg-zinc-400 transition">
            Mentors
          </button>
          <button className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-xs sm:text-sm lg:text-base bg-zinc-700 text-amber-400 rounded hover:bg-zinc-400 transition">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
