import React from "react";
import "./styles.scss";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

export const CandidateCard = ({
  avatar = "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg",
}) => {
  return (
    <>
      <div className="candidate-card__wrapper">
        <img
          src={avatar}
          alt="ảnh đại diện"
          className="candidate-card__avatar"
        />
        <div className="candidate-card__infor">
          <div className="row">
            <h2 className="candidate-card__infor-name">Lê Duy Tường</h2>
            <p className="candidate-card__infor-item">09/06/2022</p>
          </div>
          <p className="candidate-card__infor-item">Chuyên ngành: Công nghệ phần mềm</p>
          <p className="candidate-card__infor-item">Phương thức làm việc: Remote</p>
          <p className="candidate-card__infor-item">Số điện thoại: 0964088473</p>
          <p className="candidate-card__infor-item">Email: abc@gmail.com</p>
        </div>
      </div>
    </>
  );
};

export default CandidateCard;
