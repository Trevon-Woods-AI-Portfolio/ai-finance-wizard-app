import React from 'react'
import Toolbar from './Toolbar'
import GridContent from './GridContent'

const Grid = () => {
  return (
    <div className='border border-black min-h-screen w-[84.5%] overflow-auto'>
        <Toolbar />
        <GridContent />
    </div>
  )
}

export default Grid