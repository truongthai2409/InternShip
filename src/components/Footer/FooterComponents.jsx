import { Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';

const FooterComponents = ({ title, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='footer_components'>
      <Typography className='footer_title' variant='h3'>
        {title}
      </Typography>
      <Divider />
      <div className='footer_children'>{children}</div>
    </div>
  );
};

export default FooterComponents;
