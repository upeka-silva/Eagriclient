import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = ({
  open = false,
  onClose = () => {},
  title = "",
  actions = null,
  children = null,
  ...props
}) => {
  return (
    <Dialog
      {...props}
      open={open}
      TransitionComponent={Transition}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          minwidth: "350px",
          borderRadius: "20px",
          padding: "16px",
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children && <DialogContentText>{children}</DialogContentText>}
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default DialogBox;
