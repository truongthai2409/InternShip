import React from "react";
import "./styles.scss";
const SelectAreaHome = React.forwardRef(
  ({ onBlur, name, label, selectOptions, getCountryList, dispatch }, ref) => {
    // render option
    const renderSelectOption = () => {
      return selectOptions.map((item, i) => {
        return (
          <option value={item} key={i}>
            {item}
          </option>
        );
      });
    };

    // handle change Country
    const handleChangeCountry = (e) => {
      // dispatch(getCountryList(e.target.value));
    };

    return (
      <>
        <label>{label}</label>
        <select
          // name={name}
          ref={ref}
          onChange={handleChangeCountry}
          onBlur={onBlur}
          className="select__area"
        >
          <option value=""></option>
          {renderSelectOption()}
        </select>
      </>
    );
  }
);

export default SelectAreaHome;
