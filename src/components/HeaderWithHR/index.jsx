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
import { getProfileByIdUser } from "src/store/slices/Admin/user/userSlice";

function HeaderWithHR(props) {
  const location = useLocation();
  const pathUrl = location.pathname;
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  useEffect(() => {
    const idUser = JSON.parse(localStorage.getItem("userPresent")).idUser;
    dispatch(getProfileByIdUser(idUser));
  }, []);

  return (
    <div className="container-header__hr header__hr config">
      {props.hr ? <Logo id={1} /> : <Logo id={3} />}
      {props.hr ? (
        <div className="header__hr">
          <Link to="post" className="header__hr-post">
            <AddCardIcon></AddCardIcon>
            <span className="header__hr-post-post">Đăng tuyển</span>
          </Link>
          <Link to="list" className="header__hr-post">
            <FormatAlignJustifyIcon></FormatAlignJustifyIcon>
            <span className="header__hr-post-post">Công việc đang tuyển</span>
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
      <div className="header__hr-icon">
        <div className="header__hr-icon-config">
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
        <div className="header__hr-icon-config">
          <Link to={`${pathUrl}`}>
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
            borderRadius: "20px",
            backgroundColor: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            paddingLeft: "12px",
            paddingRight: "12px",
          }}
        >
          <h4 className="name">Chào, {profile?.user?.firstName}</h4>
          <AccountMenu
            linkImg={
              profile?.user?.avatar
                ? `http://localhost:8085${profile?.user?.avatar}`
                : "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
            }
          />
        </div>
      </div>
    </div>
  );
}

HeaderWithHR.propTypes = {
  idMark: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  idNoti: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HeaderWithHR;
