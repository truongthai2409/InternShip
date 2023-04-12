import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import './styles.scss';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.findIndex(
        (item) => item.id === name.id && item.name === name.name
      ) != -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const SelectMulti = ({
  arrList,
  id,
  register,
  placeholder,
  className,
  label,
  requirementField = true,
  children,
  arrDefault,
}) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleDelete = (id) => {
    setPersonName(personName.filter((item) => item.id !== id));
  };

  const handleChange = (event) => {
    // get lastest item
    console.log(event.target.value);

    const selectedValue = arrList.find(
      (item) => item.name === event.target.value.slice(-1).pop().name
    );
    if (!personName.some((item) => item.id === selectedValue.id)) {
      setPersonName([...personName, selectedValue]);
    } else {
      const updatedArray = personName.filter((p) => p.id !== selectedValue.id);
      setPersonName(updatedArray);
    }
  };
  React.useEffect(() => {
    arrDefault != null && setPersonName(arrDefault);
  }, []);
  return (
    <div className={`select-form ${className ? className : ''}`}>
      <h1 className='select-label'>
        {label}
        {requirementField && <span className='field-requirment'>*</span>}
      </h1>
      <FormControl
        sx={{ width: '100%', border: '1px solid #04bf8a', marginTop: '-1px' }}
      >
        {personName.length > 0 ? (
          ''
        ) : (
          <InputLabel
            id='demo-multiple-chip-label'
            style={{ fontSize: 13, padding: '0 !important' }}
          >
            {placeholder}
          </InputLabel>
        )}
        <Select
          sx={{ padding: '6px 0 8xpx 0' }}
          className='container_form_post'
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={personName}
          {...register(id)}
          onChange={handleChange}
          input={
            <OutlinedInput
              sx={{ padding: '-4px 14px' }}
              id='select-multiple-chip'
              label='Chip'
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value.id}
                  label={value.name}
                  onDelete={() => handleDelete(value.id)}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {arrList.map((item, idx) => (
            <MenuItem
              key={idx}
              value={item}
              // style={getStyles(name, personName, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <p className='select-error'>{children}</p>
    </div>
  );
};

export default SelectMulti;
