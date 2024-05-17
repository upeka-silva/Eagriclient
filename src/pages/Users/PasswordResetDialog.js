import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Colors } from "../../utils/constants/Colors";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Fonts } from "../../utils/constants/Fonts";
import { useSnackBars } from "../../context/SnackBarContext";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { submitPasswordReset } from "../../redux/actions/users/action";

export default function PasswordResetDialog({
  onOpen,
  onClose,
  handleChange,
  data,
  onReset,
}) {
  const { addSnackBar } = useSnackBars();

  const validatePasswords = () => {
    if (data == null) {
      addSnackBar({
        type: SnackBarTypes.error,
        message: "Please enter Passwords",
      });
      return false;
    }
    if (data?.newPassword !== data?.confirmPassword) {
      addSnackBar({
        type: SnackBarTypes.error,
        message: "Confirm password do not match. Please try again.",
      });
      return false;
    } else {
      return true;
    }
  };

  const handlePasswordReset = async () => {
    if (validatePasswords()) {
      await submitPasswordReset(data, onSuccessPassChange, onErrorPassChange);
      onClose();
    }
    onReset();
  };
  const onSuccessPassChange = () => {
    onClose();
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        "Password reset successful. You can now log in with your new password.",
    });
  };
  const onErrorPassChange = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
  };

  return (
    <Dialog
      open={onOpen}
      onClose={onClose}
      aria-labelledby="reset-password"
      aria-describedby="reset password"
    >
      <DialogTitle
        id="reset-password"
        style={{
          fontFamily: Fonts.fontStyle1,
        }}
      >
        Reset Password
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex" }}>
          <Grid
            container
            sx={{
              margin: "15px",
              width: "97%",
              borderRadius: "5px",
            }}
          >
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Old Password
                </FieldName>
                <TextField
                  type="password"
                  name="order"
                  id="order"
                  value={data?.oldPassword || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "oldPassword")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  New Password
                </FieldName>
                <TextField
                  type="password"
                  name="order"
                  id="order"
                  value={data?.newPassword || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "newPassword")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Confirm Password
                </FieldName>
                <TextField
                  type="password"
                  name="order"
                  id="order"
                  value={data?.confirmPassword || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "confirmPassword")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          autoFocus
          color="info"
          variant="contained"
          size="small"
          sx={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={(event) => handlePasswordReset(event, data)}
          color="success"
          variant="contained"
          size="small"
          sx={{ marginLeft: "20px" }}
          disabled={data?.confirmPassword == null || data?.confirmPassword == ""}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
