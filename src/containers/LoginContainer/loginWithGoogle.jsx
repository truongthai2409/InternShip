import React, { useState } from 'react';

const loginWithGoogle = () => {
  // console.log(window.location)
  const currentUrl = window.location.href
    ? window.location.href.split('?')[1]
    : '';
  const cutString = {
    returnUrl: currentUrl.split('&')[0].split('=')[1],
    username: currentUrl.split('&')[1].split('=')[1],
    authKey: currentUrl.split('&')[2].split('=')[1],
  };
  console.log(cutString);

  // const [returnUrl, setReturnUrl] = useState()
  return <div>loginWithGoogle</div>;
};

export default loginWithGoogle;
