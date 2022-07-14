import { useEffect } from "react";
import "./styles.scss";
import { Outlet } from "react-router-dom";
import HeaderWithHR from "../../components/HeaderWithHR";
import Footer from "../../components/Footer";
import HRPostList from "../../pages/Main/HR/HRPostList";

const HRLayOut = () => {
  return (
    <div className="main__layout">
      <HeaderWithHR idMark={5} idNoti={5} hr />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HRLayOut;
