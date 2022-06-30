import React from "react";

const CustomSelect = React.forwardRef(
  ({ onBlur, name, label, selectOptions, getDistrictList, dispatch }, ref) => {
    // render option
    const renderSelectOption = () => {
      if (selectOptions) {
        return selectOptions.map((item) => {
          return (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          );
        });
      }
    };

    // handle change district
    const handleChangeDistrict = (e) => {
      console.log(e.target.value);
      dispatch(getDistrictList(e.target.value));
    };

    return (
      <>
        <label>{label}</label>
        <select
          name={name}
          ref={ref}
          onChange={handleChangeDistrict}
          onBlur={onBlur}
        >
          <option value="">none</option>
          {renderSelectOption()}
        </select>
      </>
    );
  }
);

export default CustomSelect;
