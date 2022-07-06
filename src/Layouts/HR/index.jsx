import React from "react";
import "./styles.scss";
import { Outlet } from "react-router-dom";
import HeaderWithHR from "../../components/HeaderWithHR";
import Footer from "../../components/Footer";

const HRLayOut = () => {
  return (
    <div className="main__layout">
      <HeaderWithHR idMark={5} idNoti={5} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HRLayOut;
