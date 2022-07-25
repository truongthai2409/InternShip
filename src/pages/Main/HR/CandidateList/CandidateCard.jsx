import React from "react";
import "./styles.scss";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

const CandidateCard = () => {
  return (
    <div className="candidate-card__container">
      <div className="candidate-card__detail">
        <div className="candidate-card__avatar"></div>
        <div className="candidate-card__info">
          <div className="candidate-card__info__name">
            <h2>Van A</h2>
          </div>
          <div className="candidate-card__info__role">
            <h3>Sinh viên</h3>
          </div>
          <div className="candidate-card__info__school">
            <p>Trường học: Đại học Mở TP.HCM</p>
          </div>
          <div className="candidate-card__info__salary-expect">
            <p>Lương mong muốn: $400</p>
          </div>
          <div className="candidate-card__location-job">
            <p>Địa điểm: Ho Chi Minh</p>
          </div>
        </div>
        <div className="candidate-card__extra">
          <div className="candidate-card__apply-date">
            <AccessTimeIcon />
            <span id="date-time">09/06/2022 - 9:43 AM</span>
          </div>
          <div className="candidate-card__review">
            <div className="candidate-card__cv-viewer">
              <RemoveRedEyeIcon />
              <span>Xem CV</span>
            </div>
            <div className="candidate-card__bookmark">
              <BookmarkBorderOutlinedIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
