import PasswordResetPage from "../pages/PasswordReset";
import Login from "../pages/login/Login";
import Register from "../pages/register/BasicData";
import SecondaryData from "../pages/register/SecondaryData";
import Dashboard from "../pages/Dashboard/Dashboard";

import EmailVerificationPage from "../pages/EmailVerification";
import InterProvince from "../pages/Agri-Zones/inter-province/InterProvince";
import InterProvinceForm from "../pages/Agri-Zones/inter-province/InterProvinceForm";
import ProvinceArea from "../pages/Agri-Zones/province/ProvinceArea";
import ProvinceAreaForm from "../pages/Agri-Zones/province/ProvinceAreaForm";
import Actions from "../pages/Actions/Actions";
import Components from "../pages/Components/Components";
import ComponentForm from "../pages/Components/ComponentForm";
import ASC from "../pages/DAD-Structure/ASC/ASC";
import ASCForm from "../pages/DAD-Structure/ASC/ASCForm";
import Soil from "../pages/Soil/Soil-Type/SoilType";
import SoilForm from "../pages/Soil/Soil-Type/SoilTypeForm";
import Permissions from "../pages/Permissions/Permissions";
import Province from "../pages/Zones/Province/Province";
import ProvinceForm from "../pages/Zones/Province/ProvinceForm";
import District from "../pages/Zones/District/District";
import DistrictForm from "../pages/Zones/District/DistrictForm";
import DsDivision from "../pages/Zones/DS/DsDivision";
import DsDivisionForm from "../pages/Zones/DS/DsDivisionForm";
import GnDivision from "../pages/Zones/GN/GnDivision";
import GnDivisionForm from "../pages/Zones/GN/GnDivisionForm";
import ARPA from "../pages/DAD-Structure/ARPA/ARPA";
import ARPAForm from "../pages/DAD-Structure/ARPA/ARPAForm";
import AI from "../pages/Agri-Zones/AI/AI";
import AIForm from "../pages/Agri-Zones/AI/AIForm";
import AgroEco from "../pages/Agro-Eco-zone/Agro-Eco/AgroEco";
import AgroEcoForm from "../pages/Agro-Eco-zone/Agro-Eco/AgroEcoForm";

import CropCategory from "../pages/Crop/CropCategory/CropCategory";
import CropCategoryForm from "../pages/Crop/CropCategory/CropCategoryForm";
import CropSubCategory from "../pages/Crop/CropSubCategory/CropSubCategory";
import CropSubCategoryForm from "../pages/Crop/CropSubCategory/CropSubCategoryForm";

import MahaweliBlockForm from "../pages/Mahaweli-System/Mahaweli-Block/MahaweliBlockForm";
import MahaweliBlock from "../pages/Mahaweli-System/Mahaweli-Block/MahaweliBlock";

import SoilSubType from "../pages/Soil/Soil-Sub-Type/SoilSubType";
import SoilSubTypeForm from "../pages/Soil/Soil-Sub-Type/SoilSubTypeForm";
import InstitutionCategory from "../pages/Institution/InstitutionCategory/InstitutionCategory";
import InstitutionCategoryForm from "../pages/Institution/InstitutionCategory/InstitutionCategoryForm";
import Institution from "../pages/Institution/Institution/Institution";
import InstitutionForm from "../pages/Institution/Institution/InstitutionForm";
import VerifyRegistration from "../pages/VerifyRegistration/VerifyRegistration";

import SoilTest from "../pages/Soil & Water Tests/Soil/SoilTest";
import SoilTestFrom from "../pages/Soil & Water Tests/Soil/SoilTestFrom";
import WaterTest from "../pages/Soil & Water Tests/water/WaterTest";
import WaterTestForm from "../pages/Soil & Water Tests/water/WaterTestForm";
import AgriSeason from "../pages/Agri-Season/AgriSeason";
import AgriSeasonForm from "../pages/Agri-Season/AgriSeasonForm";

import TempFarmer from "../pages/Temp-Farmer/Farmer";
import FarmLand from "../pages/Farm-Land/FarmLand";
import FarmLandForm from "../pages/Farm-Land/FarmLandForm";

import Farmer from "../pages/Farmer/Farmer";
import FarmerForm from "../pages/Farmer/FarmerForm";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StreetviewIcon from "@mui/icons-material/Streetview";
import LockIcon from "@mui/icons-material/Lock";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import WaterIcon from "@mui/icons-material/Water";
import KeyIcon from "@mui/icons-material/Key";
import ForestIcon from "@mui/icons-material/Forest";
import SpaIcon from "@mui/icons-material/Spa";
import ParkIcon from "@mui/icons-material/Park";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";
import WaterDamageIcon from "@mui/icons-material/WaterDamage";
import GiIsland from "@mui/icons-material/WaterDamage";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import WindPowerIcon from "@mui/icons-material/WindPower";

import Organization from "../pages/Organization/Organization";
import { PeopleAlt } from "@mui/icons-material";

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
    path: "/verifyRegistration?/:token",
    element: <VerifyRegistration />,
  },

  {
    path: "/organization",
    element: <Organization />,
  },

  {
    path: "/temp-farmer",
    element: <TempFarmer />,
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
    name: "Geological Zone",
    isSideBar: true,
    icon: AccountTreeIcon,
    children: [
      {
        path: "/ga-structure",
        name: "General Admin Structure",
        isSideBar: true,
        children: [
          {
            path: "/province",
            name: "Province",
            isSideBar: true,
            element: <Province />,
            icon: CropSquareIcon,
          },
          {
            path: "/province-form",
            name: "Province Form",
            isSideBar: false,
            element: <ProvinceForm />,
          },
          {
            path: "/district",
            name: "District",
            isSideBar: true,
            element: <District />,
            icon: StreetviewIcon,
          },
          {
            path: "/district-form",
            name: "District Form",
            isSideBar: false,
            element: <DistrictForm />,
          },
          {
            path: "/ds-division",
            name: "DS Division",
            isSideBar: true,
            element: <DsDivision />,
            icon: StreetviewIcon,
          },
          {
            path: "/ds-division-form",
            name: "DS Division Form",
            isSideBar: false,
            element: <DsDivisionForm />,
          },
          {
            path: "/gn-division",
            name: "GN Division",
            isSideBar: true,
            element: <GnDivision />,
            // icon: StreetviewIcon,
          },
          {
            path: "/gn-division-form",
            name: "GN Division Form",
            isSideBar: false,
            element: <GnDivisionForm />,
          },
        ],
      },
      {
        path: "/aa-structure",
        name: "Agri Admin Structure",
        isSideBar: true,
        children: [
          {
            path: "/ai-region",
            name: "AI Region",
            isSideBar: true,
            element: <AI />,
            icon: MyLocationIcon,
          },
          {
            path: "/ai-region-form",
            name: "ASC Form",
            isSideBar: false,
            element: <AIForm />,
          },
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
        path: "/dad-structure",
        name: "DAD Structure",
        isSideBar: true,
        children: [
          {
            path: "/asc-area",
            name: "ASC Area",
            isSideBar: true,
            element: <ASC />,
            icon: CropSquareIcon,
          },
          {
            path: "/asc-area-form",
            name: "ASC Area Form",
            isSideBar: false,
            element: <ASCForm />,
          },
          {
            path: "/arpa-area",
            name: "ARPA Area",
            isSideBar: true,
            element: <ARPA />,
            icon: CropSquareIcon,
          },
          {
            path: "/arpa-area-form",
            name: "ARPA Area Form",
            isSideBar: false,
            element: <ARPAForm />,
          },
        ],
      },
      {
        path: "/mahaweli-structure",
        name: "Mahaweli Structure",
        isSideBar: true,
        children: [
          {
            path: "/mahaweli-block",
            name: "Mahaweli Block",
            isSideBar: true,
            element: <MahaweliBlock />,
            icon: CropSquareIcon,
          },
          {
            path: "/mahaweli-block-form",
            name: "ARPA Area Form",
            isSideBar: false,
            element: <MahaweliBlockForm />,
          },
        ],
      },
      {
        path: "/ez-structure",
        name: "Ecological Zone Structure",
        isSideBar: true,
        children: [
          {
            path: "/agro-eco-zone",
            name: "Agro Eco Zone",
            isSideBar: true,
            element: <AgroEco />,
            icon: AccountTreeIcon,
          },
          {
            path: "/agro-eco-zone-form",
            name: "Agro Eco Zone",
            isSideBar: false,
            element: <AgroEcoForm />,
          },
        ],
      },
    ],
  },

  {
    path: "/authentication",
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
    ],
  },
  {
    path: "/soil",
    name: "Soil",
    isSideBar: true,
    icon: WaterIcon,
    children: [
      {
        path: "/soil-type",
        name: "Soil Type",
        isSideBar: true,
        element: <Soil />,
        icon: WaterIcon,
      },
      {
        path: "/soil-type-form",
        name: "Soil Type Form",
        isSideBar: false,
        element: <SoilForm />,
      },
      {
        path: "/soil-sub-type",
        name: "Soil Sub Type",
        isSideBar: true,
        element: <SoilSubType />,
        icon: WaterIcon,
      },
      {
        path: "/soil-sub-type-form",
        name: "Soil Type Form",
        isSideBar: false,
        element: <SoilSubTypeForm />,
      },
    ],
  },

  {
    path: "/crop",
    name: "Crop",
    isSideBar: true,
    icon: SpaIcon,
    children: [
      {
        path: "/category",
        name: "Crop Category",
        isSideBar: true,
        element: <CropCategory />,
        icon: ForestIcon,
      },
      {
        path: "/category-form",
        name: "Crop Category Form",
        isSideBar: false,
        element: <CropCategoryForm />,
      },
      {
        path: "/sub-category",
        name: "Crop Sub Category",
        isSideBar: true,
        element: <CropSubCategory />,
        icon: ParkIcon,
      },
      {
        path: "/sub-category-form",
        name: "Crop Category Form",
        isSideBar: false,
        element: <CropSubCategoryForm />,
      },
    ],
  },
  {
    path: "/institution",
    name: "Institution",
    isSideBar: true,
    icon: ApartmentIcon,
    children: [
      {
        path: "/institution-category",
        name: "Institution Category",
        isSideBar: true,
        element: <InstitutionCategory />,
        icon: ApartmentIcon,
      },
      {
        path: "/institution-category-form",
        name: "Institution Category Form",
        isSideBar: false,
        element: <InstitutionCategoryForm />,
      },
      {
        path: "/institution",
        name: "Institution",
        isSideBar: true,
        element: <Institution />,
        icon: ApartmentIcon,
      },
      {
        path: "/institution-form",
        name: "Institution Form",
        isSideBar: false,
        element: <InstitutionForm />,
      },
    ],
  },

  {
    path: "/tests",
    name: "Soil and Water Tests",
    isSideBar: true,
    icon: ContentPasteSearchIcon,
    children: [
      {
        path: "/soil-test",
        name: "Soil Test",
        isSideBar: true,
        element: <SoilTest />,
        icon: SouthAmericaIcon,
      },
      {
        path: "/soil-test-form",
        name: "Soil Test Form",
        isSideBar: false,
        element: <SoilTestFrom />,
      },
      {
        path: "/water-test",
        name: "Water Test",
        isSideBar: true,
        element: <WaterTest />,
        icon: WaterDamageIcon,
      },
      {
        path: "/water-test-form",
        name: "Water Test Form",
        isSideBar: false,
        element: <WaterTestForm />,
      },
    ],
  },
  {
    path: "/agri-season",
    name: "Agriculture Season",
    element: <AgriSeason />,
    isSideBar: true,
    icon: WbSunnyIcon,
  },
  {
    path: "/agri-season-form",
    name: "Agriculture Season Form",
    element: <AgriSeasonForm />,
    isSideBar: false,
  },

  {
    path: "/farm-land",
    name: "Farm Land",
    isSideBar: true,
    icon: GiIsland,
    element: <FarmLand />,
  },
  {
    path: "/services",
    name: "Services",
    isSideBar: true,
    icon: WindPowerIcon,
    element: <FarmLand />,
  },
  {
    path: "/user-access-log",
    name: "User Access Log",
    isSideBar: true,
    icon: PeopleAlt,
  },
  {
    path: "/farm-land-form",
    name: "Farm Land Form",
    isSideBar: false,
    element: <FarmLandForm />,
  },

  {
    path: "/farmer",
    name: "Farmer",
    element: <Farmer />,
    isSideBar: true,
    icon: AccessibilityIcon,
  },
  {
    path: "/farmer-form",
    name: "Farmer Form",
    element: <FarmerForm />,
    isSideBar: false,
  },
];
