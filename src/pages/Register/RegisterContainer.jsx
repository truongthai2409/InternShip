import React from 'react'
import './register-container.scss'

import RegisterStep1 from "./RegisterStep1/RegisterStep1"
import Logo from '../../components/Logo/Logo'

import { Outlet, Link } from "react-router-dom"

export default function RegisterContainer() {
  return (
      <div className="register-container">
        <Logo/>
        <h1 className="register-container__title">Đăng ký</h1>
        <Outlet/>
        <div className="register-container__footer">
          <p>Bạn đã có tài khoản? <Link to='/'>Đăng nhập</Link></p>
        </div>
      </div>
  )
}
