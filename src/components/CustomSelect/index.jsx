import React from "react";

const CustomSelect = React.forwardRef(
  (
    { onBlur, name, label, selectOptions, getDistrictList, dispatch, id },
    ref
  ) => {
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
      // console.log(e.target.value);
      dispatch(getDistrictList(e.target.value));
    };

    const handleChange = () => {
      console.log("Changed");
    };

    return (
      <>
        <label>{label}</label>
        <div className="custom-select__textfield">
          <select
            name={name}
            ref={ref}
            onChange={handleChange || handleChangeDistrict}
            onBlur={onBlur}
            id={id}
          >
            <option value="">Vui lòng chọn</option>
            {renderSelectOption()}
          </select>
        </div>
      </>
    );
  }
);

export default CustomSelect;
