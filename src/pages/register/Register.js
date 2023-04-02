import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import {
  Grid,
  Select,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Card,
} from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContainerWithBG from "../../components/Containers/ContainerWithBG";
import { ContainerTypes } from "../../utils/constants/containerTypes";
import styled from "styled-components";
import FormHelperText from "@mui/material/FormHelperText";

const BGImage = require("../../assets/images/background.jpg");

const theme = createTheme();

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    phone: "",
    useRole: "",
    userType: "",
    nationality: "",
    status: "",
  });

  const handleSubmit = () => {};

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
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    name="userName"
                    autoComplete="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formData.firstName}
                    onChange={handleChange}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    error={validateInputByInput(
                      "password",
                      "confirmPassword"
                    )}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={validateInputByInput(
                      "confirmPassword",
                      "password"
                    )}
                    aria-describedby="confirm-password-error"
                    size="small"
                  />
                </Grid>
{/* 
                {(validateInputByInput("password", "confirmPassword") ||
                  validateInputByInput("confirmPassword", "password")) && 
                  (
                 
                    <FormHelperText id="confirm-password-error" error>
                      Passwords do not match
                    </FormHelperText>
      
                )} */}

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="gender"
                    label="Gender"
                    id="Gender"
                    autoComplete="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Phone"
                    type="number"
                    id="phone"
                    autoComplete="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="userRole">User Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData.userRole}
                      label="User Role"
                      onChange={handleChange}
                      size="small"
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Editor">Editor</MenuItem>
                      <MenuItem value="Viewer">Viewer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="userRole">User Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData.userType}
                      label="User Type"
                      onChange={handleChange}
                      size="small"
                    >
                      <MenuItem value="Farmer">Farmer</MenuItem>
                      <MenuItem value="Extension Officer">
                        Extension Officer
                      </MenuItem>
                      <MenuItem value="Director">Director</MenuItem>
                      <MenuItem value="Researcher">Researcher</MenuItem>
                      <MenuItem value="General Public">General Public</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="nationality"
                    label="Nationality"
                    id="nationality"
                    autoComplete="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="userRole">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData.status}
                      label="Status"
                      onChange={handleChange}
                      size="small"
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                      <MenuItem value="Suspend">Suspend</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Button
                  disabled={
                    validateInputByInput("password", "confirmPassword") ||
                    validateInputByInput("confirmPassword", "password")
                  }
                >
                  Next Page
                </Button>
              </Box>
            </Box>
          </Box>
        </CustomCard>
      </ContainerWithBG>
    </ThemeProvider>
  );
};

export default Register;

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
