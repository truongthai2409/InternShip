import React from "react";
import "./styles.scss";
import { useSelector } from "react-redux";

import Notification from "../../components/shared/Notification";

import { Link, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

export default function RegisterContainer({ Outlet }) {
  const notification = useSelector((state) => state.notification);
  const location = useLocation();

  let title;
  switch (location.pathname) {
    case "/register/hr":
      title = "Đăng ký tài khoản Nhà tuyển dụng";
      break;
    case "/register/partner":
      title = "Đăng ký tài khoản Cộng tác viên trường";
      break;
    case "/register/candidate":
      title = "Đăng ký tài khoản Ứng viên";
      break;
    default:
      title = "Đăng ký";
  }

  const roleID = useSelector((state) => state.register.user);
  return (
    <div className="register-container">
      <h1 className="register-container__title">{title}</h1>
      <Outlet />
      <div className="register-container__footer">
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: 17,
            fontWeight: "400",
            transform: "translate(5px,5px)",
          }}
        >
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </Typography>
      </div>
      <Notification notifyAlert={notification} />
    </div>
  );
}
