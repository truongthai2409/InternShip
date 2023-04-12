import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import './styles.scss';

const FilterSelect = (props) => {
  const { list, label, handleSetCountryId } = props;
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    if (handleSetCountryId) {
      handleSetCountryId(event.target.value);
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: '30%' }} size='small'>
      <InputLabel id='demo-select-small'>{label}</InputLabel>
      <Select
        labelId='demo-select-small'
        id='demo-select-small'
        value={value}
        label={label}
        onChange={handleChange}
      >
        {list.map((item) => {
          return <MenuItem value={item.id}>{item.name}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
