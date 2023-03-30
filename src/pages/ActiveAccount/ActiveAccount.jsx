import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { activeAccountThunk } from 'src/store/action/authenticate/authenticateAction';

const ActiveAccount = () => {
  const nagative = useNavigate();
  const token = window.location.href.split('?').pop().split('=').pop();
  const dispatch = useDispatch();
  const [checkActive, setCheckActive] = useState(false);
  useEffect(() => {
    const formData = {
      activeToken: token,
    };
    dispatch(activeAccountThunk(formData)).then((res) => {
      if (res.payload) {
        setCheckActive(true);
        toast.success('Đã xác thực tài khoản thành công', {
          position: 'top-right',
          autoClose: 3000,
          style: { color: '#00B074', backgroundColor: '#DEF2ED' },
        });
        nagative('/login');
      }
    });
  }, [dispatch, token]);
  return <div>{checkActive ? <>Xac thuc thanh cong</> : <></>}</div>;
};

export default ActiveAccount;
