import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Box,
  TextField,
  Link,
  CircularProgress,
  IconButton,
  useTheme,
  Grid,
  Button,
  Card,
  ToggleButtonGroup,
  Switch,
  Fab,
  Slide,
  Fade,
} from "@mui/material/";
import Typography from "@mui/material/Typography";
import { initiateLogin } from "../../redux/actions/login/actions";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { useUserAccessValidation } from "../../hooks/authentication";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import MainLogo from "../../assets/images/DepartmentOfAgricultureLogo.png";

import InputAdornment from "@mui/material/InputAdornment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockResetIcon from "@mui/icons-material/LockReset";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

//images
import LoginBackground from "../../assets/images/loginBack.png";
import Cropix from "../../assets/images/cropixLogo.png";
import LoginSecondBack from "../../assets/images/loginSecondBack.png";

import { useAuthContext } from "../../context/AuthContext";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/system";

const Login = () => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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
      message: message || "Login Failed",
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
    navigate("/organization");
  };

  const handleChangeSwitch = (event) => {
    setIsChecked(event.target.checked);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const matches = useMediaQuery("(min-height:765px)");
  const height = matches ? "550px" : "480px";

  const cardTopMatches = useMediaQuery("(min-height: 800px)");
  const cardTopminMatches = useMediaQuery("(max-height: 670px)");
  let cardTop = cardTopMatches ? "6vw" : "3.5vw";
  cardTop = cardTopminMatches ? "1.5vw" : cardTop;

  return (
    <>
      <Fab style={{ position: "fixed", top: "22vw", left: "2vw" }}>
        <Switch
          {...label}
          onChange={handleChangeSwitch}
          color="#289e55"
          checked={isChecked}
          sx={{
            transform: "rotate(90deg)",
          }}
        />
      </Fab>

      <>
      <LoginWrapper>
        <Grid
          container
          sx={{ height: "100vh" }}
        >
          <Grid
            md={12}
            mt={1}
            mb={1}
            px={5}
            item
            sx={{
              display: "flex",
              justifyContent: "space-between",
              
              width: "20vw",
            }}
          >
            <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
              <img width={"210px"} height={"65px"} src={Cropix} alt="cropix" />
              <Typography
                ml={5}
                mt={2}
                fontWeight={"bold"}
                color={"#666666"}
                sx={{ maxWidth: "300px" }} // Limit text width
              >
                Crop Resources, Optimizing Operations <br /> through Precise
                Information, Exchange System
              </Typography>
            </Grid>

            <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
              <img width={"290px"} height={"65px"} src={MainLogo} alt="Logo" />
            </Grid>
          </Grid>

          {isChecked ? (
            <>
              {/* component 2 start */}

              <Fade in={isChecked} direction="up" timeout={500}>
                <Grid
                  item
                  container
                  md={12}
                  sx={{
                    backgroundImage: `url(${LoginSecondBack})`,
                    backgroundSize: "cover",

                    height: "100%",
                    width: "100vw",
                  }}
                >
                  <Grid item md={6} mt={30}></Grid>
                  <Grid item md={2}></Grid>
                  <Grid
                    item
                    md={4}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Card
                      sx={{
                        height: height,
                        marginTop: cardTop,
                        maxHeight: "600px",
                        maxWidth: "400px",
                        padding: "20px",
                        bgcolor: "#CCDBDC",
                        borderRadius: "20px",
                        boxShadow: "none",
                      }}
                    >
                      {initializing ? (
                        <Box>
                          <CircularProgress
                            sx={{ color: theme.coreColors.white }}
                          />
                          <Typography
                            component="h1"
                            variant="h5"
                            sx={{ mt: "16px" }}
                          >
                            Initializing
                          </Typography>
                        </Box>
                      ) : (
                        <>
                          <Box
                            sx={{
                              marginTop: 5,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              fontSize={"22px"}
                              color={"#2B5366"}
                              mb={3}
                            >
                              Sign In
                            </Typography>
                            <Box
                              component="form"
                              onSubmit={handleSubmit}
                              onValidate
                              sx={{
                                mt: 2,
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <TextField
                                margin="normal"
                                fullWidth
                                id="userName"
                                placeholder="Enter your Username"
                                name="userName"
                                type="text"
                                onChange={handleChange}
                                value={formData.userName}
                                sx={{
                                  "& .MuiInputBase-root": {
                                    height: 45,
                                    background: `#CCDBDC`,
                                    borderRadius: "10px",
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
                                    background: `#CCDBDC`,
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
                                            style={{
                                              color: `${Colors.iconColor}`,
                                            }}
                                          />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />

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
                              <Box
                                sx={{
                                  marginTop: "2vw",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Button
                                  type="submit"
                                  variant="contained"
                                  sx={{
                                    backgroundColor: "#85A497",
                                    boxShadow: "none",
                                    width: "170px",
                                    height: "35px",

                                    borderRadius: "15px",
                                    textAlign: "center",
                                    textTransform: "none",
                                    "&:hover": {
                                      backgroundColor: "#85A497",
                                      boxShadow: "none",
                                    },
                                  }}
                                >
                                  {loading ? (
                                    <CircularProgress
                                      size={20}
                                      sx={{ mt: "8px", mb: "8px" }}
                                      style={{ color: `${Colors.white}` }}
                                    />
                                  ) : (
                                    "Sign In"
                                  )}
                                </Button>
                              </Box>
                              <Box
                                sx={{ marginTop: "8vw" }}
                                display={"flex"}
                                justifyContent={"center"}
                              >
                                <Button
                                  variant="outlined"
                                  style={{
                                    borderRadius: 20,
                                    textTransform: "none",
                                    width: "150px",
                                    borderColor: "#717972",
                                    color: "#717972",
                                    marginRight: "20px",
                                  }}
                                  onClick={goFarmer}
                                >
                                  Register Farmer
                                </Button>

                                <Button
                                  variant="outlined"
                                  style={{
                                    borderRadius: 20,
                                    textTransform: "none",
                                    width: "150px",
                                    borderColor: "#717972",
                                    color: "#717972",
                                  }}
                                  onClick={goOrganization}
                                >
                                  Register Organization
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        </>
                      )}
                    </Card>
                  </Grid>
                </Grid>
              </Fade>

              {/* component 2 end */}
            </>
          ) : (
            <>
              {/* component 1 start */}
              <Slide direction="right" in={!isChecked}>
                <Grid
                  item
                  container
                  md={12}
                  sx={{
                    backgroundImage: `url(${LoginBackground})`,
                    backgroundSize: "cover",

                    height: "100%",
                    width: "100vw",
                  }}
                >
                  <Grid item md={6} mt={30}></Grid>
                  <Grid item md={2}></Grid>
                  <Grid
                    item
                    md={4}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Card
                      sx={{
                        height: height,
                        marginTop: cardTop,
                        maxHeight: "600px",
                        maxWidth: "400px",
                        padding: "20px",
                        bgcolor: "#CCDBDC",
                        borderRadius: "20px",
                        boxShadow: "none",
                      }}
                    >
                      {initializing ? (
                        <Box>
                          <CircularProgress
                            sx={{ color: theme.coreColors.white }}
                          />
                          <Typography
                            component="h1"
                            variant="h5"
                            sx={{ mt: "16px" }}
                          >
                            Initializing
                          </Typography>
                        </Box>
                      ) : (
                        <>
                          <Box
                            sx={{
                              marginTop: 5,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              fontSize={"22px"}
                              color={"#2B5366"}
                              mb={3}
                            >
                              Sign In
                            </Typography>
                            <Box
                              component="form"
                              onSubmit={handleSubmit}
                              onValidate
                              sx={{
                                mt: 2,
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <TextField
                                margin="normal"
                                fullWidth
                                id="userName"
                                placeholder="Enter your Username"
                                name="userName"
                                type="text"
                                onChange={handleChange}
                                value={formData.userName}
                                sx={{
                                  "& .MuiInputBase-root": {
                                    height: 45,
                                    background: `#CCDBDC`,
                                    borderRadius: "10px",
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
                                    background: `#CCDBDC`,
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
                                            style={{
                                              color: `${Colors.iconColor}`,
                                            }}
                                          />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />

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
                              <Box
                                sx={{
                                  marginTop: "2vw",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Button
                                  type="submit"
                                  variant="contained"
                                  sx={{
                                    backgroundColor: "#85A497",
                                    boxShadow: "none",
                                    width: "170px",
                                    height: "35px",

                                    borderRadius: "15px",
                                    textAlign: "center",
                                    textTransform: "none",
                                    "&:hover": {
                                      backgroundColor: "#85A497",
                                      boxShadow: "none",
                                    },
                                  }}
                                >
                                  {loading ? (
                                    <CircularProgress
                                      size={20}
                                      sx={{ mt: "8px", mb: "8px" }}
                                      style={{ color: `${Colors.white}` }}
                                    />
                                  ) : (
                                    "Sign In"
                                  )}
                                </Button>
                              </Box>
                              <Box
                                sx={{ marginTop: "8vw" }}
                                display={"flex"}
                                justifyContent={"center"}
                              >
                                <Button
                                  variant="outlined"
                                  style={{
                                    borderRadius: 20,
                                    textTransform: "none",
                                    width: "150px",
                                    borderColor: "#717972",
                                    color: "#717972",
                                    marginRight: "20px",
                                  }}
                                  onClick={goFarmer}
                                >
                                  Register Farmer
                                </Button>

                                <Button
                                  variant="outlined"
                                  style={{
                                    borderRadius: 20,
                                    textTransform: "none",
                                    width: "150px",
                                    borderColor: "#717972",
                                    color: "#717972",
                                  }}
                                  onClick={goOrganization}
                                >
                                  Register Organization
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        </>
                      )}
                    </Card>
                  </Grid>
                </Grid>
              </Slide>
              {/* component 1 end */}
            </>
          )}
        </Grid>
        </LoginWrapper>
      </>
    </>
  );
};

export default Login;

// const LeftWrapper = styled.div`

// `;

// const RightWrapper = styled.div`
//   display: flex;
//   flex: 1;
//   height: 100% !important;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background-color: #f3f3f3;
//   position: relative;
//   opacity: 0.97;
// `;

// const OtherLinkWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   background-color: #525c5c;
//   padding-left: 43px;
//   padding-top: 35px;
//   padding-right: 43px;
//   padding-bottom: 35px;

//   box-sizing: border-box;
//   background: rgba(82, 92, 92, 0.3);
//   border: 2px solid #000000;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//   border-radius: 31px;
//   left: 13.49%;
//   right: 43.75%;
//   top: 41.5%;
//   bottom: 45%;
//   margin-top: 80px;
// `;

// const CustomCard = styled.div`
//   margin: 0px;
//   padding: 18px 24px;
// `;

const LoginWrapper = styled.div`
 
  margin-right: -160px;
  height: 100vh;
  overflow: hidden;
`;

// const ButtonContainer = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 15px;
//   width: 372px;
//   height: 45px;
//   font-weight: 500;
//   font-size: 22px;
//   color: ${Colors.white};
//   background-color: #85a497;
//   font-family: ${Fonts.fontStyle1};
//   border: none;
//   cursor: pointer;
// `;

// const RegisterButtons = styled(ButtonContainer)`
//   background-color: #40a845;
//   font-size: 20px;
//   font-weight: 500;
//   color: #ffffff;
//   gap: 20px;
//   display: flex;
//   align-items: center;
//   padding-top: 20px;
//   padding-bottom: 20px;
//   margin-right: 10px;
//   width: 300px;

//   &:hover {
//     background-color: #168c5a;
//   }
// `;

// const Title = styled.p`
//   font-size: 20px;
//   font-weight: 700;
// `;

// const LinkWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: flex-end;
//   margin: 20px 0px;
// `;

// const ForgotPassword = styled.p`
//   font-style: italic;
//   font-size: 14px;
//   font-weight: 400;
// `;

// const AppName = styled.p`
//   display: flex;
//   justify-content: center;
//   font-size: 65px;
//   letter-spacing: 0.175em;
//   font-family: ${Fonts.fontStyle1};
//   color: ${Colors.AppName};
//   font-weight: 700;
//   text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
// `;

// const AppTitle = styled.p`
//   display: flex;
//   justify-content: center;
//   padding-left: 100px;
//   padding-right: 100px;
//   width: "80%";
//   align-items: center;
//   font-size: 25px;
//   letter-spacing: 0.175em;
//   font-family: ${Fonts.fontStyle1};
//   color: ${Colors.buttonColor};
//   font-weight: 500;
// `;

// const BGImg = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   border: 0 !important;
//   position: absolute;
//   opacity: 0.3;
//   z-index: -1;
// `;

const Image = styled.img`
  width: 40px;
  height: 40px;
`;
