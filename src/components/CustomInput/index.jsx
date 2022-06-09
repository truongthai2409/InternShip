import React from "react";
import "./styles.scss";

const CustomInput = ({
  label,
  id,
  type = "text",
  placeholder,
  children,
  register,
  check = false,
  value,
}) => {
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
          disabled={check}
          value={value}
          
          {...register(id)}
        />
        <p className="custom-input__error">{children}</p>
      </div>
    </div>
  );
};

export default CustomInput;
