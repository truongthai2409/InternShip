import React from "react";

import { FormControl, Select, MenuItem } from "@mui/material";

import "./styles.scss";

const SelectCustom = ({ selectName, selectOptions, register, id }) => {
  // render option
  const renderSelectOption = () => {
    return selectOptions.map((item) => {
      return (
        <MenuItem value={item.id} key={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  return (
    <div className="select">
      <h1 className="select-title">{selectName}</h1>
      <FormControl fullWidth>
        <Select
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          defaultValue={""}
          {...register(id)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {renderSelectOption()}
        </Select>
      </FormControl>
    </div>
  );
};
export default SelectCustom;
