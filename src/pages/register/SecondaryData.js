import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Grid,
  Select,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Card,
  TextField,
  Button,
  Avatar,
  Typography,
  Checkbox,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContainerWithBG from "../../components/Containers/ContainerWithBG";
import { ContainerTypes } from "../../utils/constants/containerTypes";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import styled from "styled-components";

const BGImage = require("../../assets/images/background.jpg");
const theme = createTheme();

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SecondaryData = () => {
  const [formData, setFormData] = useState({
    securityQ1: "",
    answer1: "",
    securityQ2: "",
    answer2: "",
    useRole: "",
    userType: "",
    status: "",
    language: "",
  });

  const handleSubmit = () => {};

  const handleChange = (event) => {
    event.preventDefault();
    setFormData((current) => ({
      ...current,
      [event?.target?.name]: event?.target?.value || "",
    }));
  };

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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="userRole">User Role</InputLabel>
                    <Select
                      labelId="userRole"
                      id="userRole"
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
                    <InputLabel id="userType">User Type</InputLabel>
                    <Select
                      labelId="userType"
                      id="userType"
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
                  <FormControl fullWidth>
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                      labelId="status"
                      id="status"
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
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="language">Language</InputLabel>
                    <Select
                      labelId="language"
                      id="language"
                      value={formData.language}
                      label="Language"
                      onChange={handleChange}
                      size="small"
                    >
                      <MenuItem value="English">English</MenuItem>
                      <MenuItem value="Sinhala">Sinhala</MenuItem>
                      <MenuItem value="Tamil">Tamil</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="userRole">Security Question 1</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="securityQ1"
                      value={formData.securityQ1}
                      label="Security Question 1"
                      onChange={handleChange}
                      size="small"
                    >
                      <MenuItem value="What primary school did you attend?">
                        What primary school did you attend?
                      </MenuItem>
                      <MenuItem value="What is the middle name of your oldest child?">
                        What is the middle name of your oldest child?
                      </MenuItem>
                      <MenuItem value="In what town or city did your parents meet?">
                        In what town or city did your parents meet?
                      </MenuItem>
                      <MenuItem value="What time of the day were you born?">
                        What time of the day were you born?
                      </MenuItem>
                      <MenuItem value="What time of the day was your first child born?">
                        What time of the day was your first child born?
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    name="answer1"
                    label="Answer"
                    type="text"
                    id="answer1"
                    value={formData.answer1}
                    onChange={handleChange}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="userRole">Security Question 1</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="securityQ2"
                      value={formData.securityQ1}
                      label="Security Question 1"
                      onChange={handleChange}
                      size="small"
                    >
                      <MenuItem value="What primary school did you attend?">
                        What primary school did you attend?
                      </MenuItem>
                      <MenuItem value="What is the middle name of your oldest child?">
                        What is the middle name of your oldest child?
                      </MenuItem>
                      <MenuItem value="In what town or city did your parents meet?">
                        In what town or city did your parents meet?
                      </MenuItem>
                      <MenuItem value="What time of the day were you born?">
                        What time of the day were you born?
                      </MenuItem>
                      <MenuItem value="What time of the day was your first child born?">
                        What time of the day was your first child born?
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    name="answer2"
                    label="Answer"
                    type="text"
                    id="answer2"
                    value={formData.answer2}
                    onChange={handleChange}
                    size="small"
                  />
                </Grid>
                <Grid
                  direction="row"
                  container
                  item
                  xs={12}
                  sm={12}
                  style={{ justifyContent: "space-between" }}
                >
                  <p>Notification</p>

                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                </Grid>
                <Grid
                  direction="row"
                  container
                  item
                  xs={12}
                  sm={12}
                  style={{ justifyContent: "space-between" }}
                >
                  <p>Two-Factor Authentication</p>

                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                </Grid>
             
              </Grid>
              <ButtonContainer>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="primary"
                  disabled={
                    validateInputByInput("securityQ1", null) ||
                    validateInputByInput("securityQ2", null) ||
                    validateInputByInput("answer1", null) ||
                    validateInputByInput("answer2", null)||
                    validateInputByInput("answer2", null)
                    
                  }
                >
                  Sign Up
                </Button>
              </ButtonContainer>
            </Box>
          </Box>
        </CustomCard>
      </ContainerWithBG>
    </ThemeProvider>
  );
};

export default SecondaryData;

const CustomCard = styled(Card).attrs((props) => ({
  sx: { maxWidth: 480, borderRadius: 6 },
}))`
  padding: 18px 24px;
  margin: 0px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
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