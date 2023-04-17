import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import SideBar from "../../components/SideBar/SideBar";
import { BrowserRouter, Routes } from "react-router-dom";
import Router from "../../routes/router";
import theme from "../../utils/theme/theme.json";
import AppHeader from "../../components/AppHeader/AppHeader"
import styled from "styled-components";
import { SnackBarProvider } from "../../context/SnackBarContext";
import SnackBars from "../../components/SnackBar/SnackBars";

const appTheme = createTheme(theme);

const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackBarProvider>
        <Wrapper className="App">
          <BrowserRouter>
            <PermissionWrapper
              component={<SideBar />}
              withoutPermissions
            />
            <PageWrapper>
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
  );
};

export default App;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #8ABFC177;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 12px;
  overflow: scroll;
`;
