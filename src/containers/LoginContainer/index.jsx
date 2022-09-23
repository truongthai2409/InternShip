import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

import Logo from "../../components/Logo";
import Login from "../../pages/Login";
import Button from "../../components/Button/index";
import { Typography } from "@mui/material";

const LoginContainer = () => {
  return (
    <div className="login-container">
      <h1 className="login-container__title">Đăng nhập</h1>
      <Login />
      <div className="register-container__footer">
        <Link to="/forgot-password">Quên mật khẩu?</Link>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: 17,
            fontWeight: "400",
            transform: "translate(5px,5px)",
          }}
        >
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </Typography>
      </div>
    </div>
  );
};

export default LoginContainer;
