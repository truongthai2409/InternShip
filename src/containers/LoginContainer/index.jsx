import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import "./responsive.scss";
import Login from "../../pages/Authenticate/Login";
import { useDispatch, useSelector } from "react-redux";
import Button from "src/components/shared/Button";
import { updateRole } from "src/store/slices/main/user/userSlice";
import { toast } from "react-toastify";
import { MenuDropDown } from "../../components/Login/components";
import { useTranslation } from "react-i18next";

const LoginContainer = () => {
  const { t } = useTranslation('login')
  const { role } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const handleLogout = () => {
    sessionStorage.removeItem("userPresent");
    localStorage.removeItem("userPresent");
    dispatch(updateRole());
    toast.warning("Bạn vừa đăng xuất", {
      position: "bottom-right",
      autoClose: 3000,
      theme: "dark",
    });
  };
  if (role) {
    return (
      <div className="login-container">
        <h1 className="login-container__title">Thông Báo</h1>
        <span>Bạn đã đăng nhập.</span>
        <div className="register-container__footer">
          <Button name={"Đăng xuất"} onClick={handleLogout} />
        </div>
      </div>
    );
  }
  return (
    <div className="login-container">
      <h1 className="login-container__title">{t("loginTL")}</h1>
      <Login />
      <div className="register-container__footer">
        <Link to="/forgot-password">{t("forgotPasswordTL")}</Link>
      </div>
      <p className="register-container__footerRegister-p">
        {t("doNotHaveAnAccountTL")}
      </p>
      <div className="register-container__footerRegister">
        <MenuDropDown />
      </div>
    </div>
  );
};

export default LoginContainer;
