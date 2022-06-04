import React from "react";

import "./styles.scss";

const Button = ({ name, IconBtnMui, onClick }) => {
  //console.log(iconBtn);

  return (
    <>
      <button className="button" onClick={onClick}>
        {IconBtnMui ? <IconBtnMui className="button__icon" /> : null}
        <p>{name}</p>
      </button>
    </>
  );
};

export default Button;
