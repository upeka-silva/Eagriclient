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
import InterProvince from "../pages/Agri-Zones/inter-province/InterProvince";
import InterProvinceForm from "../pages/Agri-Zones/inter-province/InterProvinceForm";
import ProvinceArea from "../pages/Agri-Zones/province/ProvinceArea";
import ProvinceAreaForm from "../pages/Agri-Zones/province/ProvinceAreaForm";


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
        path: "/district",
        name: "District",
        isSideBar: true,
        element: <Province />,
        icon: StreetviewIcon,
      },
    ],
  },
  {
    path: "/agri-zone",
    name: "Agriculture Zones",
    isSideBar: true,
    icon: AccountTreeIcon,
    children: [
      {
        path: "/province-area",
        name: "Province Area",
        isSideBar: true,
        icon: CropSquareIcon,
        element: <ProvinceArea />,
      },
      {
        path: "/province-area-form",
        name: "Province Area Form",
        isSideBar: false,
        icon: CropSquareIcon,
        element: <ProvinceAreaForm />,
      },
      {
        path: "/inter-province-area",
        name: "Inter Provinces Area",
        isSideBar: true,
        icon: CropSquareIcon,
        element: <InterProvince />,
      },
      {
        name: "Inter Province Area Form",
        path: "/inter-province-area-form",
        element: <InterProvinceForm />,
        isSideBar: false,
      },
    ],
  },
];
