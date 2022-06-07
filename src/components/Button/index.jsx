import React from "react";

import "./styles.scss";

const Button = ({ name, IconBtnMui, onClick, bwidth }) => {
  //console.log(iconBtn);

  return (
    <>
      <button 
        className="button" 
        onClick={onClick} 
        style={{width: bwidth ? `${bwidth}` : ''}}
      >
        {IconBtnMui ? <IconBtnMui className="button__icon" /> : null}
        <p>{name}</p>
      </button>
    </>
  );
};

export default Button;
