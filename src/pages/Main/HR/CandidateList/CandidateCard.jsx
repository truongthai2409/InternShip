import React from "react";
import "./styles.scss";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ButtonMark from "src/components/ButtonMark";

const ViewButton = ({ text }) => {
  return (
    <div className="view-button__wrapper">
      <RemoveRedEyeIcon />
      <p>{text}</p>
    </div>
  );
};

export const CandidateCard = ({
  avatar = "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg",
  candidate,
}) => {
  console.log(candidate);
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
            <h2 className="candidate-card__infor-name">{`${candidate?.userDTO?.lastName} ${candidate?.userDTO?.firstName}`}</h2>
          </div>
          <p className="candidate-card__infor-item">
            <span>Chuyên ngành:</span>
            {`${candidate?.major?.name}`}
          </p>
          <p className="candidate-card__infor-item">
            <span>Số điện thoại:</span>
            {`${candidate?.userDTO?.phone}`}
          </p>
          <p className="candidate-card__infor-item">
            <span>Email:</span>
            {`${candidate?.userDTO?.email}`}
          </p>
        </div>
        <div className="candidate-card__actions">
          <ViewButton text="Xem CV" />
          <ButtonMark border="1px solid #DEDEDE" />
        </div>
        <p className="candidate-card__infor-time">
          <AccessTimeIcon />
          09/06/2022
        </p>
      </div>
    </>
  );
};

export default CandidateCard;
