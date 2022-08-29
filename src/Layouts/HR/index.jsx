import "./styles.scss";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderWithHR from "../../components/HeaderWithHR";
import Footer from "../../components/Footer";
import { useEffect } from "react";

const HRLayOut = () => {
  const navigate = useNavigate()
  const user = JSON.parse(sessionStorage.getItem("userPresent"))
  
  useEffect(()=>{
    if(!user.role.includes("Role_HR")) {
      navigate("/")
    }
  },[])
  return (
    <div className="main__layout">
      <HeaderWithHR idMark={5} idNoti={5} hr />
      <div className="main__layout-body-outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HRLayOut;
