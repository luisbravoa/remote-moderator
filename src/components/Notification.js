import React from "react";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const Notification = ({ open, handleClose, message }) => {

  return (
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message || ''}</span>}
        action={[
          <Button key="undo" color="secondary" size="small"
          onClick={handleClose}
          >
            Close
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            // className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
  )
};


export default Notification;