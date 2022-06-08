import React from "react";
import "./styles.scss";

const CustomTextarea = ({
  label,
  id,
  type,
  placeholder,
  children,
  register,
}) => {
  return (
    <div className="custom-textarea">
      <label htmlFor={id} className="custom-textarea__label">
        {label}
      </label>
      <div className="custom-textarea__textfield">
        <textarea
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(id)}
          rows={5}
        />
        <p className="custom-textarea__error">{children}</p>
      </div>
    </div>
  );
};

export default CustomTextarea;
