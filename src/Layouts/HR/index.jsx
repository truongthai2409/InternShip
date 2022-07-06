import React from "react";
import "./styles.scss";
import { Outlet } from "react-router-dom";
import HeaderWithHR from "../../components/HeaderWithHR";

const HRLayOut = () => {
  return (
    <div className="main__layout">
      <HeaderWithHR idMark={5} idNoti={5} />
      <Outlet />
    </div>
  );
};

export default HRLayOut;
