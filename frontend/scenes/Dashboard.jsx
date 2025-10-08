import React from 'react'
import Sidebar from '../components/Sidebar'
import Grid from '../components/Grid'

const Dashboard = () => {
  return (
    <div className='flex border border-black min-h-screen'>
        <Sidebar />
        <Grid />
    </div>
  )
}

export default Dashboard