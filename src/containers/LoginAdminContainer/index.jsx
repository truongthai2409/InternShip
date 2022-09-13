import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

import  logo  from "src/assets/img/loginpage.png";
import LoginAdmin from "../../pages/LoginAdmin";
import Button from "../../components/Button/index";
import { Typography } from "@mui/material";

const LoginAdminContainer = () => {
  return (
    <div className="login-admin-container">
      <div className="form-wrapper">
        <div className="login-admin-left">
          <div className="welcome">
            <h1>Xin chào,</h1>
            <h3>Bạn đang đăng nhập với vai trò Admin!</h3>
          </div>
          <div className="img">
            <img src={logo} alt="img" />
          </div>
        </div>
        <div className="login-admin-right">
          <LoginAdmin />
        </div>
      </div>
    </div>
  );
};

export default LoginAdminContainer;
