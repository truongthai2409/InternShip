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
  defaultValue,
  requirementField = true
}) => {
  return (
    <div className="custom-input">
      <label htmlFor={id} className="custom-input__label">
        {label}{requirementField && <span className="field-requirment">*</span>}
      </label>
      <div
        className={
          check ? "custom-input__textfield-disabled" : "custom-input__textfield"
        }
      >
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          disabled={check}
          value={value}
          defaultValue={defaultValue}
          {...register(id)}
        />
        {check ? null : <p className="custom-input__error">{children}</p>}
      </div>
    </div>
  );
};

export default CustomInput;
