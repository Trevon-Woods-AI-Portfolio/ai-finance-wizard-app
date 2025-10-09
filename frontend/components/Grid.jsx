import React from 'react'
import Toolbar from './Toolbar'
import MarketWatch from './MarketWatch'

const Grid = () => {
  return (
    <div className='border border-black min-h-screen w-[84.5%] overflow-auto'>
        <Toolbar />
        <MarketWatch />
    </div>
  )
}

export default Grid