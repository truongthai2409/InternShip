import "./styles.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import PostStatus from "../PostStatus";
import ButtonAction from "../ButtonAction";
import moment from "moment";
import { useState } from "react";
import Modal from "../Modal";
import CandidateList from "src/pages/Main/HR/CandidateList";

const CardPost = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <div className="card-post__container">
      <PostStatus status={props.status?.id} />
      <h3 className="card-post__job-name">{props.jobName}</h3>
      <div className="card-post__company-info-detail">
        <img
          className="company-info-detail__img"
          src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
          alt="Ảnh của công ty"
        />
        <div className="company-info-detail__content">
          <p className="company__name">{props.companyName}</p>
          <p className="company__location">{props.companyLocation}</p>
        </div>
      </div>
      <p className="card-post__amount">Số lượng: {props.amount}</p>
      <p className="card-post__time">
        <b>Thời gian tuyển dụng:</b>{" "}
        {moment(props.timeStart).format("DD/MM/YYYY")} -{" "}
        {moment(props.timeEnd).format("DD/MM/YYYY")}
      </p>
      <p className="card-post__created">
        <b>Ngày đăng:</b> {moment(props.timeCreated).format("DD/MM/YYYY")}
      </p>
      <div className="card-post__action">
        <ButtonAction
          height="50px"
          width="33.33%"
          border="0.5px solid #DEDEDE"
          icon={<PersonOutlineIcon></PersonOutlineIcon>}
          color="#111"
          name="Ứng viên"
          fontSize="13px"
          onClick={handleOpen}
          type="read"
        />
        <ButtonAction
          height="50px"
          width="33.33%"
          border="0.5px solid #DEDEDE"
          icon={<ModeEditOutlineIcon></ModeEditOutlineIcon>}
          color="#111"
          name="Chỉnh sửa"
          fontSize="13px"
          onClick={handleOpen}
          type="update"
        />
        <ButtonAction
          height="50px"
          width="33.33%"
          border="0.5px solid #DEDEDE"
          icon={<DoorFrontIcon></DoorFrontIcon>}
          color="#111"
          name="Đóng"
          fontSize="13px"
          onClick={handleOpen}
          type="close"
        />
      </div>
    </div>
  );
};

export default CardPost;
