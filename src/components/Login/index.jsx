import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileByIdUser } from "src/store/slices/Admin/user/userSlice";
import AccountMenu from "../AccountMenu";
import Button from "../Button";
import "./styles.scss";

export default function Login() {
  const { profile } = useSelector((state) => state.user);
  const role = sessionStorage.getItem("userPresent")
    ? JSON.parse(sessionStorage.getItem("userPresent")).role
    : "";
  const dispatch = useDispatch();
  useEffect(() => {
    const userLocalStorage = JSON.parse(sessionStorage.getItem("userPresent"));
    dispatch(
      getProfileByIdUser([userLocalStorage?.idUser, userLocalStorage?.token])
    );
  }, []);
  const renderLogin = () => {
    if (role) {
      return (
        <div className="header__hr-icon">
          <div
            className="responsive__hr-icon"
            style={{
              borderRadius: "50px",
              backgroundColor: "#FFFFFF",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              display: "flex",
              alignItems: "center",
              paddingLeft: "12px",
              height: "40px",
            }}
          >
            <h4 className="name" style={{ fontSize: "14px" }}>
              {" "}
              {profile?.user?.lastName} {profile?.user?.firstName}{" "}
            </h4>

            <AccountMenu
              linkImg={
                profile?.user?.avatar
                  ? `${profile?.user?.avatar}`
                  : "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
              }
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="login__home">
          <Link to="/login">
            <span className="login__home-sign-in">Đăng nhập</span>
          </Link>
          <Link to="/register">
            <Button
              bwidth="117px"
              bheight="35px"
              fz="14px"
              name="Đăng ký"
              className="login__home-register"
            />
          </Link>
        </div>
      );
    }
  };
  return <>{renderLogin()}</>;
}
