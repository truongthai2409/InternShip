import React, {useEffect} from 'react'
import './register-step2.scss'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";

import { Link, useParams } from "react-router-dom"

import ArrowButton from "../../../components/ArrowButton/ArrowButton"
import Button from '../../../components/Button/index'
import CustomInput from "../../../components/CustomInput"

const schema = yup.object({
  username: yup.string().required("Bạn phải nhập tài khoản"),
  email: yup
      .string(" Email không hợp lệ.")
      .required(" Bạn phải nhập email công ty."),
  // email: yup.string().required("Bạn phải nhập email").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Vui lòng nhập lại email"),
  password: yup.string().required("Bạn phải nhập password").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Vui lòng nhập lại mật khẩu"),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu chưa đúng')
}).required()

export default function RegisterStep2(props) {
  let { roleId } = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      <CustomInput
        label="Tài khoản"
        id="username"
        type="text"
        placeholder="Tài khoản..."
        register={register}
      >
        {errors.username?.message}
      </CustomInput>
      <CustomInput
        label="Email"
        id="email"
        type="email"
        placeholder="Email..."
        register={register}
      >
        {errors.email?.message}
      </CustomInput>
      <CustomInput
        label="Mật khẩu"
        id="password"
        type="password"
        placeholder=""
        register={register}
      >
        {errors.password?.message}
      </CustomInput>

      <CustomInput
        label="Xác nhận mật khẩu"
        id="passwordConfirmation"
        type="password"
        placeholder=""
        register={register}
      >
        {errors.passwordConfirmation?.message}
      </CustomInput>

      <div className="register-step2__btns">
        <Link to='/register' className="register-step2__btns--back">
          <ArrowButton text="Trở lại" direction="left"/>
        </Link>
        <button type="submit" className="register-step2__btns--submit">
          {/* <Button name="ĐĂNG KÝ"/> */}
          Dang ky
        </button>
      </div>
    </form>
  )
}
