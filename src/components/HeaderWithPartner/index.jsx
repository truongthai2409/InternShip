import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import AddCardIcon from "@mui/icons-material/AddCard";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PropTypes from "prop-types";
import Logo from "../Logo";
import "./styles.scss";
import SearchResultHome from "../SearchResultHome";
import AccountMenu from "../AccountMenu";
import { getUserById } from "src/store/slices/Admin/user/userSlice";

function HeaderWithPartner(props) {
  const location = useLocation();
  const pathUrl = location.pathname;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);

  const idUser = JSON.parse(localStorage.getItem("userPresent"))?.idUser;

  useEffect(() => {
    dispatch(getUserById(idUser));
  }, []);

  return (
    <div className="container-header__partner header__partner config">
      {user.role ? <Logo id={4} /> : <Logo id={3} />}
      {user.role ? (
        <div className="header__partner">
          <Link to="/partner/post" className="header__partner-post">
            <AddCardIcon></AddCardIcon>
            <span className="header__partner-post-post">Đăng bài</span>
          </Link>
          <Link to="/partner/post-list" className="header__partner-post">
            <FormatAlignJustifyIcon></FormatAlignJustifyIcon>
            <span className="header__partner-post-post">
              Danh sách bài đăng
            </span>
          </Link>
        </div>
      ) : null}
      {props.search ? (
        <SearchResultHome
          bwidth="681px"
          bheight="33px"
          bwidthInput="fit-content"
          bheightInput="fit-content"
          mb="0"
          candidate_infomation={true}
        />
      ) : null}
      <div className="header__partner-icon">
        <div className="header__partner-icon-config">
          <Link to={`${pathUrl}/view-list`}>
            <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>
            {props.isMark ? (
              <FiberManualRecordIcon
                fontSize="inherit"
                color="warning"
              ></FiberManualRecordIcon>
            ) : null}
          </Link>
        </div>
        <div className="header__partner-icon-config">
          <Link to={`${pathUrl}/`}>
            <AddAlertOutlinedIcon></AddAlertOutlinedIcon>
            {props.isNoti ? (
              <FiberManualRecordIcon
                fontSize="inherit"
                color="warning"
              ></FiberManualRecordIcon>
            ) : null}
          </Link>
        </div>
        <div
          style={{
            borderRadius: "14px",
            backgroundColor: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            paddingLeft: "6px",
          }}
        >
          <h4 className="name">Chào, {user?.firstName || "User"}</h4>
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}

HeaderWithPartner.propTypes = {
  idMark: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  idNoti: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HeaderWithPartner;
