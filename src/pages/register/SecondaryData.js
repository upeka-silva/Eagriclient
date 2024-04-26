import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
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
  Typography,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContainerWithBG from "../../components/Containers/ContainerWithBG";
import { ContainerTypes } from "../../utils/constants/containerTypes";
import styled from "styled-components";

const BGImage = require("../../assets/images/background.jpg");
const theme = createTheme();
const steps = ["Basic information", "Advance information"];

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SecondaryData = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Select(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((preActiveStep) => preActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="userRole">Security Question 1</InputLabel>
                    <Select
                      labelId="securityQ1"
                      id="securityQ1"
                      name="securityQ1"
                      value={formData.securityQ1}
                      label="Security Question 1"
                      onChange={handleChange}
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
                  <FormControl fullWidth size="small">
                    <InputLabel id="userRole">Security Question 2</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="securityQ2"
                      name="securityQ2"
                      value={formData.securityQ2}
                      label="Security Question 2"
                      onChange={handleChange}
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
                  style={{ justifyContent: "space-between" }}
                  item
                  xs={12}
                  sm={12}
                >
                  <p>English</p>
                  <Checkbox {...label} />
                  <p>Sinhala</p>
                  <Checkbox {...label} />
                  <p>Tamil</p>
                  <Checkbox {...label} />
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

                  <Checkbox {...label} />
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

                  <Checkbox {...label} />
                </Grid>
              </Grid>
              {/* <ButtonContainer>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="primary"
                  disabled={
                    validateInputByInput("securityQ1", null) ||
                    validateInputByInput("securityQ2", null) ||
                    validateInputByInput("answer1", null) ||
                    validateInputByInput("answer2", null)
                  }
                >
                  Sign Up
                </Button>
              </ButtonContainer> */}
              <Box sx={{ width: "100%", marginTop: "20px" }}>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography
                      sx={{ mt: 2, mb: 1, textAlign: "center", color: "green" }}
                    >
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button
                        onClick={handleReset}
                        variant="contained"
                        type="submit"
                        fullWidth
                        color="primary"
                      >
                        Sign Up
                      </Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Link href="/basic-register">
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                      </Link>

                      <Box sx={{ flex: "1 1 auto" }} />

                      <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={
                          validateInputByInput("securityQ1", null) ||
                          validateInputByInput("securityQ2", null) ||
                          validateInputByInput("answer1", null) ||
                          validateInputByInput("answer2", null)
                        }
                      >
                        {activeStep === steps.length - 1
                          ? "Finish"
                          : "Next Page"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
                ˝
              </Box>
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
