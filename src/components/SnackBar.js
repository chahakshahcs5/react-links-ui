import Snackbar from "@material-ui/core/Snackbar";
import React, { Fragment } from "react";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function toastMsg(props) {
  const handleClose = () => {
    props.close();
  };
  return (
    <Fragment>
      {props.toastMessage.message && (
        <Snackbar
          open={props.open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={`${props.toastMessage.status}`}
          >
            {props.toastMessage.message}
          </Alert>
        </Snackbar>
      )}
    </Fragment>
  );
}

export default toastMsg;
