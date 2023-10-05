import React from "react";
import DialogBox from "../PageLayout/DialogBox";
import { ActionWrapper } from "../PageLayout/ActionWrapper";
import { Button, Divider } from "@mui/material";
import DeleteMsg from "../../utils/constants/DeleteMsg";

const DeleteDialog = ({ title, open, onConfirm, onClose }) => {
  return (
    <DialogBox
      open={open}
      title="Delete"
      actions={
        <ActionWrapper>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            sx={{ ml: "8px" }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={onClose}
            sx={{ ml: "8px" }}
          >
            No
          </Button>
        </ActionWrapper>
      }
    >
      <>
        <DeleteMsg />
        <Divider sx={{ mt: "16px" }} />
      </>
    </DialogBox>
  );
};

export default DeleteDialog;
