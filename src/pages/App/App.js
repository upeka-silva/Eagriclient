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
                <PageWrapper>
                  <PermissionWrapper
                    component={<AppHeader />}
                    withoutPermissions
                  />
                  {userAuthenticated ? (
                    <InnerPageWrapper>
                      <Routes>{Router}</Routes>
                    </InnerPageWrapper>
                  ) : (
                    <Routes>{Router}</Routes>
                  )}
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

const InnerPageWrapper = styled.div`
  padding: 0px 8px;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw + 160px);
  ${(props) => (props.sx ? props.sx : "")}
`;
