import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import "./styles.scss";
import { Select } from "@mui/material";
const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 70,
    },
  },
};

const names = [
  "TPHCM",
  "Đà Nẵng",
  "Hà Nội",
  "TPHCM",
  "Đà Nẵng",
  "Hà Nội",
  "TPHCM",
  "Đà Nẵng",
  "Hà Nội",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectAreaHome() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 100, pl: 1 }}>
        {/* <h6>Khu vực</h6> */}
        <InputLabel id="demo-multiple-name-label">Khu Vực </InputLabel>
        <React.Fragment className="config-select">
          <Select
            labelId="demo-multiple-name-label"
            // id="demo-multiple-name"
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Khu vực" />}
            MenuProps={MenuProps}
            sx={{
              mr: -5,
            }}
            // className={hideIconPadding}
            multiple={false}
            // disabled
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </React.Fragment>
      </FormControl>
    </div>
  );
}
