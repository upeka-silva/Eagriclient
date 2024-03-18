import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { Fonts } from "../../../utils/constants/Fonts";
import { Colors } from "../../../utils/constants/Colors";
import OTPInput from "react-otp-input";

export default function OTPDialog({
  open,
  handleClose,
  ConfirmAction,
  otp,
  changeOTP,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-object"
      aria-describedby="delete-description"
    >
      <DialogTitle
        id="delete-object"
        style={{
          fontFamily: Fonts.fontStyle1,
        }}
      >
        {"Enter Your OTP"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex" }}>
          <FieldWrapper
            style={{
              flexDirection: "column",
              flex: "1 1 264px",
              gap: "0",
              marginInline: "5px",
              fontFamily: Fonts.fontStyle1,
            }}
          >
            <FieldName
              style={{
                width: "100%",
              }}
            >
              OTP
            </FieldName>
            {/* <TextField
              name="seasonId"
              id="seasonId"
              value={otp}
              size="small"
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              onChange={(e) => {
                changeOTP(e.target.value);
              }}
            /> */}

            <OTPInput
              value={otp}
              onChange={changeOTP}
              numInputs={6}
              renderSeparator={<span> - </span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: "40px",
                    height: "50px",
                    margin: "0 10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    textAlign: "center",
                    fontSize: "20px",
                    color: "#333",
                    background: "#f7f7f7",
                    outline: "none",
                  }}
                />
              )}
            />

            {/* <Button sx={{ marginTop: "20px" }}>Resend Otp Again</Button> */}
          </FieldWrapper>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          No
        </Button>
        <Button onClick={ConfirmAction}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
