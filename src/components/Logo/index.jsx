import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import logo from "./logo.png";
import { useSelector } from "react-redux";

export default function Logo({ id }) {
  const { profile } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const roleList = {
    3: "Ứng viên",
    1: "Nhà tuyển dụng",
    4: "Cộng tác viên",
  };

  const handleClickGoHome = () => {
    if (profile.role !== undefined) {
      const role = profile.role;
      switch (role) {
        case "Role_HR":
          navigate(`/hr`, { replace: true });
          break;
        case "Role_Partner":
          navigate(`/partner`, { replace: true });
          break;
        default:
          navigate(`/candidate`, { replace: true });
          break;
      }
    } else {
      navigate(`/`);
    }
  };
  return (
    <div onClick={handleClickGoHome}>
      <Link to="" className="logo">
        <img style={{ width: "300px" }} src={logo} alt="" />
        <span>{id ? roleList[id] : ""}</span>
      </Link>
    </div>
  );
}
