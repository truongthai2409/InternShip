import React, { Fragment, useEffect, useState } from "react";
import "./styles.scss";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import CustomInput from "src/components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { schema } from "./validateForm.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { forgotPassword } from "src/store/slices/Admin/user/userSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(forgotPassword(data.email));
    navigate(-1);
  };

  return (
    <Fragment>
      <Header />
      <div className="forgotpassword__wrapper">
        <div className="forgotpassword__modal">
          <h2>
            <strong>Quên mật khẩu</strong>
          </h2>
          <p>Xin vui lòng nhập địa chỉ email để lấy lại mật khẩu.</p>
          <form action="">
            <CustomInput
              label="Nhập email"
              id="email"
              name="email"
              type="email"
              placeholder="Vui lòng nhập email..."
              register={register}
              requirementField={true}
            >
              {errors.email?.message}
            </CustomInput>
            <button
              onClick={handleSubmit(onSubmit)}
              className="forgotpassword__modal-btn"
            >
              Lấy lại mật khẩu
            </button>
          </form>
          <Link to="/" className="forgotpassword__modal-link">
            Quay về trang đăng nhập
          </Link>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ForgotPassword;
