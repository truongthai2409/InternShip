import "./styles.scss";
import Switch from "@mui/material/Switch";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const SwitchButton = ({ label, fontSize }) => {
    return (
        <FormGroup>
            <FormControlLabel control={<Switch />} label={label} />
        </FormGroup>
    );
};

export default SwitchButton;
