import { useState } from "react";
import CandidateList from "src/pages/Main/HR/CandidateList";
import Modal from "../Modal";
import "./styles.scss";

const ButtonAction = ({
  onClick,
  height,
  width,
  border,
  amount = "",
  name,
  icon,
  fontSize,
  color = "",
  type,
}) => {
  return (
    <div
      type="button"
      className="button-action__wrapper"
      style={{ width: width, height: height, border: border, color: color }}
    >
      <div onClick={onClick} className="button-action__container">
        {icon}
        <p
          className="button-action__name"
          style={{ fontSize: fontSize }}
        >{`${amount} ${name}`}</p>
      </div>
    </div>
  );
};

export default ButtonAction;
