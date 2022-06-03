import React from "react";

import "./styles.scss";

const Select = ({ selectName, selectOptions, onChange }) => {
  // render option
  const renderSelectOption = () => {
    return selectOptions.map((item) => {
      return (
        <option value={item.value} key={item.value}>
          {item.name}
        </option>
      );
    });
  };

  return (
    <div className="select">
      <select name={selectName} id={selectName}>
        {renderSelectOption()}
      </select>
    </div>
  );
};

export default Select;
