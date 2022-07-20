import React from "react";
import "./styles.scss";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";

const CustomInput = ({
  label,
  id,
  type,
  placeholder,
  children,
  register,
  check = false,
  value,
  defaultValue,
  requirementField = true,
  visibility = false,
}) => {

  const [isHide, setIsHide] = useState(false)
  const handleHide = () => {
      setIsHide(!isHide)
  };

  return (
    <div className="custom-input">
      <label htmlFor={id} className="custom-input__label">
        {label}
        {requirementField && <span className="field-requirment">*</span>}
      </label>
      <div
        className={
          check ? "custom-input__textfield-disabled" : "custom-input__textfield"
        }
      >
        <input
          type={ type }
          id={id}
          placeholder={placeholder}
          disabled={check}
          value={value}
          defaultValue={defaultValue}
          {...register(id)}
        />
        {check ? null : <p className="custom-input__error">{children}</p>}
        {visibility && (
          <div className="visibility-icon" onClick={handleHide} style={{cursor: "pointer"}}>
            {isHide ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
