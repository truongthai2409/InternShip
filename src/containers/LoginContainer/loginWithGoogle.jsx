import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserById } from 'src/store/slices/main/user/userSlice';

const LoginWithGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUrl = window.location.href
    ? window.location.href.split('?')[1]
    : '';
  const cutString = {
    token: currentUrl.split('&')[0].split('=')[1],
    id: currentUrl.split('&')[5].split('=')[1],
  };
  useEffect(() => {
    dispatch(
      getUserById(
        JSON.stringify({
          role: 'Role_Candidate',
          ids: cutString.id,
          google: true,
        })
      )
    )
      .then((res) => {
        localStorage.setItem(
          'userPresent',
          JSON.stringify({
            token: cutString.token,
            ids: cutString.id,
            google: true,
          })
        );
        navigate(`/candidate`, { replace: true });
      })
      .catch((err) => console.log(err));
  }, []);
  return <></>
};

export default LoginWithGoogle;
