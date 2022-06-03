import React from "react";

import "./styles.scss";

const Button = ({ name, IconBtnMui }) => {
  //console.log(iconBtn);

  return (
    <>
      <button className="button">
        {IconBtnMui ? <IconBtnMui className="button__icon" /> : null}
        <p>{name}</p>
      </button>
    </>
  );
};

export default Button;
