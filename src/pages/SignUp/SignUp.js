import React, { useState } from "react";
import styled from "styled-components";
import {
  Box,
  TextField,
  CircularProgress,
  IconButton,
  Grid,
} from "@mui/material/";
import Typography from "@mui/material/Typography";
import { useSnackBars } from "../../context/SnackBarContext";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import PhoneIcon from "@mui/icons-material/Phone";

import InputAdornment from "@mui/material/InputAdornment";
import LockResetIcon from "@mui/icons-material/LockReset";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Vector from "../../assets/images/Vector.png";
import {
  initiateSignUp,
  initiateVerifyOTP,
} from "../../redux/actions/SignUp/action";
import OTPInput from "react-otp-input";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const [showOTPField, setShowOTPField] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpsuccess, setOtpSuccess] = useState(false);

  console.log({ otp });

  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    conpassword: "",
  });

  const { addSnackBar } = useSnackBars();

  const handleChangeOTP = (otp) => {
    setOtp(otp);

    setShowOTPField(true);
  };

  const onSuccess = () => {
    setShowOTPField(true);

    if (otpsuccess) {
      addSnackBar({
        type: SnackBarTypes.success,
        message: "Successfully Verified",
      });
    } else {
      addSnackBar({
        type: SnackBarTypes.success,
        message: "Successfully Sign Up",
      });
    }
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "SignUp Failed",
    });
    setLoading(false);
  };

  const handleSubmit = (event) => {
    if (event.preventDefault) event.preventDefault();
    setLoading(true);

    if (formData.password !== formData.conpassword) {
      addSnackBar({
        type: SnackBarTypes.error,
        message: "Passwords do not match",
      });
      setLoading(false);
      return;
    }

    const signupData = {
      phoneNumber: formData.phoneNumber,
      password: formData.password,
    };

    if (!showOTPField) {
      initiateSignUp(signupData, onSuccess, onError);
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    if (event.preventDefault) event.preventDefault();
    setFormData((current) => ({
      ...current,
      [event?.target?.name]: event?.target?.value || "",
    }));
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      addSnackBar({
        type: SnackBarTypes.error,
        message: "Please enter a valid OTP",
      });
      return;
    }
    const verifyData = {
      phoneNumber: formData.phoneNumber,
      otp: otp,
    };
    initiateVerifyOTP(verifyData, onSuccess, onError);
    setOtpSuccess(true);
  };

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickConPassword = () => {
    setShowConPassword((prev) => !prev);
  };

  return (
    <LoginWrapper>
      <Grid container sx={{ flex: 1 }} spacing={0}>
        <Grid item sm={8}>
          <LeftWrapper>
            <BGImg src={Vector} />
            <AppName>CROPIX</AppName>

            <AppTitle>
              Crop Resources Optimizing operations through Precies Information
              Exchange system
            </AppTitle>
          </LeftWrapper>
        </Grid>
        <Grid item sm={4}>
          <RightWrapper>
            <CustomCard>
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
                    <Title>
                      {" "}
                      {showOTPField ? "ENTER OTP CODE" : "SIGN UP YOUR ACCOUNT"}
                    </Title>
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    onValidate
                    sx={{ mt: 2, display: "flex", flexDirection: "column" }}
                  >
                    {/* OTP field */}
                    {showOTPField ? (
                      <Grid>
                        <OTPInput
                          value={otp}
                          onChange={handleChangeOTP}
                          numInputs={6}
                          renderSeparator={<span> - </span>}
                          renderInput={(props) => (
                            <input
                              {...props}
                              style={{
                                width: "34px",
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
                      </Grid>
                    ) : (
                      <>
                        <TextField
                          margin="normal"
                          fullWidth
                          id="phoneNumber"
                          placeholder="Enter your Contact Number"
                          name="phoneNumber"
                          type="number"
                          onChange={handleChange}
                          value={formData.phoneNumber}
                          sx={{
                            "& .MuiInputBase-root": {
                              height: 45,
                              background: `${Colors.white}`,
                              borderRadius: "10px",
                            },
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon
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
                              background: `${Colors.white}`,
                              borderRadius: "10px",
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

                        <TextField
                          margin="normal"
                          fullWidth
                          id="conpassword"
                          placeholder="Confirm Password"
                          name="conpassword"
                          type={showConPassword ? "text" : "password"}
                          onChange={handleChange}
                          value={formData.conpassword}
                          sx={{
                            "& .MuiInputBase-root": {
                              height: 45,
                              background: `${Colors.white}`,
                              borderRadius: "10px",
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
                                <IconButton onClick={handleClickConPassword}>
                                  {showConPassword ? (
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
                      </>
                    )}

                    {/* <LinkWrapper>
                        <Link
                          href="#"
                          style={{
                            color: `${Colors.buttonColor}`,
                            fontSize: "12px",
                            fontWeight: 400,
                          }}
                        >
                          <ForgotPassword>Forgot password?</ForgotPassword>
                        </Link>
                      </LinkWrapper> */}
                    <Box sx={{ mt: 3 }}>
                      {showOTPField ? (
                        <>
                          <ButtonContainer onClick={handleVerifyOtp} fullWidth>
                            {loading ? (
                              <CircularProgress
                                size={20}
                                sx={{ mt: "8px", mb: "8px" }}
                                style={{ color: `${Colors.white}` }}
                              />
                            ) : (
                              "Verify"
                            )}
                          </ButtonContainer>
                        </>
                      ) : (
                        <>
                          <ButtonContainer type="submit" fullWidth>
                            {loading ? (
                              <CircularProgress
                                size={20}
                                sx={{ mt: "8px", mb: "8px" }}
                                style={{ color: `${Colors.white}` }}
                              />
                            ) : (
                              "Sign Up"
                            )}
                          </ButtonContainer>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </>
            </CustomCard>
          </RightWrapper>
        </Grid>
      </Grid>
    </LoginWrapper>
  );
};

export default SignUp;

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

  box-sizing: border-box;
  background: rgba(82, 92, 92, 0.3);
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
  margin-right: -160px;
  height: 100vh;
`;

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  width: 372px;
  height: 45px;
  font-weight: 500;
  font-size: 22px;
  color: ${Colors.white};
  background-color: ${Colors.baseColor};
  font-family: ${Fonts.fontStyle1};
  border: none;
  cursor: pointer;
`;

const RegisterButtons = styled(ButtonContainer)`
  background-color: #40a845;
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
  gap: 20px;
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-right: 10px;
  width: 300px;

  &:hover {
    background-color: #168c5a;
  }
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
  font-size: 65px;
  letter-spacing: 0.175em;
  font-family: ${Fonts.fontStyle1};
  color: ${Colors.AppName};
  font-weight: 700;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const AppTitle = styled.p`
  display: flex;
  justify-content: center;
  padding-left: 100px;
  padding-right: 100px;
  width: "80%";
  align-items: center;
  font-size: 25px;
  letter-spacing: 0.175em;
  font-family: ${Fonts.fontStyle1};
  color: ${Colors.buttonColor};
  font-weight: 500;
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

const Image = styled.img`
  width: 40px;
  height: 40px;
`;
