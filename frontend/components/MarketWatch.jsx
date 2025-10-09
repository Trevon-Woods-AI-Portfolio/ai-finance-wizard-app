import React from 'react'

const MarketWatch = () => {
  return (
    <div className="flex flex-col h-[91.5%] items-center gap-2">
      <div className="grid grid-cols-5 h-[233px] w-[90%] overflow-auto gap-x-6 mt-5 border border-red-200">
        <div className="border border-black h-[175px] w-full col-span-1 rounded-xl"></div>
        <div className="border border-black h-[175px] w-full col-span-1 rounded-xl"></div>
        <div className="border border-black h-[175px] w-full col-span-1 rounded-xl"></div>
        <div className="border border-black h-[175px] w-full col-span-1 rounded-xl"></div>
        <div className="border border-black h-[175px] w-full col-span-1 rounded-xl"></div>
      </div>
      <div className="grid grid-cols-5 h-full w-[90%] overflow-auto border border-black">
        <div className="border border-black size-72 w-full rounded-xl"></div>
      </div>
    </div>
  )
}

export default MarketWatch