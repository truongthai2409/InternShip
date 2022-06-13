import React from "react";
import "./styles.scss";
import { useSelector } from "react-redux";

import RegisterStep1 from "../RegisterStep1/index";
import Logo from "../../../components/Logo/index";
import Notification from "../../../components/Notification";

import { Outlet, Link } from "react-router-dom";

export default function RegisterContainer() {
  const { notification } = useSelector((state) => state.user);

  return (
    <div className="register-container">
      <Logo />
      <h1 className="register-container__title">Đăng ký</h1>
      <Outlet />
      <div className="register-container__footer">
        <p>
          Bạn đã có tài khoản? <Link to="/">Đăng nhập</Link>
        </p>
      </div>
      <Notification notifyAlert={notification} />
    </div>
  );
}
