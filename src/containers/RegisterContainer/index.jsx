import React from "react";
import "./styles.scss";
import { useSelector } from "react-redux";

import Logo from "../../components/Logo/index";
import Notification from "../../components/Notification";
import { userSelector, statusSelector } from '../../store/selectors/main/registerSelectors'

import {notificationSelector} from "../../store/selectors/notificationSelectors"

import { Link, useNavigate } from "react-router-dom";

export default function RegisterContainer({Outlet}) {
  const notification  = useSelector(notificationSelector);
  const navigate = useNavigate()

  const status = useSelector(statusSelector)

  if (status === "success") {
    setTimeout(() => {
      navigate("/login")
    }, 1000)
  }

  const roleID = useSelector(userSelector)?.role?.id
  return (
    <div className="register-container">
      <Logo id={roleID ? roleID : false}/>
      <h1 className="register-container__title">Đăng ký</h1>
      <Outlet />
      <div className="register-container__footer">
        <p>
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
      <Notification notifyAlert={notification} />
    </div>
  );
}
