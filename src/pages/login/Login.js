import React, { useState } from "react";
import { createTheme} from "@mui/material/styles";
import styled from "styled-components";
import {
  Box,
  TextField,
  Link,
  CircularProgress,
  IconButton,
  useTheme,
  Grid,
} from "@mui/material/";
import Typography from "@mui/material/Typography";
import { initiateLogin } from "../../redux/actions/login/actions";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { useUserAccessValidation } from "../../hooks/authentication";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import { tokens } from "../../utils/theme/app-theme";

import InputAdornment from "@mui/material/InputAdornment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockResetIcon from "@mui/icons-material/LockReset";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Vector from "../../assets/images/Vector.png";
import Farmer from "../../assets/images/farmer.png";
import Factory from "../../assets/images/corporate.png";
import { useAuthContext } from "../../context/AuthContext";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const { addSnackBar } = useSnackBars();

  const initializing = useUserAccessValidation();

  const { updateAuthContext } = useAuthContext();

  const onSuccess = (role) => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully Logged In",
    });
    navigate(location.state?.toPath || "/main-dashboard");
  };

	const onError = (message) => {
		addSnackBar({
			type: SnackBarTypes.error,
			message: message || 'Login Failed',
		});
		setLoading(false);
	};

  const handleSubmit = (event) => {
    if (event.preventDefault) event.preventDefault();
    setLoading(true);
    initiateLogin(formData, updateAuthContext, onSuccess, onError);
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

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const goFarmer = () => {
    navigate("/temp-farmer");
  };

	const goOrganization = () => {
		navigate('/organization');
	};

  return (
    <LoginWrapper>
      <Grid container sx={{ flex: 1 }} spacing={0}>
        <Grid item sm={8}>
          <LeftWrapper>
            <BGImg src={Vector} />
            <AppName>AGRITECH PORTAL</AppName>

            <OtherLinkWrapper>
              <RegisterButtons onClick={goFarmer}>
                {/* <img src={Farmer} /> */}
                <Image src={Farmer} />
                Register Farmer
              </RegisterButtons>

              <RegisterButtons onClick={goOrganization}>
                {/* <img src={Factory} /> */}
                <Image src={Factory} />
                Register Organization
              </RegisterButtons>
            </OtherLinkWrapper>
          </LeftWrapper>
        </Grid>
        <Grid item sm={4}>
          <RightWrapper>
            <CustomCard>
              {initializing ? (
                <Box
                  maxWidth="xs"
                  sx={{
                    minWidth: "200px",
                    minHeight: "150px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress
                    sx={{ color: theme.coreColors.secondary }}
                  />
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
                    <Typography>
                      <Title>SIGN INTO YOUR ACCOUNT</Title>
                    </Typography>
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      onValidate
                      sx={{ mt: 2, display: "flex", flexDirection: "column" }}
                    >
                      <TextField
                        margin="normal"
                        fullWidth
                        id="userName"
                        placeholder="Enter your email address"
                        name="userName"
                        type="text"
                        onChange={handleChange}
                        value={formData.userName}
                        sx={{
                          "& .MuiInputBase-root": {
                            height: 45,
                            border: "1px solid #899393",
                            background: `${colors.white}`,
                            borderRadius:'15px'
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailOutlineIcon
                                style={{ color: `${Colors.iconColor}` }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        margin="normal"
                        fullWidth
                        id="password"
                        placeholder="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={handleChange}
                        value={formData.password}
                        sx={{
                          "& .MuiInputBase-root": {
                            height: 45,
                            border: "1px solid #899393",
                            background: `${Colors.white}`,
                            borderRadius:'15px'
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockResetIcon
                                style={{ color: `${Colors.iconColor}` }}
                              />
                            </InputAdornment>
                          ),

                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClick}>
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon
                                    style={{ color: `${Colors.iconColor}` }}
                                  />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <LinkWrapper>
                        <Link
                          href="#"
                          style={{
                            color: `${Colors.buttonColor}`,
                            fontSize: "14px",
                            fontWeight: 400,
                          }}
                        >
                          <ForgotPassword>Forgot password?</ForgotPassword>
                        </Link>
                      </LinkWrapper>
                      <ButtonContainer
                        type="submit"
                        fullWidth
                        disabled={
                          validateInputByInput("userName", null) ||
                          validateInputByInput("password", null) ||
                          loading
                        }
                      >
                        {loading ? (
                          <CircularProgress
                            size={20}
                            sx={{ mt: "8px", mb: "8px" }}
                          />
                        ) : (
                          "Sign In"
                        )}
                      </ButtonContainer>
                    </Box>
                  </Box>
                </>
              )}
            </CustomCard>
          </RightWrapper>
        </Grid>
      </Grid>
    </LoginWrapper>
  );
};

export default Login;

const LeftWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100% !important;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  opacity: 0.97;
`;

const RightWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100% !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f3f3f3;
  position: relative;
  opacity: 0.97;
`;

const OtherLinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #525c5c;
  padding-left: 43px;
  padding-top: 35px;
  padding-right: 43px;
  padding-bottom: 35px;
  /* width: 821px; */

  box-sizing: border-box;
  background: rgba(82, 92, 92, 0.3);
  /* mix-blend-mode: multiply; */
  border: 2px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 31px;
  left: 13.49%;
  right: 43.75%;
  top: 41.5%;
  bottom: 45%;
  margin-top: 80px;
`;

const CustomCard = styled.div`
	margin: 0px;
	padding: 18px 24px;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${Colors.white};
  font-family: ${Fonts.fontStyle1};
`;

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  width: 372px;
  height: 45px;
  font-weight: 500;
  font-size: 22px;
  color: ${Colors.white};
  /* background-color: ${Colors.buttonColor}; */
  background-color: #40a845;
  font-family: ${Fonts.fontStyle1};
  border: none;
  cursor: pointer;
`;

const RegisterButtons = styled(ButtonContainer)`
  background-color: #40a845;
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
  /* width: 351px;
	height: 91.07px; */
  gap: 20px;
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-right: 10px;
  width:300px;
  
  &:hover {
    background-color: #168c5a;
  }
`;

const ButtonWrapper = styled(ButtonContainer)`
  display: flex;
  flex-direction: row;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin: 20px 0px;
`;

const ForgotPassword = styled.p`
  font-style: italic;
  font-size: 14px;
  font-weight: 400;
`;

const AppName = styled.p`
  display: flex;
  justify-content: center;
  font-size: 40px;
  letter-spacing: 0.175em;
  font-family: ${Fonts.fontStyle1};
  color: ${Colors.AppName};
  font-weight: 700;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const BGImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 0 !important;
  position: absolute;
  opacity: 0.3;
  z-index: -1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 10px;
  align-items: center;
  background-color: ${Colors.white};
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
`;
