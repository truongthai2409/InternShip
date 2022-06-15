import React, { useEffect } from "react";
import "./styles.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {errorSelector, statusSelector} from '../../../store/selectors/registerSelectors'

import { useParams, useNavigate } from "react-router-dom";

import ArrowButton from "../../../components/ArrowButton/index";
import CustomInput from "../../../components/CustomInput";
import { checkUser } from '../../../store/slices/register/registerSlice'

import { schema } from "./data";

export default function RegisterStep2() {
  let { roleId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const registerStatus = useSelector(statusSelector)
  const errorMessage = useSelector(errorSelector)
  
  if (registerStatus === "success step 2") {
    navigate("/register/step3")
  } 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const userRegister = {
      username: data.username,
      password: data.password,
      confirmPassword: data.passwordConfirmation,
      role: {
        id: parseInt(roleId)
      },
      email: data.email,
    }
    console.log(userRegister);  

    dispatch(checkUser(userRegister));
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="register-step2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="register-step2__form"
      >
        <CustomInput
          label="Tài khoản"
          id="username"
          type="text"
          placeholder="Tài khoản..."
          register={register}
        >
          {errors.username?.message}
          {errorMessage?.Username}
        </CustomInput>
        <CustomInput
          label="Email"
          id="email"
          type="email"
          placeholder="Email..."
          register={register}
        >
          {errors.email?.message}
          {errorMessage?.Email}
        </CustomInput>
        <CustomInput
          label="Mật khẩu"
          id="password"
          type="password"
          placeholder="Mật khẩu"
          register={register}
        >
          {errors.password?.message}
          {errorMessage?.Password}
        </CustomInput>

        <CustomInput
          label="Xác nhận mật khẩu"
          id="passwordConfirmation"
          type="password"
          placeholder="Xác nhận mật khẩu"
          register={register}
        >
          {errors.passwordConfirmation?.message}
        </CustomInput>

        <div className="register-step2__btns">
          <div className="register-step2__btns--item" onClick={handleBackClick}>
            <ArrowButton text="Trở lại" direction="left" />
          </div>
          <div className="register-step2__btns--item">
            <ArrowButton text="Tiếp theo" direction="right" onClick={handleSubmit(onSubmit)} />
          </div>
        </div>
      </form>
    </div>
  );
}
