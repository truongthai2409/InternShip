import React, {useState} from 'react'
import Button from "../../../components/Button"
import ArrowButton from "../../../components/ArrowButton/ArrowButton"
import ButtonOutline from "../../../components/ButtonOutline/ButtonOutline"

import { useNavigate } from "react-router-dom"

import './register-step-1.scss'

export default function RegisterStep1() {
  const [roleId, setRoleId] = useState();

  const roleList = [
    {
      id: 1,
      name: "ỨNG VIÊN"
    },
    {
      id: 2,
      name: "NHÀ TUYỂN DỤNG"
    },
    {
      id: 3,
      name: "CỘNG TÁC VIÊN TRƯỜNG"
    }
  ]

  const navigate = useNavigate();

  const handleNext = async () => {
    if (roleId) {
      await navigate(`step2/${roleId}`)
    } else {
      alert("Hãy cho mình biết bạn là?...")
    }
  }

  return (
    <div className="register-step1">
      <div className="register-step1__choices">
        {roleList.map((role, i) => 
                <div className="register-step1__choices--btn" key={i} onClick={()=> {setRoleId(role.id)}}>
                  {role.id === roleId ? <ButtonOutline name={role.name} bwidth="285px"/> : <Button name={role.name} bwidth="285px"/>}
                </div>
        )}
      </div>
      <div className="register-step1__btn" onClick={handleNext}>
        <ArrowButton text="Tiếp theo" direction="right"/>
      </div>
    </div>
  )
}
