import React, {useState} from 'react'
import Button from "../../../components/Button"

import { useNavigate } from "react-router-dom"

import './register-step-1.scss'

export default function RegisterStep1() {

  const roleList = [
    {
      id: 3,
      name: "ỨNG VIÊN"
    },
    {
      id: 1,
      name: "NHÀ TUYỂN DỤNG"
    },
    {
      id: 4,
      name: "CỘNG TÁC VIÊN TRƯỜNG"
    }
  ]

  const navigate = useNavigate();

  const handleClick = async (id) => {
      await navigate(`step2/${id}`)
  }

  return (
    <div className="register-step1">
      <div className="register-step1__choices">
        {roleList.map((role, i) => 
            <div className="register-step1__choices--btn" key={i} onClick={()=> handleClick(role.id)}>
              {<Button name={role.name} bwidth="285px"/>}
            </div>
        )}
      </div>
    </div>
  )
}
