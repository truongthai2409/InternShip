import React from 'react'
import { Link } from "react-router-dom"
import './logo.scss'

export default function Logo({subtitle}) {
  return (
    <Link to="/" className="logo">
        <h1>ITInternshipJob</h1>
        <span>{subtitle}</span>
    </Link>
  )
}
