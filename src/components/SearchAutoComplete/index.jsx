import { TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from "@mui/system";

export default function index({ data, avatarRender, nameRender, labelName, onChange }) {

    return (
        <Autocomplete
            id="country-select-demo"
            sx={{ width: "100%" }}
            options={data}
            autoHighlight
            getOptionLabel={nameRender}
            onChange={onChange}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                        loading="lazy"
                        width="30"
                        src={avatarRender(option)}
                        alt=""
                    />
                    {nameRender(option)}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={labelName}
                />
            )}
        />
    )
}
