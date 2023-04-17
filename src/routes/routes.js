import PasswordResetPage from "../pages/PasswordReset";
import Login from "../pages/login/Login";
import Register from "../pages/register/BasicData";
import SecondaryData from "../pages/register/SecondaryData";
import Dashboard from "../pages/Dashboard/Dashboard";
import Province from "../pages/Zones/Province/Province";
import EmailVerificationPage from "../pages/EmailVerification";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StreetviewIcon from "@mui/icons-material/Streetview";
import InterProvince from "../pages/Zones/Inter Province/InterProvince";

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
    path: "/basic-register",
    element: <Register />,
  },
  {
    path: "/secondary-register",
    element: <SecondaryData />,
  },
  {
    path: "/email-verification",
    element: <EmailVerificationPage />,
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
        icon: CropSquareIcon,
      },
      {
        path: "/inter-province",
        name: "Inter Province",
        isSideBar: true,
        icon: CropSquareIcon,
        element: <InterProvince />,
      },
      {
        path: "/district",
        name: "District",
        isSideBar: true,
        element: <Province />,
        icon: StreetviewIcon,
      },
    ],
  },
];
