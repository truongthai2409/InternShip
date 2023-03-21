import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

function DatePickerWithLabel({
  label,
  className,
  requirementField = true,
  id,
  register,
  onChange,
  selectedDate,
  format,
  ...rest
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className='custom-input__label'>
        {label}
        {requirementField && <span className='field-requirment'>*</span>}
      </label>
      <DatePicker
        todayButton='Hôm nay'
        dateFormat={format}
        selected={selectedDate}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}

export default DatePickerWithLabel;
