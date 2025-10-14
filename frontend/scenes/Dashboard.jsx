import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Grid from '../components/Grid'

const Dashboard = () => {
  const [changeGrid, setChangeGrid] = useState("Overview");
  return (
    <div className='flex border border-black min-h-screen min-w-screen bg-[#44444E]'>
        <Sidebar setChangeGrid={setChangeGrid} changeGrid={changeGrid}/>
        <Grid changeGrid={changeGrid} />
    </div>
  )
}

export default Dashboard