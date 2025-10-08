import React from "react";

const GridContent = () => {
  return (
    <div className="flex flex-col h-[91.5%] items-center">
      <div className="grid grid-cols-3 justify-items-center content-center h-full w-[90%] overflow-auto gap-x-6 gap-y-8 mt-5">
        <div className="border border-black size-72 w-full col-span-2 rounded-xl"></div>
        <div className="border border-black size-72 w-full col-span-1 rounded-xl"></div>
        <div className="border border-black size-72 w-full rounded-xl"></div>
        <div className="border border-black size-72 w-full rounded-xl"></div>
        <div className="border border-black size-72 w-full rounded-xl"></div>
        <div className="border border-black size-72 w-full rounded-xl"></div>
      </div>
    </div>
  );
};

export default GridContent;
