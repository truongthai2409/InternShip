import React from "react";
import PropTypes from "prop-types";
import HeaderWithHR from "../../../components/HeaderWithHR";
import { Outlet } from "react-router-dom";
import Home from "../Home";

const HR = (props) => {
  return (
    <div className="main__layout">
      <HeaderWithHR />
      <Home></Home>
    </div>
  );
};

HR.propTypes = {};

export default HR;
