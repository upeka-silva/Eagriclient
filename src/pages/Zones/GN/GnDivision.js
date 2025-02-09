import {
  Add,
  Delete,
  Edit,
  RestartAlt,
  Vrpano,
  Download,
} from "@mui/icons-material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {
  Autocomplete,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import DialogBox from "../../../components/PageLayout/DialogBox";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { get_ProvincialDoaList } from "../../../redux/actions/ProvincialDoa/action";
import { get_AiRegionLovByTypeByAdaId } from "../../../redux/actions/aiRegion/action";
import { get_arpaLovByAscId } from "../../../redux/actions/arpa/action";
import { get_ASCLovByComId } from "../../../redux/actions/asc/action";
import { get_DistrictLovByProvinceId } from "../../../redux/actions/district/action";
import { get_DistrictCommLov } from "../../../redux/actions/districtComm/action";
import { get_DsDivisionLovByDistrictId } from "../../../redux/actions/dsDivision/action";
import {
  deleteGnDivision,
  downloadGnDivisionExcel,
} from "../../../redux/actions/gnDivision/action";
import { get_InterProvincialAdaLovByDdoaId } from "../../../redux/actions/interProvincialAda/action";
import { get_InterProvincialDdoaLovByDoaId } from "../../../redux/actions/interProvincialDdoa/action";
import { get_InterProvincialDoaLov } from "../../../redux/actions/interProvincialDoa/action";
import { get_MahaweliBlockListBySystemId } from "../../../redux/actions/mahaweliBlock/action";
import { get_MahaweliSystemList } from "../../../redux/actions/mahaweliSystem/action";
import { get_MahaweliUnitListByBlockId } from "../../../redux/actions/mahaweliUnit/action";
import { get_ProvinceList } from "../../../redux/actions/province/action";
import { get_ProvincialAdaLovByDdoaId } from "../../../redux/actions/provincialAda/action";
import { get_ProvincialDdoaLovByDoaId } from "../../../redux/actions/provincialDdoa/action";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import GnDivisionList from "./GnDivisionList";
import { Fonts } from "../../../utils/constants/Fonts";
import ExportButton from "../../../components/ExportButton/ExportButton";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";

const GnDivision = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.pathname);

  const [showClearIcon, setShowClearIcon] = useState("none");

  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    setSearchText(event.target?.value);
  };

  const handleSearch = () => {
    let url = dataEndPoint;
    const searchTextParam = "searchText=" + encodeURIComponent(searchText);

    if (url.includes("searchText=")) {
      url = url.replace(/searchText=[^&]+/, searchTextParam);
    } else {
      url += (url.includes("?") ? "&" : "?") + searchTextParam;
    }

    setDataEndPoint(url);
  };

  const [isAdmin, setIsAdmin] = useState(false);
  const [isProvincial, setIsProvincial] = useState(false);
  const [isIntProvincial, setIsIntProvincial] = useState(false);
  const [isMahaweli, setIsMahaweli] = useState(false);
  const [isAgrarian, setIsAgrarian] = useState(false);
  const [isEcoz, setIsEcoz] = useState(false);
  const [filters, setFilters] = useState({
    filter_01: "",
    filter_02: "",
    filter_03: "",
    filter_04: "",
  });

  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedGnDivisions, setSelectedGnDivisions] = useState([]);
  const [dialogSelectedGnDivision, setDialogSelectedGnDivision] = useState([]);

  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [dataEndPoint, setDataEndPoint] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [districs, setDistrics] = useState([]);
  const [dsDivisions, setDsDivisions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({
    name: "",
    code: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    name: "",
    code: "",
  });
  const [selectedDsDevision, setSelectedDsDevision] = useState({
    name: "",
    code: "",
  });

  const [pdoas, setPDoas] = useState([]);
  const [pddoas, setPDdoas] = useState([]);
  const [padas, setPAdas] = useState([]);
  const [selectedPDdoa, setSelectedPDdoa] = useState({
    provincialDdId: "",
    description: "",
  });
  console.log({ selectedPDdoa });

  const [selectedPDoa, setSelectedPDoa] = useState({
    proDirectorId: "",
    description: "",
  });
  console.log({ selectedPDoa });
  const [selectedPAda, setSelectedPAda] = useState({
    provinceSegmentId: "",
    description: "",
  });

  console.log({ selectedPAda });

  const [ipdoas, setIpDoas] = useState([]);
  const [ipddoas, setIpDdoas] = useState([]);
  const [ipadas, setIpAdas] = useState([]);
  const [selectedIpDdoa, setSelectedIpDdoa] = useState({
    ddId: "",
    description: "",
  });
  const [selectedIpDoa, setSelectedIpDoa] = useState({
    doaId: "",
    description: "",
  });
  const [selectedIpAda, setSelectedIpAda] = useState({
    segmentId: "",
    description: "",
  });

  const [aiRegions, setAiRegions] = useState([]);
  const [selectedAiregion, setSelectedAiRegion] = useState({
    regionId: "",
    description: "",
  });

  console.log({ selectedAiregion });

  const [mahaweliSystems, setMahaweliSystems] = useState([]);
  const [mahaweliBlocks, setMahaweliBlocks] = useState([]);
  const [mahaweliUnits, setMahaweliUnits] = useState([]);

  const [selectedSystem, setSelectedSystem] = useState({
    systemId: "",
    description: "",
  });
  const [selectedBlock, setSelectedBlock] = useState({
    code: "",
    description: "",
  });

  const [selectedMahaweliUnit, setSelectedMahaweliUnit] = useState({
    unitId: "",
    description: "",
  });

  const [dcomms, setDcomms] = useState([]);
  const [selectedDcomm, setSelectedDcomm] = useState({
    districtCommId: "",
    name: "",
  });
  const [ascDivisions, setAscDivisions] = useState([]);
  const [selectedAscDivision, setSelectedAscDivision] = useState({
    ascId: "",
    name: "",
  });

  const [arpas, setArpas] = useState([]);
  const [selectedArpa, setSelectedArpa] = useState({
    arpaId: "",
    name: "",
  });

  useEffect(() => {
    if (location.pathname === "/zone/ga-structure/gn-division") {
      changeZone(true, false, false, false, false);
      changeFilters("Province", "District", "Ds Division", "");
      setDataEndPoint("geo-data/gn-divisions");
    }
    if (location.pathname === "/zone/provincial-structure/gn-division") {
      changeZone(false, true, false, false, false);
      changeFilters(
        "Provincial DOA",
        "Provincial DDOA",
        "Provincial ADA",
        "AI Region"
      );
      setDataEndPoint("geo-data/gn-divisions/get-by-type/provincial");
    }
    if (location.pathname === "/zone/inter-provincial-structure/gn-division") {
      changeZone(false, false, true, false, false);
      changeFilters("Director DOA", "Int Pro DDOA", "Int Pro ADA", "AI Region");
      setDataEndPoint("geo-data/gn-divisions/get-by-type/inter_provincial");
    }
    if (location.pathname === "/zone/mahaweli-structure/gn-division") {
      changeZone(false, false, false, true, false);
      changeFilters("Mahaweli System", "Mahaweli Block", "Mahaweli Unit", "");
      setDataEndPoint("geo-data/gn-divisions/get-by-type/mahaweli");
    }
    if (location.pathname === "/zone/agrarian/gn-division") {
      changeZone(false, false, false, false, true);
      changeFilters(
        "District Commissioner",
        "Asc Division",
        "ARPA Division",
        ""
      );
      setDataEndPoint("geo-data/gn-divisions");
    }
    if (location.pathname === "/zone/ez-structure/gn-division") {
      changeZone(true, false, false, false, false);
      changeFilters("Province", "District", "Ds Division", "");
      setDataEndPoint("geo-data/gn-divisions");
    }
    resetFilter();
  }, [location.pathname]);

  const changeZone = (
    isAdmin,
    isProvincial,
    isIntProvincial,
    isMahaweli,
    isAgrarian
  ) => {
    setIsAdmin(isAdmin);
    setIsProvincial(isProvincial);
    setIsIntProvincial(isIntProvincial);
    setIsMahaweli(isMahaweli);
    setIsAgrarian(isAgrarian);
  };

  const changeFilters = (f1, f2, f3, f4) => {
    setFilters({
      filter_01: f1,
      filter_02: f2,
      filter_03: f3,
      filter_04: f4,
    });
  };

  const toggleGnDivisionSelect = (component) => {
    setSelectedGnDivisions((current = []) => {
      let newList = [...current];
      let index = newList.findIndex((c) => c?.id === component?.id);
      if (index > -1) {
        newList.splice(index, 1);
      } else {
        newList.push(component);
      }
      return newList;
    });
  };

  const selectAllGnDivisions = (all = []) => {
    setSelectedGnDivisions(all);
  };

  const resetSelectedGnDivisions = () => {
    setSelectedGnDivisions([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    if (isAdmin) {
      navigate("/zone/ga-structure/gn-division-form", {
        state: {
          action: DEF_ACTIONS.ADD,
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
          isAgrarian: isAgrarian,
          isEcoz: isEcoz,
        },
      });
    }
    if (isProvincial) {
      navigate("/zone/provincial-structure/gn-division-form", {
        state: {
          action: DEF_ACTIONS.ADD,
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
          isAgrarian: isAgrarian,
          isEcoz: isEcoz,
        },
      });
    }
    if (isIntProvincial) {
      navigate("/zone/inter-provincial-structure/gn-division-form", {
        state: {
          action: DEF_ACTIONS.ADD,
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
          isAgrarian: isAgrarian,
          isEcoz: isEcoz,
        },
      });
    }
    if (isMahaweli) {
      navigate("/zone/mahaweli-structure/gn-division-form", {
        state: {
          action: DEF_ACTIONS.ADD,
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
          isAgrarian: isAgrarian,
          isEcoz: isEcoz,
        },
      });
    }
    if (isEcoz) {
      navigate("/zone/ez-structure/gn-division-form", {
        state: {
          action: DEF_ACTIONS.ADD,
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
          isAgrarian: isAgrarian,
          isEcoz: isEcoz,
        },
      });
    }
    if (isAgrarian) {
      navigate("/zone/agrarian/gn-division-form", {
        state: {
          action: DEF_ACTIONS.ADD,
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
          isAgrarian: isAgrarian,
          isEcoz: isEcoz,
        },
      });
    }
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);

    if (isAdmin) {
      navigate("/zone/ga-structure/gn-division-form", {
        state: {
          action: DEF_ACTIONS.EDIT,
          target: selectedGnDivisions[0] || {},
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
          isAgrarian: isAgrarian,
          isEcoz: isEcoz,
        },
      });
    }
    if (isProvincial) {
      navigate("/zone/provincial-structure/gn-division-form", {
        state: {
          action: DEF_ACTIONS.EDIT,
          target: selectedGnDivisions[0] || {},
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
          isAgrarian: isAgrarian,
          isEcoz: isEcoz,
        },
      });
    }
    if (isIntProvincial) {
      navigate("/zone/inter-provincial-structure/gn-division-form", {
        state: {
          action: DEF_ACTIONS.EDIT,
          target: selectedGnDivisions[0] || {},
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
          isAgrarian: isAgrarian,
          isEcoz: isEcoz,
        },
      });
    }
    if (isMahaweli) {
      navigate("/zone/mahaweli-structure/gn-division-form", {
        state: {
          action: DEF_ACTIONS.EDIT,
          target: selectedGnDivisions[0] || {},
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
          isAgrarian: isAgrarian,
          isEcoz: isEcoz,
        },
      });
    }
    if (isAgrarian) {
      navigate("/zone/agrarian/gn-division-form", {
        state: {
          action: DEF_ACTIONS.EDIT,
          target: selectedGnDivisions[0] || {},
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
          isAgrarian: isAgrarian,
          isEcoz: isEcoz,
        },
      });
    }
    if (isEcoz) {
      navigate("/zone/ez-structure/gn-division-form", {
        state: {
          action: DEF_ACTIONS.EDIT,
          target: selectedGnDivisions[0] || {},
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
          isAgrarian: isAgrarian,
          isEcoz: isEcoz,
        },
      });
    }
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);

    if (isAdmin) {
      navigate("/zone/ga-structure/gn-division-form", {
        state: {
          action: DEF_ACTIONS.VIEW,
          target: selectedGnDivisions[0] || {},
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
        },
      });
    }
    if (isProvincial) {
      navigate("/zone/provincial-structure/gn-division-form", {
        state: {
          action: DEF_ACTIONS.VIEW,
          target: selectedGnDivisions[0] || {},
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
        },
      });
    }
    if (isIntProvincial) {
      navigate("/zone/inter-provincial-structure/gn-division-form", {
        state: {
          action: DEF_ACTIONS.VIEW,
          target: selectedGnDivisions[0] || {},
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
        },
      });
    }
    if (isMahaweli) {
      navigate("/zone/mahaweli-structure/gn-division-form", {
        state: {
          action: DEF_ACTIONS.VIEW,
          target: selectedGnDivisions[0] || {},
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
        },
      });
    }
    if (isAgrarian) {
      navigate("/zone/agrarian/gn-division-form", {
        state: {
          action: DEF_ACTIONS.VIEW,
          target: selectedGnDivisions[0] || {},
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
        },
      });
    }
    if (isEcoz) {
      navigate("/zone/ez-structure/gn-division-form", {
        state: {
          action: DEF_ACTIONS.VIEW,
          target: selectedGnDivisions[0] || {},
          isAdmin: isAdmin,
          isProvincial: isProvincial,
          isIntProvincial: isIntProvincial,
          isMahaweli: isMahaweli,
        },
      });
    }
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedGnDivision(selectedGnDivisions);
  };

  const close = () => {
    setOpen(false);
    setDialogSelectedGnDivision([]);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedGnDivisions.map((p, key) => {
          return (
            <ListItem>
              <ListItemIcon>
                {loading ? (
                  <CircularProgress size={16} />
                ) : (
                  <RadioButtonCheckedIcon color="info" />
                )}
              </ListItemIcon>
              <ListItemText>
                {p.code} - {p.description}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    );
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: `Successfully Deleted`,
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || defaultMessages.apiErrorUnknown,
    });
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const gnDivision of dialogSelectedGnDivision) {
        await deleteGnDivision(gnDivision?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedGnDivisions();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getFilteredData = (selectedDsDevision) => {
    setDataEndPoint(
      `geo-data/gn-divisions/ds-division/` + selectedDsDevision?.id
    );
  };

  const resetFilter = () => {
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setSelectedDsDevision(null);
    setSelectedPDoa(null);
    setSelectedPDdoa(null);
    setSelectedPAda(null);
    setSelectedIpDoa(null);
    setSelectedIpDdoa(null);
    setSelectedIpAda(null);
    setSelectedSystem(null);
    setSelectedBlock(null);
    setSelectedMahaweliUnit(null);
    setSelectedDcomm(null);
    setSelectedAscDivision(null);
    setSelectedArpa(null);
    setSelectedAiRegion(null);
    if (isAdmin) {
      setDataEndPoint("geo-data/gn-divisions/administration-structure");
    }
    if (isProvincial) {
      setDataEndPoint(`geo-data/gn-divisions/provincial-doa`);
    }
    if (isIntProvincial) {
      setDataEndPoint(`geo-data/gn-divisions/inter-provincial-doa`);
    }
    if (isMahaweli) {
      setDataEndPoint(`geo-data/gn-divisions/mahaweli-structure`);
    }
    if (isAgrarian) {
      setDataEndPoint(`geo-data/gn-divisions/agrarian`);
    }

    // setDataEndPoint("geo-data/gn-divisions");
  };

  const resetAllFilters = () => {
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setSelectedDsDevision(null);
    setSelectedPDoa(null);
  };

  const getDistricts = (id) => {
    get_DistrictLovByProvinceId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setDistrics(dataList);
    });
  };
  const getDsDivisions = (id) => {
    get_DsDivisionLovByDistrictId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setDsDivisions(dataList);
    });
  };

  useEffect(() => {
    isAdmin === true &&
      get_ProvinceList().then(({ dataList = [] }) => {
        console.log(dataList);
        setProvinces(dataList);
      });

    isAdmin === false && setProvinces(null);
    isAdmin === false && setDistrics(null);
    isAdmin === false && setDsDivisions(null);
  }, [isAdmin]);

  useEffect(() => {
    isProvincial === true &&
      get_ProvincialDoaList().then(({ dataList = [] }) => {
        console.log(dataList);
        setPDoas(dataList);
      });

    isProvincial === false && setPDoas(null);
    isProvincial === false && setPDdoas(null);
    isProvincial === false && setPAdas(null);
  }, [isProvincial]);

  useEffect(() => {
    isIntProvincial === true &&
      get_InterProvincialDoaLov().then(({ dataList = [] }) => {
        console.log(dataList);
        setIpDoas(dataList);
      });

    isIntProvincial === false && setIpDoas(null);
    isIntProvincial === false && setIpDdoas(null);
    isIntProvincial === false && setIpAdas(null);
  }, [isIntProvincial]);

  useEffect(() => {
    isMahaweli === true &&
      get_MahaweliSystemList().then(({ dataList = [] }) => {
        console.log(dataList);
        setMahaweliSystems(dataList);
      });

    isMahaweli === false && setMahaweliSystems(null);
    isMahaweli === false && setMahaweliBlocks(null);
    isMahaweli === false && setMahaweliUnits(null);
  }, [isMahaweli]);

  useEffect(() => {
    isAgrarian === true &&
      get_DistrictCommLov().then(({ dataList = [] }) => {
        setDcomms(dataList);
      });

    isMahaweli === false && setDcomms(null);
    isMahaweli === false && setAscDivisions(null);
    isMahaweli === false && setArpas(null);
  }, [isMahaweli]);

  const getDDOAS = (id) => {
    get_ProvincialDdoaLovByDoaId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setPDdoas(dataList);
    });
  };

  const getADAS = (id) => {
    get_ProvincialAdaLovByDdoaId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setPAdas(dataList);
    });
  };

  const getIpDDOAS = (id) => {
    get_InterProvincialDdoaLovByDoaId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setIpDdoas(dataList);
    });
  };

  const getIpADAS = (id) => {
    get_InterProvincialAdaLovByDdoaId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setIpAdas(dataList);
    });
  };

  const getBlocks = (id) => {
    get_MahaweliBlockListBySystemId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setMahaweliBlocks(dataList);
    });
  };

  const getMahaweliUnits = (id) => {
    get_MahaweliUnitListByBlockId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setMahaweliUnits(dataList);
    });
  };

  const getAscDivisions = (id) => {
    get_ASCLovByComId(id, 100).then(({ dataList = [] }) => {
      setAscDivisions(dataList);
    });
  };

  const getArpas = (id) => {
    get_arpaLovByAscId(id).then(({ dataList = [] }) => {
      setArpas(dataList);
    });
  };

  const getAiRegions = (type, id) => {
    get_AiRegionLovByTypeByAdaId(type, id).then(({ dataList = [] }) => {
      setAiRegions(dataList);
    });
  };

  const changeDataEndPoint = (id) => {
    // if (isAdmin) {
    //   setDataEndPoint(`geo-data/gn-divisions/ds_division/${id}`);
    // }
    // if (isProvincial) {
    //   setDataEndPoint(`geo-data/gn-divisions/ai_region/${id}`);
    // }
    // if (isIntProvincial) {
    //   setDataEndPoint(`geo-data/gn-divisions/ai_region/${id}`);
    // }
    // if (isMahaweli) {
    //   setDataEndPoint(`geo-data/gn-divisions/mahaweli_unit/${id}`);
    // }
    // if (isAgrarian) {
    //   setDataEndPoint(`geo-data/gn-divisions/agrarian/${id}`);
    // }
  };

  const filter = () => {
    if (isAdmin) {
      if (selectedProvince?.id) {
        setDataEndPoint(
          `geo-data/gn-divisions/administration-structure?provinceId=${selectedProvince?.id}`
        );
      }

      if (selectedDistrict?.id && selectedProvince?.id) {
        setDataEndPoint(
          `geo-data/gn-divisions/administration-structure?districtId=${selectedDistrict?.id}`
        );
      }

      if (
        selectedDsDevision?.id &&
        selectedDistrict?.id &&
        selectedProvince?.id
      ) {
        setDataEndPoint(
          `geo-data/gn-divisions/administration-structure?dsDivisionId=${selectedDsDevision?.id}`
        );
      }
    }

    if (isProvincial) {
      // setDataEndPoint(
      //   `geo-data/provincial-ada-segments?proDirectorLevelId=${selectedDoa?.proDirectorId}`
      // );

      if (selectedPDoa?.id) {
        setDataEndPoint(
          `geo-data/gn-divisions/provincial-doa?directorLevelId=${selectedPDoa?.id}`
        );
      }

      if (selectedPDdoa?.id && selectedPDoa?.id) {
        setDataEndPoint(
          `geo-data/gn-divisions/provincial-doa?deputyDirectorLevelId=${selectedPDdoa?.id}`
        );
      }

      if (selectedPAda?.id && selectedPDdoa?.id && selectedPDoa?.id) {
        setDataEndPoint(
          `geo-data/gn-divisions/provincial-doa?adaSegmentId=${selectedPAda?.id}`
        );
      }

      if (
        selectedAiregion?.id &&
        selectedPAda?.id &&
        selectedPDdoa?.id &&
        selectedPDoa?.id
      ) {
        setDataEndPoint(
          `geo-data/gn-divisions/provincial-doa?regionId=${selectedAiregion?.id}`
        );
      }
    }

    if (isIntProvincial) {
      if (selectedIpDoa?.id) {
        setDataEndPoint(
          `geo-data/gn-divisions/inter-provincial-doa?directorDoaId=${selectedIpDoa?.id}`
        );
      }

      if (selectedIpDdoa?.id && selectedIpDoa?.id) {
        setDataEndPoint(
          `geo-data/gn-divisions/inter-provincial-doa?interProDdId=${selectedIpDdoa?.id}`
        );
      }

      if (selectedIpAda?.id && selectedIpDdoa?.id && selectedIpDoa?.id) {
        setDataEndPoint(
          `geo-data/gn-divisions/inter-provincial-doa?interProAdaSegId=${selectedIpAda?.id}`
        );
      }

      if (
        selectedAiregion?.id &&
        selectedIpAda?.id &&
        selectedIpDdoa?.id &&
        selectedIpDoa?.id
      ) {
        setDataEndPoint(
          `geo-data/gn-divisions/inter-provincial-doa?aiRegionId=${selectedAiregion?.id}`
        );
      }
    }

    if (isMahaweli) {
      if (selectedSystem?.id) {
        setDataEndPoint(
          `geo-data/gn-divisions/mahaweli-structure?mahaSysId=${selectedSystem?.id}`
        );
      }

      if (selectedBlock?.id && selectedSystem?.id) {
        setDataEndPoint(
          `geo-data/gn-divisions/mahaweli-structure?mahaBlockId=${selectedBlock?.id}`
        );
      }

      if (selectedMahaweliUnit?.id && selectedBlock?.id && selectedSystem?.id) {
        setDataEndPoint(
          `geo-data/gn-divisions/mahaweli-structure?mahaUnitId=${selectedMahaweliUnit?.id}`
        );
      }
    }

    if (isAgrarian) {
      if (selectedDcomm?.id) {
        setDataEndPoint(
          `geo-data/gn-divisions/agrarian?distComId=${selectedDcomm?.id}`
        );
      }

      if (selectedAscDivision?.id && selectedDcomm?.id) {
        setDataEndPoint(
          `geo-data/gn-divisions/agrarian?ascDivId=${selectedAscDivision?.id}`
        );
      }

      if (selectedArpa?.id && selectedAscDivision?.id && selectedDcomm?.id) {
        setDataEndPoint(
          `geo-data/gn-divisions/agrarian?arpaDivId=${selectedArpa?.id}`
        );
      }
    }
  };

  const onDownload = async () => {
    try {
      await downloadGnDivisionExcel(onSuccess, onError);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        height: "90vh",
        overflowY: "scroll",
      }}
    >
      <ListHeader title="Gn Division" />
      <ActionWrapper isLeft>
        <Stack direction="row" spacing={1} sx={{ paddingTop: "2px" }}>
          <ExportButton onDownload={onDownload} />
          <ButtonGroup
            variant="outlined"
            disableElevation
            size="small"
            aria-label="action button group"
            color="success"
          >
            <PermissionWrapper
              permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.GN_DIVISION}`}
            >
              <Button onClick={onCreate}>
                {" "}
                <Add />
                {DEF_ACTIONS.ADD}
              </Button>
            </PermissionWrapper>

            {selectedGnDivisions.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.GN_DIVISION}`}
              >
                <Button onClick={onEdit}>
                  <Edit />
                  {DEF_ACTIONS.EDIT}
                </Button>
              </PermissionWrapper>
            )}
            {selectedGnDivisions.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.GN_DIVISION}`}
              >
                <Button onClick={onView}>
                  <Vrpano />
                  {DEF_ACTIONS.VIEW}
                </Button>
              </PermissionWrapper>
            )}
            {selectedGnDivisions.length > 0 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.GN_DIVISION}`}
              >
                <Button onClick={onDelete}>
                  <Delete />
                  {DEF_ACTIONS.DELETE}
                </Button>
              </PermissionWrapper>
            )}
          </ButtonGroup>
        </Stack>
      </ActionWrapper>
      <ActionWrapper isLeft>
        <Grid container>
          <Grid item>
            <FieldWrapper>
              <FieldName> {filters.filter_01}</FieldName>
              <Autocomplete
                options={
                  provinces ||
                  pdoas ||
                  ipdoas ||
                  mahaweliSystems ||
                  dcomms ||
                  []
                }
                value={
                  selectedProvince ||
                  selectedPDoa ||
                  selectedIpDoa ||
                  selectedSystem ||
                  selectedDcomm
                }
                getOptionLabel={(i) =>
                  `${
                    i?.code ||
                    i?.proDirectorId ||
                    i?.doaId ||
                    i?.systemId ||
                    i?.districtCommId ||
                    ""
                  } - ${i?.name || i?.description || ""}`
                }
                onChange={(event, value) => {
                  console.log(value);
                  if (isAdmin) {
                    setSelectedProvince(value);
                    setSelectedDistrict({ name: "", code: "" });
                    setSelectedDsDevision({ name: "", code: "" });
                    getDistricts(value.id);
                  }
                  if (isProvincial) {
                    setSelectedPDoa(value);
                    setSelectedPDdoa({ provincialDdId: "", description: "" });
                    setSelectedPAda({ provinceSegmentId: "", description: "" });
                    getDDOAS(value.id);
                  }
                  if (isIntProvincial) {
                    setSelectedIpDoa(value);
                    setSelectedIpDdoa({
                      ddId: "",
                      description: "",
                    });
                    setSelectedIpAda({
                      segmentId: "",
                      description: "",
                    });
                    getIpDDOAS(value.id);
                  }
                  if (isMahaweli) {
                    setSelectedSystem(value);
                    setSelectedBlock({
                      code: "",
                      description: "",
                    });
                    setSelectedMahaweliUnit({
                      unitId: "",
                      description: "",
                    });
                    getBlocks(value.id);
                  }
                  if (isAgrarian) {
                    setSelectedDcomm(value);
                    setSelectedAscDivision({
                      ascId: "",
                      name: "",
                    });
                    setSelectedArpa({
                      arpaId: "",
                      name: "",
                    });
                    getAscDivisions(value.id);
                  }
                }}
                fullWidth
                disableClearable
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                    fontSize: "14px",
                    width: "200px",
                  },
                  marginRight: "5px",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    fullWidth
                    sx={{ fontSize: "12px" }}
                  />
                )}
              />
            </FieldWrapper>
          </Grid>
          <Grid item>
            <FieldWrapper>
              <FieldName> {filters.filter_02}</FieldName>
              <Autocomplete
                disabled={
                  selectedProvince?.id == null &&
                  selectedPDoa?.id == null &&
                  selectedIpDoa?.id == null &&
                  selectedSystem?.id == null &&
                  selectedDcomm?.id == null
                }
                options={
                  districs ||
                  pddoas ||
                  ipddoas ||
                  mahaweliBlocks ||
                  ascDivisions ||
                  []
                }
                value={
                  selectedDistrict ||
                  selectedPDdoa ||
                  selectedIpDdoa ||
                  selectedBlock ||
                  selectedAscDivision
                }
                getOptionLabel={(i) =>
                  `${
                    i?.code || i?.provincialDdId || i?.ddId || i?.ascId || ""
                  } - ${i?.name || i?.description || ""}`
                }
                onChange={(event, value) => {
                  if (isAdmin) {
                    console.log(value);
                    setSelectedDistrict(value);
                    setSelectedDsDevision({ name: "", code: "" });
                    getDsDivisions(value.id);
                  }
                  if (isProvincial) {
                    setSelectedPDdoa(value);
                    setSelectedPAda({ provinceSegmentId: "", description: "" });
                    getADAS(value.id);
                  }
                  if (isIntProvincial) {
                    setSelectedIpDdoa(value);
                    setSelectedIpAda({
                      segmentId: "",
                      description: "",
                    });
                    getIpADAS(value.id);
                  }
                  if (isMahaweli) {
                    setSelectedBlock(value);
                    setSelectedMahaweliUnit({
                      unitId: "",
                      description: "",
                    });
                    getMahaweliUnits(value.id);
                  }
                  if (isAgrarian) {
                    setSelectedAscDivision(value);
                    setSelectedArpa({
                      arpaId: "",
                      name: "",
                    });
                    getArpas(value.id);
                  }
                }}
                fullWidth
                disableClearable
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                    fontSize: "14px",
                    width: "200px",
                  },
                  marginRight: "5px",
                }}
                renderInput={(params) => (
                  <TextField {...params} size="small" fullWidth />
                )}
              />
            </FieldWrapper>
          </Grid>
          <Grid item>
            <FieldWrapper>
              <FieldName>{filters.filter_03}</FieldName>
              <Autocomplete
                disabled={
                  selectedDistrict?.id == null &&
                  selectedPDdoa?.id == null &&
                  selectedIpDdoa?.id == null &&
                  selectedBlock?.id == null &&
                  selectedAscDivision?.id == null
                }
                options={
                  dsDivisions || padas || ipadas || mahaweliUnits || arpas || []
                }
                value={
                  selectedDsDevision ||
                  selectedPAda ||
                  selectedIpAda ||
                  selectedMahaweliUnit ||
                  selectedArpa
                }
                getOptionLabel={(i) =>
                  `${
                    i?.code ||
                    i?.provinceSegmentId ||
                    i?.segmentId ||
                    i?.unitId ||
                    i?.arpaId ||
                    ""
                  } - ${i?.name || i?.description || ""}`
                }
                onChange={(event, value) => {
                  if (isAdmin) {
                    console.log(value);
                    setSelectedDsDevision(value);
                    changeDataEndPoint(value.id);
                  }
                  if (isProvincial) {
                    setSelectedPAda(value);
                    getAiRegions("PROVINCIAL", value.id);
                  }
                  if (isIntProvincial) {
                    setSelectedIpAda(value);
                    getAiRegions("INTER_PROVINCIAL", value.id);
                  }
                  if (isMahaweli) {
                    setSelectedMahaweliUnit(value);
                    changeDataEndPoint(value.id);
                  }
                  if (isAgrarian) {
                    setSelectedArpa(value);
                    changeDataEndPoint(value.id);
                  }
                }}
                fullWidth
                disableClearable
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                    fontSize: "14px",
                    width: "200px",
                  },
                  marginRight: "5px",
                }}
                renderInput={(params) => (
                  <TextField {...params} size="small" fullWidth />
                )}
              />
            </FieldWrapper>
          </Grid>
          {filters.filter_04 !== "" && (
            <Grid item>
              <FieldWrapper>
                <FieldName>Select {filters.filter_04}</FieldName>
                <Autocomplete
                  disabled={
                    selectedPAda?.id == null && selectedIpAda?.id == null
                  }
                  options={aiRegions || []}
                  value={selectedAiregion}
                  getOptionLabel={(i) =>
                    `${i?.regionId || ""} - ${i?.name || i?.description || ""}`
                  }
                  onChange={(event, value) => {
                    if (isProvincial || isIntProvincial) {
                      setSelectedAiRegion(value);
                      //changeDataEndPoint(value.id);
                    }
                  }}
                  fullWidth
                  disableClearable
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "4px",
                      fontSize: "14px",
                      width: "200px",
                    },
                    marginRight: "5px",
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": {},
                      }}
                    />
                  )}
                />
              </FieldWrapper>
            </Grid>
          )}

          <Grid item>
            <FieldWrapper>
              <Button
                color="success"
                variant="contained"
                size="small"
                onClick={filter}
                sx={{ marginTop: "40px" }}
              >
                <FilterAltIcon />
                Filter
              </Button>
            </FieldWrapper>
          </Grid>

          <Grid item>
            <FieldWrapper>
              <Button
                color="success"
                variant="contained"
                size="small"
                onClick={resetFilter}
                sx={{ marginTop: "40px" }}
              >
                <RestartAlt />
                Reset
              </Button>
            </FieldWrapper>
          </Grid>

          <Grid item container>
            <FieldWrapper>
              <FieldName>.</FieldName>

              <TextField
                name="cropArea"
                id="cropArea"
                value={searchText}
                fullWidth
                //disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => {
                  // const value = parseFloat(e.target.value) || 0;
                  handleChange(e);
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>

            <Grid item>
              <FieldWrapper>
                <Button
                  color="success"
                  variant="contained"
                  size="small"
                  onClick={handleSearch}
                  sx={{ marginTop: "40px" }}
                >
                  Search
                </Button>
              </FieldWrapper>
            </Grid>
          </Grid>
        </Grid>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.GN_DIVISION}`}
      >
        {loading === false && (
          <GnDivisionList
            geoZoneStucture={{
              isAdmin: isAdmin,
              isProvincial: isProvincial,
              isIntProvincial: isIntProvincial,
              isMahaweli: isMahaweli,
              isAgrarian: isAgrarian,
              isEcoz: isEcoz,
            }}
            selectedRows={selectedGnDivisions}
            onRowSelect={toggleGnDivisionSelect}
            selectAll={selectAllGnDivisions}
            unSelectAll={resetSelectedGnDivisions}
            dataEndPoint={dataEndPoint}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedGnDivisions}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedGnDivision}
        dialogSelectedTypes={dialogSelectedGnDivision}
        propertyId="code"
        propertyDescription="name"
      />
    </div>
  );
};

export default GnDivision;
