import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { activeAccountThunk } from 'src/store/action/authenticate/authenticateAction';

const ActiveAccount = () => {
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
      }
    });
  }, [dispatch, token]);
  return <div>{checkActive ? <>Xac thuc thanh cong</> : <></>}</div>;
};

export default ActiveAccount;
