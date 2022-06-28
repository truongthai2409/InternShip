import React from "react";
import PropTypes from "prop-types";
import TagName from "../TagName";
import ButtonMark from "../ButtonMark";
import Button from "../Button";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import WorkIcon from "@mui/icons-material/Work";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Rating from "@mui/material/Rating";

import "./styles.scss";
import { Icon } from "@mui/material";

const listMajors = ["HTML", "CSS", "JS", "ReactJS"];

function DetailCard(props) {
  return (
    <div className="detail__card">
      <div className="detail__card-1">
        <div className="detail__card-intro">
          <img
            className="detail__card__logo"
            src="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
          ></img>
          <div>
            <h3>{props.nameMajor}</h3>
            <p className="name-company">{props.nameCompany}</p>
          </div>
        </div>
        <ButtonMark></ButtonMark>
      </div>
      <div className="detail__card-2">
        <div className="tag-name">
          {listMajors.map((listMajor, index) => (
            <div className="tag-name__name" key={index}>
              <TagName title={listMajor} />
            </div>
          ))}
        </div>
        <div>
          <Button name="Ứng Tuyển"></Button>
        </div>
      </div>
      <div className="detail__card-3">
        <div className="detail__card-3-item">
          <h4 className="detail__card-3-item-name">Mô tả công việc:</h4>
          <p>{props.detailJob}</p>
        </div>
        <div className="detail__card-3-item">
          <h4 className="detail__card-3-item-name">Yêu cầu công việc:</h4>
          <p>{props.requireJob}</p>
        </div>
        <div className="detail__card-3-item">
          <h4 className="detail__card-3-item-name">Thời hạn ứng tuyển:</h4>
          <p>{props.timeJob}</p>
        </div>
      </div>
      <div className="line"></div>
      <div className="detail__card-4">
        <div className="detail__card-4-item">
          <Icon className="detail__card-4-item-icon">
            <CurrencyExchangeIcon />
          </Icon>
          <h6 className="detail__card-4-item-info">{props.salary}</h6>
        </div>
        <div className="detail__card-4-item">
          <Icon className="detail__card-4-item-icon">
            <WorkIcon />
          </Icon>
          <h6 className="detail__card-4-item-info">Fulltime/Parttime</h6>
        </div>
        <div className="detail__card-4-item">
          <AddLocationIcon className="detail__card-4-item-icon">
            <WorkIcon />
          </AddLocationIcon>
          <h6 className="detail__card-4-item-info">{props.location}</h6>
        </div>
      </div>
      <div className="detail__card-5">
        <div>
          <p>{props.rating}</p>
          <Rating
            name="read-only"
            precision={0.5}
            readOnly
            defaultValue={props.star}
          />
        </div>
        <Button name="Ứng tuyển"></Button>
      </div>
    </div>
  );
}

DetailCard.propTypes = {};

export default DetailCard;
