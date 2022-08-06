import React from "react";
import "./styles.scss";
import { Checkbox, FormControlLabel } from "@mui/material";

const CustomCheckbox = ({ label, onChange }) => {
  const handleChange = (e) => {
    const checkedName = e.target.name;
    onChange && onChange(checkedName);
  };
  return (
    <FormControlLabel
      onChange={(name) => handleChange(name)}
      className="formControlLabel"
      name={label}
      control={
        <Checkbox
          className="checkBoxColor"
          sx={{
            color: "dedede",
          }}
        />
      }
      label={label}
    />
  );
};

export default CustomCheckbox;
