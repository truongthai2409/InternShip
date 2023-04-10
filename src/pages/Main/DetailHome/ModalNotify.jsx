import React from 'react';
import Button from 'src/components/shared/Button';
import { useNavigate } from 'react-router-dom';

const ModalNotify = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };
  return (
    <div className='modalNotify'>
      <h2>Bạn cần đăng nhập để ứng tuyển công việc này</h2>
      <Button
        name={'Đăng nhập'}
        bwidth='211px'
        bheight='46px'
        padding='12px 32px'
        bg='#00B074'
        fz='17px'
        onClick={() => handleClick()}
      ></Button>
    </div>
  );
};

export default ModalNotify;
