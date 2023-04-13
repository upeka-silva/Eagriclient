import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import SideBar from "../../components/SideBar/SideBar";
import { BrowserRouter, Routes } from "react-router-dom";
import Router from "../../routes/router";
import theme from "../../utils/theme/theme.json";
import AppHeader from "../../components/AppHeader/AppHeader"
import styled from "styled-components";
import './App.css';

const appTheme = createTheme(theme);

const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <div className="App">
        <BrowserRouter>
          <PermissionWrapper
            component={<SideBar />}
            // withoutPermissions
            // withoutPermissions
            // permission="ADD_ABC"
            // majorModule="ABC"
          />
          <PageWrapper sx={PermissionWrapper({ component: 'padding-right: 12px;' }) || ''}>
            <PermissionWrapper
              component={<AppHeader />}
              // withoutPermissions
              // permission="ADD_ABC"
              // majorModule="ABC"
            />
            <Routes>{Router}</Routes>
          </PageWrapper>
        </BrowserRouter>
      </div>
      <div>
        <BrowserRouter>
          <Routes>{Router}</Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${props => props.sx}
  overflow: scroll;
`;
