import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

function DatePickerWithLabel({ label, className, requirementField = true }) {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className={className}>
      <label htmlFor='datepicker' className='custom-input__label'>
        {label}
        {requirementField && <span className='field-requirment'>*</span>}
      </label>
      <DatePicker
        id='datepicker'
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
    </div>
  );
}

export default DatePickerWithLabel;
