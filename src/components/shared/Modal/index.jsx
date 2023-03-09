import * as React from 'react';
import { Slide, Dialog, DialogTitle, DialogContent } from '@mui/material';

import './styles.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const Modal = ({
  modalTitle,
  open,
  setOpen,
  name,
  children,
  iconClose = false,
  className,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        className={`dialog ${className ? className : ''}`}
      >
        <DialogTitle className={`dialog-title dialog-title__${name}`}>
          {modalTitle}
          {iconClose && (
            <p style={{ cursor: 'pointer' }} onClick={() => handleClose()}>
              X
            </p>
          )}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
