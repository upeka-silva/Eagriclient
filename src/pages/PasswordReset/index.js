import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowRightAltSharpIcon from "@mui/icons-material/ArrowRightAltSharp";
import Typography from "@mui/material/Typography";
import ContainerWithBG from "../../components/Containers/ContainerWithBG";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../components/Copyright";
import FormHelperText from "@mui/material/FormHelperText";
import { ContainerTypes } from "../../utils/constants/containerTypes";
import Card from "@mui/material/Card";
import { Colors } from "../../utils/constants/Colors";
import styled from "styled-components";

const BGImage = require("../../assets/images/background.jpg");

const theme = createTheme();

const PasswordResetPage = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setFormData((current) => ({
      ...current,
      [event?.target?.name]: event?.target?.value || "",
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const validateInputByInput = (feild, target) => {
    const current = { ...formData };
    if (!feild) {
      return false;
    } else {
      if (!!target) {
        if (!!current[feild] && current[target] === current[feild]) {
          return false;
        }
      } else {
        if (!!current[feild]) {
          return false;
        }
      }
      return true;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ContainerWithBG
        background={BGImage}
        type={ContainerTypes.div}
        component="main"
        overlayColor="to top, rgba(245, 246, 252, 0.52), rgba(19, 117, 93, 0.73)"
      >
        <CssBaseline />
        <CustomCard>
          <Box
            maxWidth="xs"
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="old-password"
                label="Old Password"
                name="oldPassword"
                type="password"
                autoComplete="current-password"
                autoFocus
                onChange={handleChange}
                value={formData.oldPassword}
                aria-describedby="old-password-error"
                error={validateInputByInput("oldPassword", null)}
              />
              {validateInputByInput("oldPassword", null) && (
                <FormHelperText id="old-password-error" error>
                  Please enter your old password
                </FormHelperText>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="new-password"
                autoComplete="password"
                onChange={handleChange}
                value={formData.newPassword}
                error={validateInputByInput("newPassword", "confirmPassword")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="password"
                onChange={handleChange}
                value={formData.confirmPassword}
                error={validateInputByInput("confirmPassword", "newPassword")}
                aria-describedby="confirm-password-error"
              />
              {(validateInputByInput("newPassword", "confirmPassword") ||
                validateInputByInput("confirmPassword", "newPassword")) && (
                <FormHelperText id="confirm-password-error" error>
                  Passwords do not match
                </FormHelperText>
              )}
              <ButtonContainer>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, minHeight: 50, maxWidth: 260 }}
                  disabled={
                    validateInputByInput("oldPassword", null) ||
                    validateInputByInput("newPassword", "confirmPassword") ||
                    validateInputByInput("confirmPassword", "newPassword")
                  }
                >
                  Reset Password
                  {validateInputByInput("oldPassword", null) ||
                  validateInputByInput("newPassword", "confirmPassword") ||
                  validateInputByInput("confirmPassword", "newPassword") ? (
                    <>
                      &nbsp;
                      <LockOutlinedIcon fontSize="small" />
                    </>
                  ) : (
                    <>
                      &nbsp;
                      <ArrowRightAltSharpIcon />
                    </>
                  )}
                </Button>
              </ButtonContainer>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </CustomCard>
      </ContainerWithBG>
    </ThemeProvider>
  );
};

export default PasswordResetPage;

const CustomCard = styled(Card).attrs((props) => ({
  sx: { maxWidth: 480, borderRadius: 6 },
}))`
  padding: 18px 24px;
  margin: 0px;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
