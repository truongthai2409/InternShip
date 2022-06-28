import React from 'react';
import './styles.scss';
import { Checkbox, FormControlLabel } from "@mui/material";

const CustomCheckbox = ({label}) => {
    return (
        <FormControlLabel className="formControlLabel" control={<Checkbox sx={{
            color: "dedede",
            '&.Mui-checked': {
            color: "#00b074"
            },
        }}/>} label={label} />
    );
}

export default CustomCheckbox;
