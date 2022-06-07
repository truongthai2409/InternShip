import React from "react";
import "./styles.scss";

const CustomInput = ({ label, id, type, placeholder, children, register }) => {
  return (
    <div className="custom-input">
      <label htmlFor={id} className="custom-input__label">
        {label}
      </label>
      <div className="custom-input__textfield">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(id)}
        />
        <p className="custom-input__error">{children}</p>
      </div>
    </div>
  );
};

export default CustomInput;
