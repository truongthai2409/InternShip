import React, { useRef } from "react";
import "./styles.scss";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useEffect } from "react";
import { FileUpload } from "./components";

const CustomInput = ({
  label,
  id,
  type,
  format,
  placeholder,
  children,
  register,
  unregister = null,
  check = false,
  defaultValue,
  requirementField = true,
  visibility = false,
  className,
  radius,
  height,
  border,
  icon,
  top,
  setValue,
}) => {
  useEffect(() => {
    if (check) {
      unregister(id);
    }
  }, [check]);

  let accept;
  if (type === "file") {
    if (format === "img") {
      accept = ".png, .jpeg, .jpg";
    }
    if (format === "word") {
      accept = ".docx";
    }
    if (format === "pdf") {
      accept = ".pdf";
    }
  }

  const [isHide, setIsHide] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const handleHide = () => {
    setIsHide(!isHide);
  };

  const handlePreviewImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imgFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImgSrc(x.target.result);
      };
      reader.readAsDataURL(imgFile);
      setValue(id, imgFile);
    }
  };

  // type === "file" && console.log("children", register(id))

  return (
    <div className={`custom-input ${className ? className : ""} `}>
      <label htmlFor={id} className="custom-input__label">
        {label}
        {requirementField && <span className="field-requirment">*</span>}
        {type === "file" && <FileUpload img={imgSrc} />}
      </label>
      {type === "file" &&
        (check ? null : <p className="custom-input__error">{children}</p>)}
      <div
        className={` ${type === "file" && "file-input"}
          ${
            check
              ? "custom-input__textfield-disabled"
              : "custom-input__textfield"
          }
          
        `}
      >
        {icon}
        <input
          style={{
            borderRadius: radius ? radius : "",
            height: height ? height : "",
            border: border ? border : "",
          }}
          type={type === "password" ? (isHide ? "text" : "password") : type}
          id={id}
          placeholder={placeholder}
          disabled={check}
          {...register(id)}
          onChange={handlePreviewImage}
          accept={accept}
        />
        {check ? null : <p className="custom-input__error">{children}</p>}
        {visibility && (
          <div
            className="visibility-icon"
            onClick={handleHide}
            style={{ cursor: "pointer", top: `${top}` }}
          >
            {isHide ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
