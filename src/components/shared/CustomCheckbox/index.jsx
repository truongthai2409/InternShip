import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Checkbox, FormControlLabel } from '@mui/material';

const CustomCheckbox = ({ label, onChange, checked, id }) => {
  const inputRef = useState(null);
  const handleChange = (e) => {
    const checkedName = e.target.name;
    const checkedValue = e.target.checked;
    const checkId = id;
    onChange && onChange(checkedName, checkedValue, checkId);
  };

  return (
    <FormControlLabel
      onChange={handleChange}
      className='formControlLabel'
      name={label}
      ref={inputRef}
      checked={checked}
      control={
        <Checkbox
          className='checkBoxColor'
          sx={{
            color: '#04bf8a',
            fontFamily: 'Public Sans !important',
          }}
        />
      }
      label={label}
    />
  );
};

export default CustomCheckbox;
