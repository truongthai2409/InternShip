import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './styles.scss'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="main__layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
