import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from 'src/layout/Navbar'

const Home = () => {
  return (
    <>
     <Navbar/>
     <Outlet/>
    </>
  )
}

export default Home