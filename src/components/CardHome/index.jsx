import * as React from "react";
import TagName from "../TagName";
import "./styles.scss";
import Rating from "@mui/material/Rating";
import ButtonMark from "../ButtonMark";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  updateIdJobActive,
  updateIndexCardActive,
} from "../../store/slices/main/home/job/jobSlice";
import { getRatingCompany } from "src/store/slices/main/home/rating/rating";
import { getMarkByUser } from "src/store/slices/main/mark/markSlice";
import { updateIndexPartnerCardActive } from "src/store/slices/main/home/demand/demandSlice";
import PeopleIcon from "@mui/icons-material/People";

const CardHome = (props) => {
  const dispatch = useDispatch();
  const { careListOfPrivate } = useSelector((state) => state.mark);
  const { profile } = useSelector((state) => state.authentication);
  // console.log(profile.username);
  var isMark =
    careListOfPrivate &&
    careListOfPrivate.filter((job) => job?.jobCare?.id === props?.id);
  const isMarkLength = isMark && isMark.length > 0 ? true : false;

  React.useEffect(() => {
    if (profile.role) {
      dispatch(getMarkByUser(profile.username));
    }
  }, [dispatch, profile.username]);

  React.useEffect(() => {
    if (props.index === 0) {
      dispatch(updateIdJobActive(props.id));
    }
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getRatingCompany(props.idCompany));
  }, [dispatch]);

  const handleClick = () => {
    dispatch(updateIndexCardActive(props.index));
    dispatch(updateIndexPartnerCardActive(props.index));
    dispatch(updateIdJobActive(props.id));
  };

  var handleRerender = async (id) => {
    if (id) {
      // setId(id);
      // dispatch(getMarkByUser(profile.username));
    }
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "cardHome__container",
        props.active === props.index ? "active" : ""
      )}
      dataset={props.id}
    >
      <div className="cardHome__col1" dataset={props.id}>
        <div className="cardHome__aboutCompany">
          <img
            className="cardHome__img"
            src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
            alt=""
          />
          <div>
            <h4 className="cardHome__title">{props.title}</h4>
            <p className="cardHome__nameCompany">{props.nameCompany}</p>
          </div>
        </div>
        <div className="cardHome__tagName">
          {props.tagName.map((tag) => (
            <TagName key={tag} title={tag} />
          ))}
        </div>
        {props.demandPartner ? (
          <div className="cardHome__amount-hr-apply">
            <PeopleIcon />
            <span>Số lượng ứng viên: {props.amount}</span>
          </div>
        ) : (
          <Rating
            name="read-only"
            precision={0.5}
            readOnly
            value={props.star ?? " "}
          />
        )}
      </div>
      <div className="cardHome__col2">
        <ButtonMark
          height="32px"
          width="32px"
          fontSize="18px"
          jobId={props.id}
          isMark={isMarkLength}
          onClick={handleRerender}
        />
        <div className="cardHome__col2-End">
          <div className="cardHome__col2-End-1">
            <AddLocationAltRoundedIcon
              style={{ fontSize: `${props.fontSize + 2}px` }}
            />
            <p style={{ fontSize: `${props.fontSize}px` }}>{props.location}</p>
          </div>
          <div className="cardHome__col2-End-2">
            <WatchLaterOutlinedIcon
              style={{ fontSize: `${props.fontSize + 2}px` }}
            />
            <p
              style={{ fontSize: `${props.fontSize}px` }}
            >{`${props.time[0]} - ${props.time[1]}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHome;
