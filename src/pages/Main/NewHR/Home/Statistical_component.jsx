import React from 'react';
import './styles.scss';

const Statistical = ({ number, title }) => {
  return (
    <div className='statistical'>
      <h1>{number}</h1>
      <p>{title}</p>
    </div>
  );
};

export default Statistical;
