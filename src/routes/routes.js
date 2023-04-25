import PasswordResetPage from "../pages/PasswordReset";
import Login from "../pages/login/Login";
import Register from "../pages/register/BasicData";
import SecondaryData from "../pages/register/SecondaryData";
import Dashboard from "../pages/Dashboard/Dashboard";
import Province from "../pages/Zones/Province/Province";
import EmailVerificationPage from "../pages/EmailVerification";
import InterProvince from "../pages/Agri-Zones/inter-province/InterProvince";
import InterProvinceForm from "../pages/Agri-Zones/inter-province/InterProvinceForm";
import ProvinceArea from "../pages/Agri-Zones/province/ProvinceArea";
import ProvinceAreaForm from "../pages/Agri-Zones/province/ProvinceAreaForm";
import Actions from "../pages/Actions/Actions";
import Components from "../pages/Components/Components";
import ComponentForm from "../pages/Components/ComponentForm";
import ASC from "../pages/Zones/ASC/ASC";
import ASCForm from "../pages/Zones/ASC/ASCForm";
import Soil from "../pages/Soil/Soil";
import SoilForm from "../pages/Soil/SoilForm";
import Permissions from "../pages/Permissions/Permissions";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StreetviewIcon from "@mui/icons-material/Streetview";
import LockIcon from '@mui/icons-material/Lock';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import WaterIcon from '@mui/icons-material/Water';
import KeyIcon from '@mui/icons-material/Key';


export const Routes = [
  {
    path: "/password-reset",
    element: <PasswordResetPage />,
  },
  {
    path: "/",
    element: <Login />,
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
      {
        path: "/asc-area",
        name: "ASC",
        isSideBar: true,
        element: <ASC />,
        icon: MyLocationIcon,
      },
      {
        path: "/asc-area-form",
        name: "ASC Form",
        isSideBar: false,
        element: <ASCForm />,
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
  {
    path: '/authentication',
    name: "Authentication",
    isSideBar: true,
    icon: LockIcon,
    children: [
      {
        path: "/actions",
        name: "Actions",
        isSideBar: true,
        icon: HighlightAltIcon,
        element: <Actions />,
      },
      {
        path: "/components",
        name: "Components",
        isSideBar: true,
        icon: ViewModuleIcon,
        element: <Components />,
      },
      {
        path: "/component-form",
        name: "Component Form",
        isSideBar: false,
        element: <ComponentForm />,
      },
      {
        path: "/permissions",
        name: "Permissions",
        isSideBar: true,
        icon: KeyIcon,
        element: <Permissions />,
      },
    ]
  },
  {
    path: "/soil",
    name: "Soil",
    isSideBar: true,
    icon: WaterIcon,
    element: <Soil />,
  },
  {
    path: "/soil/soil-form",
    name: "Soil Form",
    element: <SoilForm />,
  },
];
