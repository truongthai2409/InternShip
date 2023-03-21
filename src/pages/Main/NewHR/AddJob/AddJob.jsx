import React from 'react';
import HrForm from './Form';
import './styles.scss'

const AddJob = () => {
  return (
    <div className='hr__post'>
      <h2>Đăng tin tuyển dụng mới</h2>
      <HrForm />
    </div>
  );
};

export default AddJob;
