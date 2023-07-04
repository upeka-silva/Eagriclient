import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import SideBar from "../../components/SideBar/SideBar";
import { BrowserRouter, Routes } from "react-router-dom";
import Router from "../../routes/router";
import theme from "../../utils/theme/theme.json";
import AppHeader from "../../components/AppHeader/AppHeader";
import styled from "styled-components";
import { SnackBarProvider } from "../../context/SnackBarContext";
import SnackBars from "../../components/SnackBar/SnackBars";
import { useIsUserLoggedIn } from "../../hooks/authentication";

const appTheme = createTheme(theme);

const App = () => {
  const userAuthenticated = useIsUserLoggedIn();

  return (
    <ThemeProvider theme={appTheme}>
      <SnackBarProvider>
        <Wrapper>
          <BrowserRouter>
            <PermissionWrapper component={<SideBar />} withoutPermissions />
            <PageWrapper sx={userAuthenticated}>
              <PermissionWrapper component={<AppHeader />} withoutPermissions />
              <Routes>{Router}</Routes>
            </PageWrapper>
          </BrowserRouter>
        </Wrapper>
        <SnackBars />
      </SnackBarProvider>
    </ThemeProvider>
  );
};

export default App;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f7f7f7;
`;

// Light Gray: #D3D3D3
// Gainsboro: #DCDCDC
// Light Silver: #E8E8E8
// Light Grayish Blue: #F0F0F0
// Platinum: #E5E4E2

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px;
  ${(props) => (props.sx ? props.sx : "")}
`;
