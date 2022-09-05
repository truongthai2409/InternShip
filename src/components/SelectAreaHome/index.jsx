import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import "./styles.scss";
import { InputLabel, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProvinceList } from "../../store/slices/location/locationSlice";
const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "70px !important",
      maxHeight: "none !important",
      height: "200px",
    },
  },
};

export default function SelectAreaHome({ onChange }) {
  const [personName, setPersonName] = React.useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    onChange && onChange(value);
  };

  const dispatch = useDispatch();
  const { provinceList } = useSelector((state) => state.location);

  React.useEffect(() => {
    dispatch(getProvinceList());
  }, [dispatch]);

  return (
   
    <div className="config-select">
      <FormControl sx={{m: 1 ,minWidth: 120 }} style={{width : '70%'}}>
      <InputLabel id="demo-simple-select-autowidth-label">Khu Vực</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          renderValue={(selected) => {
            if (selected.length === 0) {
              return (
                <p id="demo-multiple-name-label" className="text-location">
                  Khu vực
                </p>
              );
            }

            return selected;
          }}
          onChange={handleChange}
          autoWidth
          variant="standard"
        >
          {provinceList.map((province) => (
            <MenuItem
              key={province.id}
              value={province.name}
            >
              {province.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
