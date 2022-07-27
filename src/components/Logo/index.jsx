import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'
import logo from './logo.png'

export default function Logo({ id }) {
  const roleList = {
    3: 'Ứng viên',
    1: 'Nhà tuyển dụng',
    4: 'Cộng tác viên'
  }

  return (
    <Link to="/" className="logo">
      <img style={{width: "300px"}} src={logo} alt="" />
      <span>{id ? roleList[id] : ''}</span>
    </Link>
  )
}
