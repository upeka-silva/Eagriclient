import PasswordResetPage from "../pages/Password Reset";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Province from "../pages/Zones/Province/Province";
import EmailVerificationPage from "../pages/Email Verification";

import DashboardIcon from '@mui/icons-material/Dashboard';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StreetviewIcon from '@mui/icons-material/Streetview';

export const Routes = [
    {
        path: "/password-reset",
        element: <PasswordResetPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/email-verification",
        element: <EmailVerificationPage />,
    },
    {
        path: "/password-reset",
        element: <PasswordResetPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/main-dashboard",
        name: "Dashboard",
        isSideBar: true,
        element: <Dashboard />,
        icon: DashboardIcon,
    },
    {
        path: "/zone",
        name: "Zones",
        isSideBar: true,
        icon: AccountTreeIcon,
        children: [
            {
                path: "/province",
                name: "Province",
                isSideBar: true,
                element: <Province />,
                icon: CropSquareIcon
            },
            {
                path: "/district",
                name: "District",
                isSideBar: true,
                element: <Province />,
                icon: StreetviewIcon
            },
        ]
    },
];
