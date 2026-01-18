import React from 'react'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import Navbar from './components/Navbar'
import { Outlet } from '@tanstack/react-router'

const RootLayout = () => {
  return (
    <>
    <Navbar />
    <Outlet/>
    </>
  )
}

export default RootLayout