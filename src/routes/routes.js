import PasswordResetPage from "../pages/Password Reset";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import EmailVerificationPage from "../pages/Email Verification";

import DashboardIcon from '@mui/icons-material/Dashboard';


export const Routes = [
    {
        path: "/password-reset",
        element: <PasswordResetPage />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/email-verification",
        element: <EmailVerificationPage />
    },
    {
        path: "/",
        name: "Dashboard",
        isSideBar: true,
        element: <Dashboard />,
        icon: DashboardIcon
    },

];