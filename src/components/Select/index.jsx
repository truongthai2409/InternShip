import React from "react";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

import "./styles.scss";

 const SelectCustom = ({ selectName, selectOptions, register, id }) => {

  // render option
  const renderSelectOption = () => {
    return selectOptions.map((item) => {
      return (
        <MenuItem value={item.id}>{item.name}</MenuItem>
      );
    });
  };

  return (
    <div className="select">
        <h1 className="select-title">{selectName}</h1>
        <FormControl fullWidth>
            <Select
              {...register(id)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {renderSelectOption()}
            </Select>
        </FormControl>
    </div>
  );
};
export default SelectCustom
