import React, {useEffect} from "react";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";

import Logo from "../../components/Logo/index";
import Notification from "../../components/Notification";
import { userSelector } from '../../store/selectors/main/registerSelectors'

import notificationSlice from "../../store/slices/notifications/notificationSlice";
import {notificationSelector} from "../../store/selectors/notificationSelectors"

import { Outlet, Link } from "react-router-dom";

export default function RegisterContainer() {
  const notification  = useSelector(notificationSelector);
  const dispatch = useDispatch()

  // useEffect(() => {
  //   console.log("Notification");
  //   dispatch(notificationSlice.actions.successMess("Success"))
  // }, []);
  // Lấy ra role id để làm subtitle cho logo

  // const roleID = JSON.parse(sessionStorage.getItem("account"))?.role.id

  const roleID = useSelector(userSelector)?.role?.id
  return (
    <div className="register-container">
      <Logo id={roleID ? roleID : false}/>
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
