import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContainerWithBG from "../../components/Containers/ContainerWithBG";
import styled from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Card,
  Box,
  TextField,
  Button,
  Grid,
  Link,
  // Checkbox,
  CircularProgress,
} from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ContainerTypes } from "../../utils/constants/containerTypes";
import Typography from "@mui/material/Typography";
import Copyright from "../../components/Copyright";
// import FormControlLabel from "@mui/material/FormControlLabel";
import { initiateLogin } from "../../redux/actions/login/actions";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import theme from '../../utils/theme/theme.json';
import { useUserAccessValidation } from "../../hooks/authentication";

const BGImage = require("../../assets/images/background.jpg");

const CustomTheme = createTheme();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const { addSnackBar } = useSnackBars();

  const initializing = useUserAccessValidation();

  const onSuccess = () => {
    addSnackBar({ type: SnackBarTypes.success, message: 'Successfully Logged In' })
    navigate(location.state?.toPath || '/main-dashboard');
  }

  const onError = (message) => {
    addSnackBar({ type: SnackBarTypes.error, message: message || 'Login Failed' })
    setLoading(false);
  }

  const handleSubmit = (event) => {
    if (event.preventDefault) event.preventDefault();
    setLoading(true);
    initiateLogin(formData, onSuccess, onError);
  };

  const handleChange = (event) => {
    if (event.preventDefault) event.preventDefault();
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
    <ThemeProvider theme={CustomTheme}>
      <ContainerWithBG
        background={BGImage}
        type={ContainerTypes.div}
        component="main"
        overlayColor="to top, rgba(245, 246, 252, 0.52), rgba(19, 117, 93, 0.73)"
      >
        <CssBaseline />
        <CustomCard>
          {
            initializing ? (
              <Box
                maxWidth="xs"
                sx={{
                  minWidth: "200px",
                  minHeight: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <CircularProgress sx={{ color: theme.coreColors.secondary }} />
                <Typography component="h1" variant="h5" sx={{ mt: "16px" }}>
                  Initializing
                </Typography>
              </Box>
            ) : (
              <>
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
                    Sign In
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    onValidate
                    sx={{ mt: 3 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="userName"
                      label="User Name"
                      name="userName"
                      type="text"
                      onChange={handleChange}
                      value={formData.userName}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={formData.password}
                    />
                    {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  /> */}
                    <ButtonContainer>
                      <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        color="primary"
                        disabled={
                          validateInputByInput("userName", null) ||
                          validateInputByInput("password", null) ||
                          loading
                        }
                      >
                        {
                          loading ? (
                            <CircularProgress size={20} sx={{ mt: '8px', mb: '8px' }} />
                          ) : 'Sign In'
                        }
                      </Button>
                    </ButtonContainer>
                  </Box>
                </Box>
                <Grid container sx={{ mt: "10px" }}>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 4, mb: 4 }} />
              </>
            )
          }
        </CustomCard>
      </ContainerWithBG>
    </ThemeProvider>
  );
};

export default Login;

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
