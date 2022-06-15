import React from 'react'
import { Link } from "react-router-dom"
import './styles.scss'

export default function Logo({ id }) {

  const roleList ={
    3: "Ứng viên",
    1: "Nhà tuyển dụng",
    4: "Cộng tác viên"
  }


  return (
    <Link to="/" className="logo">
        <h1>ITInternshipJob</h1>
        <span>{id ? roleList[id] : ""}</span>
    </Link>
  )
}
