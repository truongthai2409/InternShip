import React from 'react';

import { Checkbox, FormControlLabel } from "@mui/material";

const CustomCheckbox = ({label}) => {
    return (
        <FormControlLabel control={<Checkbox defaultChecked sx={{
            color: "dedede",
            '&.Mui-checked': {
            color: "#00b074"
            },
        }}/>} label={label} />
    );
}

export default CustomCheckbox;
