import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './styles.scss';

export default function SelectCustom({
  label,
  id,
  className,
  children,
  defaultValue,
  setValue,
  onChange,
  register = false,
  options = [],
  placeholder,
  requirementField = true,
  dispatch = () => {},
  action = () => {},
  idProvince,
}) {
  const renderSelectOption = () => {
    return options.map((item) => {
      return (
        <MenuItem
          onClick={() => {
            handleChangeLocation(item.id);
          }}
          value={item.id}
          key={item.id}
        >
          {item.name}
        </MenuItem>
      );
    });
  };

  // handle change district
  const handleChangeLocation = (idProvince) => {
    dispatch(action(idProvince));
  };
  const [selectedOption, setSelectedOption] = React.useState('');
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  React.useEffect(() => {
    dispatch(action(idProvince));
  }, [idProvince]);

  return (
    <>
      <div className={`select-form ${className ? className : ''}`}>
        <h1 className='select-label'>
          {label}
          {requirementField && <span className='field-requirment'>*</span>}
        </h1>
        <FormControl className='select-formControl' fullWidth>
          <Select
            className='select-field'
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue={
              defaultValue
                ? defaultValue
                : defaultValue === 0
                ? defaultValue
                : ''
            }
            // value={defaultValue}
            {...register(id)}
            onChange={handleChange}
          >
            <MenuItem value={''}>
              <p className='select-placeholder'>{placeholder}</p>
            </MenuItem>
            {renderSelectOption()}
          </Select>
        </FormControl>
        <p className='select-error'>{children}</p>
      </div>
    </>
  );
}
