import PasswordResetPage from "../pages/PasswordReset";
import Login from "../pages/login/Login";
import Register from "../pages/register/BasicData";
import SecondaryData from "../pages/register/SecondaryData";
import Dashboard from "../pages/Dashboard/Dashboard";

import EmailVerificationPage from "../pages/EmailVerification";
import Actions from "../pages/Actions/Actions";
import Components from "../pages/Components/Components";
import ComponentForm from "../pages/Components/ComponentForm";
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
import AI from "../pages/Agri-Zones/AI/AI";
import AIForm from "../pages/Agri-Zones/AI/AIForm";
import AgroEco from "../pages/Agro-Eco-zone/Agro-Eco/AgroEco";
import AgroEcoForm from "../pages/Agro-Eco-zone/Agro-Eco/AgroEcoForm";

import CropCategory from "../pages/Crop/CropCategory/CropCategory";
import CropCategoryForm from "../pages/Crop/CropCategory/CropCategoryForm";
import CropSubCategory from "../pages/Crop/CropSubCategory/CropSubCategory";
import CropSubCategoryForm from "../pages/Crop/CropSubCategory/CropSubCategoryForm";
import Crop from "../pages/Crop/Crop/Crop";
import CropForm from "../pages/Crop/Crop/CropForm";
import CropVariety from "../pages/Crop/CropVariety/CropVariety";
import CropVarietyForm from "../pages/Crop/CropVariety/CropVarietyForm";

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
import UserType from "../pages/UserType/UserType";
import UserTypeForm from "../pages/UserType/UserTypeForm";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
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
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import YardIcon from "@mui/icons-material/Yard";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Organization from "../pages/Organization/Organization";
import { PeopleAlt } from "@mui/icons-material";
import Services from "../pages/Services/Services";
import LandingPage from "../pages/LandingPage/LandingPage";
import ProvincialDoa from "../pages/ProvincialStructure/ProvincialDoa/ProvincialDoa";
import ProvincialDoaForm from "../pages/ProvincialStructure/ProvincialDoa/ProvincialDoaForm";
import AgrarDevDept from "../pages/Agrarian/AgrarDevDept/AgrarDevDept";
import AgrarDevDeptForm from "../pages/Agrarian/AgrarDevDept/AgrarDevDeptForm";
import DistrictComm from "../pages/Agrarian/DistrictComm/DistrictComm";
import DistrictCommForm from "../pages/Agrarian/DistrictComm/DistrictCommForm";
import ASC from "../pages/Agrarian/ASC/ASC";
import ASCForm from "../pages/Agrarian/ASC/ASCForm";
import ARPA from "../pages/Agrarian/ARPA/ARPA";
import ARPAForm from "../pages/Agrarian/ARPA/ARPAForm";
import PrivateCompaniesForm from "../pages/PrivateCompanies/PrivateCompaniesForm";
import Users from "../pages/Users/Users";
import UsersForm from "../pages/Users/UserForm";
import PrivateCompaniesList from "../pages/PrivateCompanies/PrivateCompaniesList";
import GapRegs from "../pages/Gap/GapRegs";
import GapRegForm from "../pages/Gap/GapRegForm";
import Map from "../pages/Map/Map";
import ProvincialDdoa from "../pages/ProvincialStructure/ProvincialDdoa/ProvincialDdoa";
import ProvincialDdoaForm from "../pages/ProvincialStructure/ProvincialDdoa/ProvicialDdoaForm";
import ProvincialAda from "../pages/ProvincialStructure/ProvincialAda/ProvicialAda";
import ProvincialAdaForm from "../pages/ProvincialStructure/ProvincialAda/ProvicialAdaForm";
import IntProvincialDoa from "../pages/InterProvincialStructure/IntProvincialDirectorDoa/IntProvincialDoa";
import IntProvincialDoaForm from "../pages/InterProvincialStructure/IntProvincialDirectorDoa/IntProvincialDoaForm";
import IntProvincialDdoaForm from "../pages/InterProvincialStructure/IntProvincialDdoa/IntProvincialDdoaForm";
import IntProvincialDdoa from "../pages/InterProvincialStructure/IntProvincialDdoa/IntProvincialDdoa";
import IntProvincialAda from "../pages/InterProvincialStructure/IntProvincialAda/IntProvincialAda";
import IntProvincialAdaForm from "../pages/InterProvincialStructure/IntProvincialAda/IntProvincialAdaForm";
import MahaweliAuthority from "../pages/MahaweliAuthorityStructure/MahaweliAuthority/MahaweliAuthority";
import MahaweliAuthorityForm from "../pages/MahaweliAuthorityStructure/MahaweliAuthority/MahaweliAuthorityForm";
import MahaweliSystem from "../pages/MahaweliAuthorityStructure/MahaweliSystem/MahaweliSystem";
import MahaweliSystemForm from "../pages/MahaweliAuthorityStructure/MahaweliSystem/MahaweliSystemForm";
import MahaweliBlock from "../pages/MahaweliAuthorityStructure/MahaweliBlock/MahaweliBlock";
import MahaweliBlockForm from "../pages/MahaweliAuthorityStructure/MahaweliBlock/MahaweliBlockForm";
import MahaweliUnit from "../pages/MahaweliAuthorityStructure/MahaweliUnit/MahaweliUnit";
import MahaweliUnitForm from "../pages/MahaweliAuthorityStructure/MahaweliUnit/MahaweliUnitForm";
import InterProvincialAiRegion from "../pages/InterProvincialStructure/AIRegion/AiRegion";
import InterProvincialAiRegionForm from "../pages/InterProvincialStructure/AIRegion/AiRegionForm";
import ProvincialAiRegion from "../pages/ProvincialStructure/AIRegion/AiRegion";
import ProvincialAiRegionForm from "../pages/ProvincialStructure/AIRegion/AiRegionForm";
import SelfAssessment from "../pages/AuditForm/SelfAssessmentForm/SelfAssessment";
import SelfAssessmentForm from "../pages/AuditForm/SelfAssessmentForm/SelfAssessmentForm";
import BasicData from "../pages/AuditForm/BasicDataForm/BasicData";
import BasicDataForm from "../pages/AuditForm/BasicDataForm/BasicDataForm";
import InternalAudit from "../pages/AuditForm/InternalAuditForm/InternalAudit";
import InternalAuditForm from "../pages/AuditForm/InternalAuditForm/InternalAuditForm";
import ExternalAudit from "../pages/AuditForm/ExternalAuditForm/ExternalAudit";
import ExternalAuditForm from "../pages/AuditForm/ExternalAuditForm/ExternalAuditForm";
import InterProvince from "../pages/Agri-Zones/inter-province/InterProvince";
import Role from "../pages/AppSettings/Role/Role";
import RoleForm from "../pages/AppSettings/Role/RoleForm";
import PermissionsRoles from "../pages/AppSettings/Permissions/RolesList";
import Permission from "../pages/AppSettings/Permissions/Permission";
import PermissionsByRole from "../pages/AppSettings/Permissions/PermissionsByRole";
import ProtectedHouseType from "../pages/ProtectedHouseType/ProtectedHouseType";
import ProtectedHouseTypeForm from "../pages/ProtectedHouseType/ProtectedHouseTypeForm";
import CropRegistration from "../pages/CropLook/crop-registration";
import CropRegistrationForm from "../pages/CropLook/crop-registration-from";
import CropTarget from "../pages/CropLook/cropTarget/crop-target";
import CropTargetForm from "../pages/CropLook/cropTarget/crop-target-from";
import BiWeeklyReporting from "../pages/CropLook/biWeekReporting/biweekly-reporting";
import BiWeeklyReportingForm from "../pages/CropLook/biWeekReporting/biweekly-reporting-from";
import CropLookSeason from "../pages/CropLook/crop-look-Season/CropLookSeason";
import CropLookSeasonForm from "../pages/CropLook/crop-look-Season/CropLookSeasonForm";
import CropConfiguration from "../pages/CropLook/cropConfiguration/crop-configuration";
import CropConfigurationForm from "../pages/CropLook/cropConfiguration/crop-configuration-from";
import DynamicFormGap from "../pages/DynamicFormGap/DynamicFormGap";
import DynamicFormPage from "../pages/DynamicFormGap/DynamicFormPage";
import FormPageEditView from "../pages/DynamicFormGap/FormPageEditView";
import CropDamage from "../pages/cropDamages/crop-damage";
import CropDamageForm from "../pages/cropDamages/crop-damage-from";
import { DEF_COMPONENTS } from "../utils/constants/permission";
import DDBiWeeklyReporting from "../pages/CropLook/ddBiWeekReporting/dd-biweekly-reporting";
import DDBiWeeklyReportingForm from "../pages/CropLook/ddBiWeekReporting/dd-biweekly-reporting-from";
import CropActivity from "../pages/Crop/CropActivity/crop-activity";
import CropCalendar from "../pages/Crop/CropCalendar/crop-calendar";
import CropCalendarForm from "../pages/Crop/CropCalendar/crop-calendar-from";

export const Routes = [
  {
    path: "/password-reset",
    element: <PasswordResetPage />,
  },
  {
    path: "/landing-page",
    element: <LandingPage />,
    hideSidebar: true,
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
        name: "Administration Structure",
        isSideBar: true,
        children: [
          {
            path: "/province",
            name: "Province",
            isSideBar: true,
            element: <Province />,
            icon: CropSquareIcon,
            component:DEF_COMPONENTS.PROVINCE
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
            component:DEF_COMPONENTS.DISTRICT
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
            component:DEF_COMPONENTS.DS_DIVISION
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
            component:DEF_COMPONENTS.GN_DIVISION
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
        path: "/provincial-structure",
        name: "Provincial DOA Structure",
        isSideBar: true,
        children: [
          {
            path: "/provincial-director",
            name: "Provincial DOA",
            isSideBar: true,
            element: <ProvincialDoa />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.PROVINCIAL_DIRECTOR_LEVEL
          },
          {
            path: "/provincial-doa-form",
            name: "Provincial DOA Form",
            isSideBar: false,
            element: <ProvincialDoaForm />,
          },
          {
            path: "/provincial-deputy-director",
            name: "Provincial DDOA",
            isSideBar: true,
            element: <ProvincialDdoa />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.PROVINCIAL_DEPUTY_DIRECTOR_LEVEL
          },
          {
            path: "/provincial-ddoa-form",
            name: "Provincial DDOA Form",
            isSideBar: false,
            element: <ProvincialDdoaForm />,
          },
          {
            path: "/provincial-ada",
            name: "Provincial ADA",
            isSideBar: true,
            element: <ProvincialAda />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.PROVINCIAL_ADA_SEGMENT
          },
          {
            path: "/provincial-ada-form",
            name: "Provincial ADA Form",
            isSideBar: false,
            element: <ProvincialAdaForm />,
          },
          {
            path: "/ai-region",
            name: "AI Region",
            isSideBar: true,
            element: <ProvincialAiRegion />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.AI_REGION
          },
          {
            path: "/ai-region-form",
            name: "ASC Form",
            isSideBar: false,
            element: <ProvincialAiRegionForm />,
          },
          {
            path: "/gn-division",
            name: "GN Division",
            isSideBar: true,
            element:  <GnDivision />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.GN_DIVISION
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
        path: "/inter-provincial-structure",
        name: "Inter Provincial DOA ",
        isSideBar: true,
        children: [
          {
            path: "/inter-provincial-director",
            name: "Director DOA",
            isSideBar: true,
            element: <IntProvincialDoa />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.DIRECTOR_DOA
          },
          {
            path: "/inter-provincial-doa-form",
            name: "Provincial DOA Form",
            isSideBar: false,
            element: <IntProvincialDoaForm />,
          },
          {
            path: "/inter-provincial-deputy-director",
            name: "Inter Provincial DDOA",
            isSideBar: true,
            element: <IntProvincialDdoa />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.INTER_PROVINCE_DEPUTY_DIRECTOR_LEVEL
          },
          {
            path: "/inter-provincial-ddoa-form",
            name: "Inter Provincial DDOA",
            isSideBar: false,
            element: <IntProvincialDdoaForm />,
          },
          {
            path: "/inter-provincial-ada",
            name: "Inter Provincial ADA",
            isSideBar: true,
            element: <IntProvincialAda />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.INTER_PROVINCIAL_ADA_SEGMENT
          },
          {
            path: "/inter-provincial-ada-form",
            name: "Provincial ADA Form",
            isSideBar: false,
            element: <IntProvincialAdaForm />,
          },
          {
            path: "/inter-ai-region",
            name: "AI Region",
            isSideBar: true,
            element: <InterProvincialAiRegion />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.AI_REGION
          },
          {
            path: "/inter-ai-region-form",
            name: "ASC Form",
            isSideBar: false,
            element: <InterProvincialAiRegionForm />,
          },
          {
            path: "/gn-division",
            name: "GN Division",
            isSideBar: true,
            element:  <GnDivision />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.GN_DIVISION
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
        path: "/mahaweli-structure",
        name: "Mahaweli Structure",
        isSideBar: true,
        children: [
          {
            path: "/mahaweli-authority",
            name: "Mahaweli Authority",
            isSideBar: true,
            element: <MahaweliAuthority />,
            icon: CropSquareIcon,
            component:DEF_COMPONENTS.MAHAWELI_AUTHORITY
          },
          {
            path: "/mahaweli-authority-form",
            name: "ARPA Area Form",
            isSideBar: false,
            element: <MahaweliAuthorityForm />,
          },
          {
            path: "/mahaweli-system",
            name: "Mahaweli System",
            isSideBar: true,
            element: <MahaweliSystem />,
            icon: CropSquareIcon,
            component:DEF_COMPONENTS.MAHAWELI_SYSTEM
          },
          {
            path: "/mahaweli-system-form",
            name: "Mahaweli System Form",
            isSideBar: false,
            element: <MahaweliSystemForm />,
          },
          {
            path: "/mahaweli-block",
            name: "Mahaweli Block",
            isSideBar: true,
            element: <MahaweliBlock />,
            icon: CropSquareIcon,
            component:DEF_COMPONENTS.MAHAWELI_BLOCK
          },
          {
            path: "/mahaweli-block-form",
            name: "Mahaweli Block Form",
            isSideBar: false,
            element: <MahaweliBlockForm />,
          },
          
          {
            path: "/mahaweli-unit",
            name: "Mahaweli Unit",
            isSideBar: true,
            element: <MahaweliUnit />,
            icon: CropSquareIcon,
            component:DEF_COMPONENTS.MAHAWELI_UNIT
          },
          {
            path: "/mahaweli-unit-form",
            name: "Mahaweli Unit Form",
            isSideBar: false,
            element: <MahaweliUnitForm />,
          },
          {
            path: "/gn-division",
            name: "GN Division",
            isSideBar: true,
            element:  <GnDivision />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.GN_DIVISION
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
        path: "/agrarian",
        name: "Agrarian",
        isSideBar: true,
        children: [
          {
            path: "/department-of-agrarian-development",
            name: "AgrarDevDept",
            isSideBar: true,
            element: <AgrarDevDept />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.DO_AGRARIAN_DEVELOPMENT
          },
          {
            path: "/department-of-agrarian-development-form",
            name: "AgrarDevDept Form",
            isSideBar: false,
            element: <AgrarDevDeptForm />,
          },
          {
            path: "/district-commissioner",
            name: "District Commissioner",
            isSideBar: true,
            element: <DistrictComm />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.DISTRICT_COMMISSIONER_LEVEL
          },
          {
            path: "/district-commissioner-form",
            name: "District Commissioner Form",
            isSideBar: false,
            element: <DistrictCommForm />,
          },
          {
            path: "/asc-division",
            name: "ASC Division",
            isSideBar: true,
            element: <ASC />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.ASC_DIVISION
          },
          {
            path: "/asc-division-form",
            name: "ASC Division Form",
            isSideBar: false,
            element: <ASCForm />,
          },
          {
            path: "/arpa-division",
            name: "ARPA Division",
            isSideBar: true,
            element: <ARPA />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.ARPA
          },
          {
            path: "/arpa-division-form",
            name: "ARPA Division Form",
            isSideBar: false,
            element: <ARPAForm />,
          },
          {
            path: "/gn-division",
            name: "GN Division",
            isSideBar: true,
            element:  <GnDivision />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.GN_DIVISION
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
            component:DEF_COMPONENTS.AGRO_ECOLOGICAL_ZONE
          },
          {
            path: "/agro-eco-zone-form",
            name: "Agro Eco Zone",
            isSideBar: false,
            element: <AgroEcoForm />,
          },
          {
            path: "/gn-division",
            name: "GN Division",
            isSideBar: true,
            element:  <GnDivision />,
            icon: MyLocationIcon,
            component:DEF_COMPONENTS.GN_DIVISION
          },
          {
            path: "/gn-division-form",
            name: "GN Division Form",
            isSideBar: false,
            element: <GnDivisionForm />,
          },
        ],
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
        component:DEF_COMPONENTS.SOIL_TYPE
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
        component:DEF_COMPONENTS.SOIL_SUB_TYPE

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
    isService: "SC",
    children: [
      {
        path: "/damages",
        name: "Crop Damages",
        isSideBar: true,
        element: <CropDamage />,
        icon: ForestIcon,
        component:DEF_COMPONENTS.CROP_DAMAGE_FORECAST
      },
      {
        path: "/damage-form",
        name: "Crop Damage Form",
        isSideBar: false,
        element: <CropDamageForm />,
      },
      {
        path: "/calendar",
        name: "Crop Calendar",
        isSideBar: true,
        element: <CropCalendar />,
        icon: ForestIcon,
        component:DEF_COMPONENTS.CROP_ACTIVITY
      },
      {
        path: "/calendar-form",
        name: "Crop Calendar Form",
        isSideBar: false,
        element: <CropCalendarForm />,
      },
      {
        path: "/activity",
        name: "Crop Activity",
        isSideBar: true,
        element: <CropActivity />,
        icon: ForestIcon,
        component:DEF_COMPONENTS.CROP_ACTIVITY
      },
      {
        path: "/category",
        name: "Crop Category",
        isSideBar: true,
        element: <CropCategory />,
        icon: ForestIcon,
        component:DEF_COMPONENTS.CROP_CATEGORY
       
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
        component:DEF_COMPONENTS.CROP_SUB_CATEGORY
      },
      {
        path: "/sub-category-form",
        name: "Crop Category Form",
        isSideBar: false,
        element: <CropSubCategoryForm />,
      },
      {
        path: "/crop",
        name: "Crop",
        isSideBar: true,
        element: <Crop />,
        icon: YardIcon,
        component:DEF_COMPONENTS.CROP
      },
      {
        path: "/crop-form",
        name: "Crop Form",
        isSideBar: false,
        element: <CropForm />,
      },
      {
        path: "/crop-variety",
        name: "Crop Variety",
        isSideBar: true,
        element: <CropVariety />,
        icon: YardIcon,
        component:DEF_COMPONENTS.CROP_VARIETY
      },
      {
        path: "/crop-variety-form",
        name: "Crop Variety Form",
        isSideBar: false,
        element: <CropVarietyForm />,
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
        component:DEF_COMPONENTS.INSTITUTION_CATEGORY,
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
        component:DEF_COMPONENTS.INSTITUTION,
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
        component:DEF_COMPONENTS.SOIL_SAMPLE,
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
        component:DEF_COMPONENTS.WATER_SAMPLE,
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
    component:DEF_COMPONENTS.AGRICULTURE_SEASON
  },
  {
    path: "/agri-season-form",
    name: "Agriculture Season Form",
    element: <AgriSeasonForm />,
    isSideBar: false,
  },
  {
    path: "users-form",
    name: "New User Form",
    element: <UsersForm />,
    isSideBar: false,
  },

  {
    path: "/farm-land",
    name: "Farm Land",
    isSideBar: true,
    icon: GiIsland,
    isService: "SC",
    element: <FarmLand />,
    component:DEF_COMPONENTS.FARM_LAND
  },
  {
    path: "/services",
    name: "Services",
    isSideBar: true,
    icon: WindPowerIcon,
    element: <Services />,
  },
  {
    path: "/user-access-log",
    name: "User Access Log",
    isSideBar: true,
    icon: PeopleAlt,
  },
  {
    path: "/farm-land-form",
    name: "Farm Land",
    isSideBar: false,
    element: <FarmLandForm />,
  },
  {
    path: "/farmer",
    name: "Farmer",
    element: <Farmer />,
    isSideBar: true,
    isService: "SC",
    icon: AccessibilityIcon,
    component:DEF_COMPONENTS.FARMER
  },
  {
    path: "/farmer-form",
    name: "Farmer Form",
    element: <FarmerForm />,
    isSideBar: false,
  },

  {
    path: "/protected-house-type",
    name: "Protected House Type",
    element: <ProtectedHouseType />,
    isSideBar: true,
    isService: "SC",
    icon: AccessibilityIcon,
    component:DEF_COMPONENTS.PROTECTED_HOUSE_TYPE
  },
  {
    path: "/protected-house-type-form",
    name: "Protected House Type",
    element: <ProtectedHouseTypeForm />,
    isSideBar: false,
    
  },

  {
    path: "/user-type",
    name: "User Type",
    element: <UserType />,
    isSideBar: true,
    icon: ManageAccountsIcon,
    component:DEF_COMPONENTS.USER_TYPE
  },
  {
    path: "/user-type-form",
    name: "User Type",
    element: <UserTypeForm />,
    isSideBar: false
  },
  {
    path: "/users",
    name: "Users",
    element: <Users />,
    isSideBar: true,
    isService: "SC",
    icon: SupervisedUserCircleIcon,
    component:DEF_COMPONENTS.USER
   
  },
  {
    path: "/private-company",
    name: "Private Company",
    element: <PrivateCompaniesList />,
    isSideBar: true,
    icon: AccountBalanceIcon,
   
  },
  {
    path: "/private-company-form",
    name: "Private Company Form",
    element: <PrivateCompaniesForm />,
    isSideBar: false,
  },
  
  {
    path: "/audit-form",
    name: "Audit Form",
    element: <DynamicFormPage/>,
    isSideBar: false,
  },
  {
    path: "/audit-form-edit-view",
    name: "Audit Form",
    element: <FormPageEditView />,
    isSideBar: false,
  },
  {
    path: "/gap",
    name: "GAP",
    isSideBar: true,
    icon: ContentPasteSearchIcon,
    children: [
      {
        path: "/gap-registration",
        name: "GAP Registration",
        element: <GapRegs />,
        isSideBar: true,
        isService: "GAP",
        icon: AppRegistrationIcon,
        component:DEF_COMPONENTS.GAP_REQUEST
      },
      {
        path: "/gap-reg-form",
        name: "GAP Regs",
        element: <GapRegForm />,
        isSideBar: false,
      },
      {
        path: "/self-assessment",
        name: "Self Assessment",
        isSideBar: true,
        element: <SelfAssessment />,
        icon: SouthAmericaIcon,
        component:DEF_COMPONENTS.SELF_ASSESSMENT_FORM
      },
      {
        path: "/self-assessment-form",
        name: "Self Assessment Form",
        isSideBar: false,
        element: <SelfAssessmentForm />,
        icon: SouthAmericaIcon,
      },
      {
        path: "/basic-assessment",
        name: "Basic Assessment",
        isSideBar: true,
        element: <BasicData />,
        icon: SouthAmericaIcon,
        component:DEF_COMPONENTS.BASIC_ASSESSMENT_FORM
      },
      {
        path: "/basic-assessment-form",
        name: "Basic Data Assessment Form",
        isSideBar: false,
        element: <BasicDataForm />,
        icon: SouthAmericaIcon,
      },
      {
        path: "/internal-audit",
        name: "Internal Audit",
        isSideBar: true,
        element: <InternalAudit />,
        icon: SouthAmericaIcon,
        component:DEF_COMPONENTS.INTERNAL_AUDIT_FORM
      },
      {
        path: "/internal-audit-form",
        name: "Internal Audit Form",
        isSideBar: false,
        element: <InternalAuditForm />,
        icon: SouthAmericaIcon,
      },
      {
        path: "/external-audit",
        name: "External Audit",
        isSideBar: true,
        element: <ExternalAudit />,
        icon: SouthAmericaIcon,
        component:DEF_COMPONENTS.EXTERNAL_AUDIT_FORM
      },
      {
        path: "/external-audit-form",
        name: "External Audit Form",
        isSideBar: false,
        element: <ExternalAuditForm />,
        icon: SouthAmericaIcon,
      },
    ],
  },
  {
    path: "/crop-look",
    name: "Crop Look",
    isSideBar: true,
    icon: ContentPasteSearchIcon,
    children: [
      {
        path: "/crop-configuration",
        name: "Crop Configuration",
        isSideBar: true,
        element: <CropConfiguration />,
        icon: SouthAmericaIcon,
      },
      {
        path: "/crop-configuration-form",
        name: "Crop Configuration Form",
        isSideBar: false,
        element: <CropConfigurationForm />,
        icon: SouthAmericaIcon,
      },
      {
        path: "/season",
        name: "Crop Look Season",
        isSideBar: true,
        element: <CropLookSeason />,
        icon: SouthAmericaIcon,
      },
      {
        path: "/season-form",
        name: "Crop Look Season Form",
        isSideBar: false,
        element: <CropLookSeasonForm />,
        icon: SouthAmericaIcon,
      },
      {
        path: "/crop-registration",
        name: "Crop Registration",
        isSideBar: true,
        element: <CropRegistration />,
        icon: SouthAmericaIcon,
      },
      {
        path: "/crop-registration-form",
        name: "Crop Registration Form",
        isSideBar: false,
        element: <CropRegistrationForm />,
        icon: SouthAmericaIcon,
      },
      {
        path: "/crop-target",
        name: "Crop Target",
        isSideBar: true,
        element: <CropTarget />,
        icon: SouthAmericaIcon,
      },
      {
        path: "/crop-target-form",
        name: "Crop Targets Form",
        isSideBar: false,
        element: <CropTargetForm />,
        icon: SouthAmericaIcon,
      },
      {
        path: "/biweekly-reporting",
        name: "Bi Weekly Reporting",
        isSideBar: true,
        element: <BiWeeklyReporting />,
        icon: SouthAmericaIcon,
      },
      {
        path: "/biweekly-reporting-form",
        name: "Bi Weekly Reporting Form",
        isSideBar: false,
        element: <BiWeeklyReportingForm />,
        icon: SouthAmericaIcon,
      },
      {
        path: "/dd-biweekly-reporting",
        name: "DD Bi Weekly Reporting",
        isSideBar: true,
        element: <DDBiWeeklyReporting />,
        icon: SouthAmericaIcon,
      },
      {
        path: "/dd-biweekly-reporting-form",
        name: "DD Bi Weekly Reporting Form",
        isSideBar: false,
        element: <DDBiWeeklyReportingForm />,
        icon: SouthAmericaIcon,
      },
    ]
  },
  {
    path: "/app-settings",
    name: "Application Settings",
    isSideBar: true,
    icon: ContentPasteSearchIcon,
    children: [
      {
        path: "/roles",
        name: "Roles",
        isSideBar: true,
        element: <Role />,
        icon: SouthAmericaIcon,
        component:DEF_COMPONENTS.ROLE
      },
      {
        path: "/role-form",
        name: "Role Form",
        isSideBar: false,
        element: <RoleForm />,
        icon: SouthAmericaIcon,
      },
      {
        path: "/actions",
        name: "Actions",
        isSideBar: true,
        icon: HighlightAltIcon,
        element: <Actions />,
        component:DEF_COMPONENTS.ACTION
      },
      {
        path: "/components",
        name: "Components",
        isSideBar: true,
        icon: ViewModuleIcon,
        element: <Components />,
        component:DEF_COMPONENTS.COMPONENT
      },
      {
        path: "/component-form",
        name: "Component Form",
        isSideBar: false,
        element: <ComponentForm />,
      },
      {
        path: "/permissionss",
        name: "Permissions",
        isSideBar: false,
        icon: KeyIcon,
        element: <Permissions />,
      },
      {
        path: "/permissions",
        name: "Permissions",
        isSideBar: true,
        icon: KeyIcon,
        element: <Permission />,
        component:DEF_COMPONENTS.PERMISSION
      },
      {
        path: "/permissions-by-role",
        name: "Permissions",
        isSideBar: false,
        icon: KeyIcon,
        element: <PermissionsByRole />,
      }
    ],
  },
  {
    path: "/map",
    name: "Map",
    element: <Map />,
    isSideBar: true,
    icon: AddLocationAltIcon,
  },
];
