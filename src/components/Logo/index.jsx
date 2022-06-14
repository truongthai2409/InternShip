import React from 'react'
import { Link } from "react-router-dom"
import './styles.scss'

export default function Logo({ id }) {
  const roleList = [
    {
      id: 3,
      name: "Ứng viên"
    },
    {
      id: 1,
      name: "Nhà tuyển dụng"
    },
    {
      id: 4,
      name: "Cộng tác viên"
    }
  ]

  const getRole = (id) => {
    const filter = roleList.filter((role) => role.id === id);
    return filter[0].name
  }


  return (
    <Link to="/" className="logo">
        <h1>ITInternshipJob</h1>
        <span>{id ? getRole(id): ""}</span>
    </Link>
  )
}
