import * as React from "react";
import {
  Button,
  DialogTitle,
  DialogContentText,
  TextField,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";

const Popup = ({ handleClose }) => {
  return (
    <>
      <DialogTitle>ADD NEW USER ROLE</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>
            sample text.....sample text......sample text.......sample text
          </Typography>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="role"
          placeholder="Add new role"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          <Typography>Cancel</Typography>
        </Button>
        <Button onClick={handleClose}>
          <Typography>Submit</Typography>
        </Button>
      </DialogActions>
    </>
  );
};

export default Popup;
