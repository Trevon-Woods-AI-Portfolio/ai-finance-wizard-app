import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Grid from '../components/Grid'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const [changeGrid, setChangeGrid] = useState(useSelector((state) => state.currentPage));
  return (
    <div className='flex border border-black min-h-screen min-w-screen bg-[#44444E]'>
        <Sidebar setChangeGrid={setChangeGrid} changeGrid={changeGrid}/>
        <Grid changeGrid={changeGrid} />
    </div>
  )
}

export default Dashboard