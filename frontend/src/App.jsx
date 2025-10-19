import { useState } from 'react'  
import { useSelector } from 'react-redux'
import {Routes, Route, Navigate, BrowserRouter} from 'react-router-dom'
import Landing from '../scenes/Landing'
import Login from '../scenes/Login'
import Signup from '../scenes/Signup'
import Dashboard from '../scenes/Dashboard'

function App() {
  const isAuth = Boolean(useSelector(state => state.user))

  return (
      <div className=''>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/dashboard' element={isAuth === true ? <Dashboard /> : <Navigate to={"/login"} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
