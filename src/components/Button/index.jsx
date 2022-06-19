import React from "react";

import "./styles.scss";

const Button = ({ name, IconBtnMui, onClick, bwidth, children }) => {
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
        {children}
      </button>
    </>
  );
};

export default Button;
