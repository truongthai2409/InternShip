import * as React from "react";
import {
  // Button,
  Slide,
  Dialog,
  DialogTitle,
  // DialogActions,
  DialogContent,
} from "@mui/material";

import "./styles.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Modal = ({ modalTitle, open, setOpen, children, name }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        className="dialog"
      >
        <DialogTitle className={`dialog-title__${name}`}>{modalTitle}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
