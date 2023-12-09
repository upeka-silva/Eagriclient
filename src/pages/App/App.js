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
import { AuthContextProvider } from "../../context/AuthContext";
import { ServiceProvider } from "../../context/ServiceContext";
const appTheme = createTheme(theme);

const App = () => {
  const userAuthenticated = useIsUserLoggedIn();

  return (
    <ServiceProvider>
      <AuthContextProvider>
        <ThemeProvider theme={appTheme}>
          <SnackBarProvider>
            <Wrapper>
              <BrowserRouter>
                <PermissionWrapper component={<SideBar />} withoutPermissions />

                <PageWrapper
                  sx={
                    userAuthenticated
                      ? "padding: 0px 2px 0px 2px; margin-top:-3px;"
                      : "padding: 0px 5px 0px 5px"
                  }
                >
                  <PermissionWrapper
                    component={<AppHeader />}
                    withoutPermissions
                  />
                  <Routes>{Router}</Routes>
                </PageWrapper>
              </BrowserRouter>
            </Wrapper>
            <SnackBars />
          </SnackBarProvider>
        </ThemeProvider>
      </AuthContextProvider>
    </ServiceProvider>
  );
};

export default App;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #fbfdf8;
`;

// Light Gray: #D3D3D3
// Gainsboro: #DCDCDC
// Light Silver: #E8E8E8
// Light Grayish Blue: #F0F0F0
// Platinum: #E5E4E2

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 170px);
  ${(props) => (props.sx ? props.sx : "")}/* padding-right: 12px; */
`;
