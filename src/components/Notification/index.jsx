import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch } from "react-redux";

const Notification = (props) => {
  const { notifyAlert, ...other } = props;
  //console.log("notifyAlert", notifyAlert);
  const dispatch = useDispatch();

  const handleCloseNotification = () => {
    dispatch({
      type: "CLOSE_NOTIFICATION",
      payload: false,
    });
  };

  return (
    <Snackbar
      open={notifyAlert.open}
      onClose={handleCloseNotification}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={2000}
    >
      <Alert severity={notifyAlert.severity} onClose={handleCloseNotification}>
        {notifyAlert.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
