import './App.css';
import { ThemeProvider, createTheme } from '@mui/material';
import PermissionWrapper from '../../components/Permission Wrapper/PermissionWrapper';
import SideBar from '../../components/Side Bar/SideBar';
import { BrowserRouter, Routes } from 'react-router-dom';
import Router from '../../routes/router';
import theme from "../../utils/theme/theme.json";

const appTheme = createTheme(theme);

const App = () => {

  return (
    <ThemeProvider theme={appTheme}>
      <div className="App">
        <BrowserRouter>
          <PermissionWrapper
            component={<SideBar />}
            withoutPermissions
          // permission="ADD_ABC"
          // majorModule="ABC"
          />
          <Routes>
            {Router}
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
