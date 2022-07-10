import React from "react";
import "./styles.scss";

const CustomTextarea = ({ label, id, type, placeholder, children, register, check = false }) => {
    return (
        <div className="custom-textarea">
            <label htmlFor={id} className="custom-textarea__label">
                {label}
            </label>
            <div className={check ? "custom-input__textarea-disabled" : "custom-textarea__textfield"}>
                <textarea type={type} id={id} disabled={check} placeholder={placeholder} {...register(id)} rows={5} />
                {check ? null : (
                    <p className="custom-textarea__error">
                        {children || (
                            <span style={{ marginTop: "2px", fontSize: "12px", fontStyle: "italic", color: "#999" }}>(Tối đa 8000 ký tự)</span>
                        )}
                        {/* {children} */}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CustomTextarea;
