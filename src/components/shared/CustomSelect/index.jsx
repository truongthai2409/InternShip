import React from 'react';
import './styles.scss';

const CustomSelect = React.forwardRef(
  (
    {
      register,
      label,
      options,
      dispatch = () => {},
      id,
      className,
      children,
      placeholder,
      requirementField = true,
      handleOnChange = false,
      subtitle,
    },
    ref
  ) => {
    // render option
    const renderSelectOption = () => {
      if (options.length > 0) {
        return options.map((item) => {
          return (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          );
        });
      }
    };
    const isErrorMessage = (children) => {
      if (typeof children === 'object') {
        return (
          (children[0] === undefined || children[1] !== undefined) &&
          (children[0] !== undefined || children[1] === undefined)
        );
      } else {
        return children === undefined;
      }
    };

    return (
      <>
        <div className={`custom-select__wrapper ${className ? className : ''}`}>
          <h1 className='custom-select__label'>
            {label}
            {requirementField && <span className='field-requirment'>*</span>}
          </h1>
          <select
            id={id}
            name={id}
            {...register(id)}
            className='select'
            required
            onChange={(e) => handleOnChange && handleOnChange(e.target.value)}
          >
            <option hidden value=''>
              {placeholder}
            </option>
            {renderSelectOption()}
          </select>
          <p className='custom-input__error'>
            {isErrorMessage(children) ? (
              <span
                style={{
                  marginTop: '2px',
                  fontSize: '12px',
                  fontStyle: 'italic',
                  color: '#999',
                  display: 'flex',
                  textAlign: 'left',
                }}
              >
                {subtitle}
              </span>
            ) : (
              <span
                style={{
                  marginTop: '2px',
                  fontSize: '13px',
                  color: '#ff5c58',
                  display: 'flex',
                  textAlign: 'left',
                }}
              >
                {children}
              </span>
              // children
            )}
          </p>
        </div>
      </>
    );
  }
);

export default CustomSelect;
