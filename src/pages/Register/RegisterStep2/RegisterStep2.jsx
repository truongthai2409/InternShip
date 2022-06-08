import React, {useEffect} from 'react'
import './register-step2.scss'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Link, useParams } from "react-router-dom"

import ArrowButton from "../../../components/ArrowButton/ArrowButton"
import Button from '../../../components/Button/index'
import CustomInput from "../../../components/CustomInput"

const schema = yup.object({
  username: yup.string().required("Bạn phải nhập tài khoản").matches(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/,  "Vui lòng nhập lại tài khoản"),
  email: yup.string().required("Bạn phải nhập email").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Vui lòng nhập lại email"),
  password: yup.string().required("Bạn phải nhập password").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Vui lòng nhập lại mật khẩu"),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu chưa đúng')
}).required()

export default function RegisterStep2(props) {
  let { roleId } = useParams()

  const { register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)})

  return (
    <div>
    RegisterStep2

    <div className="register-step2__btns">
      <Link to='/register' className="register-step2__btns--back">
        <ArrowButton text="Trở lại" direction="left"/>
      </Link>
      <div className="register-step2__btns--submit">
        <Button name="ĐĂNG KÝ"/>
      </div>
    </div>
    </div>
  )
}
