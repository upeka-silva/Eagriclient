import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";
import { Routes } from "../../routes/routes";
import {
  Button,
  IconButton,
  Popover,
  Typography,
  Avatar,
  Stack,
  useTheme,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsIcon from "@mui/icons-material/Settings";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import { useSnackBars } from "../../context/SnackBarContext";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { initiateLogout } from "../../redux/actions/login/actions";
import { useAuthContext } from "../../context/AuthContext";
import { ColorModeContext, tokens } from "../../utils/theme/app-theme";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { stringAvatar } from "../../utils/helpers/stringUtils";

const AppHeader = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [isProfileOptionsOpen, setProfileOptionsOpen] = useState(false);
  const [anchorElement, setAnchorEl] = React.useState(null);
  const [variants, setVariants] = useState({
    button1: "contained",
    button2: "outlined",
    button3: "outlined",
  });

  const { user, resetAuthContext, userProfilePic } = useAuthContext();

  const openProfileOptions = (event) => {
    setProfileOptionsOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const closeProfileOptions = () => {
    setProfileOptionsOpen(false);
    setAnchorEl(null);
  };

  // Change the variant from 'outlined' to 'contained' when the button is clicked
  const handleClick = (clickedButton) => {
    const updatedButtonVariant = {};

    // Set the clicked button to 'contained'
    updatedButtonVariant[clickedButton] = "contained";

    // Set all other buttons to 'outlined'
    for (const variant in variants) {
      if (variant !== clickedButton) {
        updatedButtonVariant[variant] = "outlined";
      }
    }

    setVariants(updatedButtonVariant);
  };

  const id = isProfileOptionsOpen ? "simple-popover" : undefined;

  const location = useLocation();
  // const handleClick= () =>{
  //   navigate("landing-page");
  // };
  const getCurrentScreenName = () => {
    let screenName = "";
    const r =
      Routes.find(
        (r) =>
          r.path === location.pathname ||
          (r?.children || [])
            .map((cr) => `${r.path}${cr?.path}`)
            .includes(location.pathname)
      ) || {};
    if (r.children) {
      screenName =
        `${r.name} > ${
          (
            r.children.find(
              (cr) => `${r.path}${cr?.path}` === location.pathname
            ) || {}
          )?.name
        }` || "";
    } else {
      screenName = r?.name || "";
    }
    return screenName;
  };

  const getPathName = () => {
    return location.pathname === "/" || !location.pathname
      ? ""
      : location.pathname;
  };

  const navigate = useNavigate();

  const { addSnackBar } = useSnackBars();

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully Logged Out",
    });
    navigate("/login");
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Logout Failed",
    });
  };

  const logoutFunc = () => {
    initiateLogout(resetAuthContext, onSuccess, onError);
  };

  const profile = () => {
    navigate("/new-user-registration");
  };

  return (
    <Wrapper className="wrapper">
      <ItemWrapper>
        <AppTitle>
          <Typography variant="h8">{getCurrentScreenName()}</Typography>         
        </AppTitle>
        <IconWrapper>
          <BreakLine>
            <hr
              style={{
                position: "absolute",
                width: "30px",
                border: "1px solid #899393",
                transform: "rotate(-90deg)",
              }}
            />
          </BreakLine>
          {/* <IconButton
            style={{ marginLeft: "20px" }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton> */}
          <IconButton style={{ marginLeft: "10px" }}>
            <NotificationsNoneIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
          <IconButton>
            <HelpOutlineIcon />
          </IconButton>
          <BreakLine>
            <hr
              style={{
                width: "30px",
                border: "1px solid #899393",
                transform: "rotate(-90deg)",
              }}
            />
          </BreakLine>
          <IconButton onClick={openProfileOptions}>
            <ProfileButton aria-describedby={id}>
              <Row>
                <Stack direction="row" spacing={2}>
                  {userProfilePic ? (
                    <Avatar
                      alt="Profile Image"
                      src={userProfilePic}
                      sx={{ width: "32px", height: "32px" }}
                    />
                  ) : (
                    <Avatar
                      {...stringAvatar(user?.userName, "ProfileImgSmall")}
                    />
                  )}
                </Stack>
                <UserName>{user?.userName || ""}</UserName>
              </Row>
              <ArrowDropDownIcon style={{ color: `${Colors.baseColor}` }} />
            </ProfileButton>
          </IconButton>
        </IconWrapper>

        <Popover
          id={id}
          open={isProfileOptionsOpen}
          {...(anchorElement && {
            anchorEl: anchorElement,
          })}
          onClose={closeProfileOptions}
          anchorOrigin={{
            width: "auto",
            vertical: "bottom",
            horizontal: 112,
          }}
          transformOrigin={{
            horizontal: "center",
          }}
        >
          <Stack justifyContent="center" alignItems="center" spacing={2} p={4}>
            {userProfilePic ? (
              <Avatar
                alt="Profile Image"
                src={userProfilePic}
                sx={{ width: "84px", height: "84px" }}
              />
            ) : (
              <Avatar {...stringAvatar(user?.userName, "ProfileImgBig")} />
            )}
            <Typography variant="h6">{user?.userName}</Typography>
            <Typography
              variant="subtitle1"
              sx={{ marginTop: "0px !important" }}
            >
              Extension Officer | Colombo
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                color="success"
                variant={variants.button1}
                onClick={() => handleClick("EN")}
              >
                EN
              </Button>
              <Button
                color="success"
                variant={variants.button2}
                onClick={() => handleClick("SI")}
              >
                SI
              </Button>
              <Button
                color="success"
                variant={variants.button3}
                onClick={() => handleClick("TA")}
              >
                TA
              </Button>
            </Stack>
            <Stack spacing={2} sx={{ marginTop: "32px !important" }}>
              <Button variant="contained" color="success" onClick={profile}>
                VIEW PROFILE
              </Button>
              <Button variant="contained" color="success" onClick={logoutFunc}>
                LOGOUT
              </Button>
            </Stack>
          </Stack>
        </Popover>
      </ItemWrapper>
    </Wrapper>
  );
};

export default AppHeader;

const Wrapper = styled(Card)`
  display: block;
  min-height: 46px;
  padding: 5px 20px;
  background: ${Colors.white};
  margin-top: 5px;
  position: sticky;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 0px;
  margin: 0px 0px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AppTitle = styled.p`
  display: flex;
  font-weight: bold;
  font-family: ${Fonts.fontStyle1};
`;

const ProfileButton = styled.div`
  width: auto;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 5px;
`;

const BreakLine = styled.div`
  display: flex;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const UserName = styled.span`
  font-size: 16px;
  color: ${Colors.baseColor};
`;
