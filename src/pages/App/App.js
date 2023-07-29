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

const appTheme = createTheme(theme);

const App = () => {
  const userAuthenticated = useIsUserLoggedIn();

  return (
    <AuthContextProvider>
      <ThemeProvider theme={appTheme}>
        <SnackBarProvider>
            <BrowserRouter>
            <PermissionWrapper
                  component={<AppHeader />}
                  withoutPermissions
                />
              
              <PageWrapper              >
                <PermissionWrapper component={<SideBar />} withoutPermissions />
                <Routes>{Router}</Routes>
              </PageWrapper>
            </BrowserRouter>
          
          <SnackBars />
        </SnackBarProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default App;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #e5e4e2;
`;

// Light Gray: #D3D3D3
// Gainsboro: #DCDCDC
// Light Silver: #E8E8E8
// Light Grayish Blue: #F0F0F0
// Platinum: #E5E4E2

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  ${(props) => (props.sx ? props.sx : "")}
`;