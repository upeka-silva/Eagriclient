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
import { DEF_ACTIONS } from "../../utils/constants/permission";

export default function PasswordChangeDialog({
  open,
  handleClose,
  confirmAction,
  email
}) {
  const [formDataD, setformDataD] = useState({});

  useEffect(() => {
    console.log('email -----------> : ' + email);
    setformDataD((current = {}) => {
      let newData = { ...current };
      newData['email'] = email;
      return newData;
    });
  }, []);

  const handleChange = (value, target) => {
    setformDataD((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="change-password"
      aria-describedby="change password"
    >
      <DialogTitle
        id="change-password"
        style={{
          fontFamily: Fonts.fontStyle1,
        }}
      >
        Change Password
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
                  User Name
                </FieldName>
                <TextField
                  name="order"
                  id="order"
                  value={formDataD?.userName || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "userName")
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
                  Old Password
                </FieldName>
                <TextField
                  type="password"
                  name="order"
                  id="order"
                  value={formDataD?.oldPassword || ""}
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
                  value={formDataD?.newPassword || ""}
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
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          autoFocus
          color="info"
          variant="contained"
          size="small"
          sx={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={(event) => confirmAction(event, formDataD)}
          color="success"
          variant="contained"
          size="small"
          sx={{ marginLeft: "20px" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
