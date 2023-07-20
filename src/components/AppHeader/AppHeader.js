import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";
import { Routes } from "../../routes/routes";
import { Button, IconButton, Popover } from "@mui/material";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitIcon from "@mui/icons-material/ExitToApp";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import { useSnackBars } from "../../context/SnackBarContext";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { initiateLogout } from "../../redux/actions/login/actions";
import { useAuthContext } from "../../context/AuthContext";

const ProfileImg = require("../../assets/images/profileImg.png");

const AppHeader = () => {
  const [isProfileOptionsOpen, setProfileOptionsOpen] = useState(false);
  const [anchorElement, setAnchorEl] = React.useState(null);

  const { user, resetAuthContext } = useAuthContext();

  const openProfileOptions = (event) => {
    setProfileOptionsOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const closeProfileOptions = () => {
    setProfileOptionsOpen(false);
    setAnchorEl(null);
  };

  const id = isProfileOptionsOpen ? "simple-popover" : undefined;

  const location = useLocation();

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
        `${r.name} ● ${
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

  return (
    <Wrapper>
      <ItemWrapper>
        <AppTitle>
          E-EXTENSION SYSTEM
          {/* <Typography variant="h6">{getCurrentScreenName()}</Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: `${theme.coreColors.primary}` }}
          >
            {getPathName()}
          </Typography> */}
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

          <IconButton style={{ marginLeft: "30px" }}>
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
            <ProfileButton>
              <Row>
                <ProfileImage src={ProfileImg} />
                <UserName>{user?.userName || ""}</UserName>
              </Row>
              <ArrowDropDownIcon style={{ color: `${Colors.white}` }} />
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
            horizontal: "right",
          }}
        >
          <div>
            <Button variant="text" startIcon={<ProfileIcon />}>
              Profile
            </Button>

            <br />
            <Button
              onClick={logoutFunc}
              variant="text"
              startIcon={<ExitIcon />}
            >
              Logout
            </Button>
          </div>
        </Popover>
      </ItemWrapper>
    </Wrapper>
  );
};

export default AppHeader;

const Wrapper = styled(Card)`
  display: block;
  min-height: 56px;
  margin: 6px 0px;
  padding: 0px 30px;
  box-shadow: ${Colors.shadow};
  background: ${Colors.white};
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
  background-color: ${Colors.profileButtonBGColor};
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  margin-right: 8px;
`;

const ProfileImage = styled.img``;

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
  color: ${Colors.white};
`;
