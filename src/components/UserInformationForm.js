import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export const UserInformationForm = ({ onUsernameSet, showDialog }) => {
  const [username, setUsername] = useState("");

  const [open, setOpen] = React.useState(showDialog);

  // const onFormSubmit = event => {
  //   event.preventDefault();
  //   onUsernameSet(username);
  // };

  const onChange = event => {
    setUsername(event.target.value);
  };

  const handleClose = () => {
      onUsernameSet(username);
      setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter your name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="email"
            fullWidth
            onChange={onChange}
            value={username}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
