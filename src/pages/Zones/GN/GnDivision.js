import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Autocomplete,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import GnDivisionList from "./GnDivisionList";
import { ActionButton } from "../../../components/ActionButtons/ActionButton";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSnackBars } from "../../../context/SnackBarContext";
import { deleteGnDivision } from "../../../redux/actions/gnDivision/action";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import DialogBox from "../../../components/PageLayout/DialogBox";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import {
  Add,
  Delete,
  Edit,
  RestartAlt,
  Search,
  Vrpano,
} from "@mui/icons-material";
import { get_ProvinceList } from "../../../redux/actions/province/action";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_DsDivisionListByDistrictId } from "../../../redux/actions/dsDivision/action";
import { get_DistrictListByProvinceId } from "../../../redux/actions/district/action";
import ListHeader from "../../../components/ListHeader/ListHeader";

const GnDivision = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.pathname);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isProvincial, setIsProvincial] = useState(false);
  const [isIntProvincial, setIsIntProvincial] = useState(false);
  const [isMahaweli, setIsMahaweli] = useState(false);
  const [isAgrarian, setIsAgrarian] = useState(false);
  const [isEcoz, setIsEcoz] = useState(false);

  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedGnDivisions, setSelectedGnDivisions] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [dataEndPoint, setDataEndPoint] = useState("geo-data/gn-divisions");

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

  useEffect(() => {
    if (location.pathname == "/zone/ga-structure/gn-division") {
      setIsAdmin(true);
    }
    if (location.pathname == "/zone/provincial-structure/gn-division") {
      setIsProvincial(true);
    }
    if (location.pathname == "/zone/inter-provincial-structure/gn-division") {
      setIsIntProvincial(true);
    }
    if (location.pathname == "/zone/mahaweli-structure/gn-division") {
      setIsMahaweli(true);
    }
    if (location.pathname == "/zone/agrarian/gn-division") {
      setIsAgrarian(true);
    }
    if (location.pathname == "/zone/ez-structure/gn-division") {
      setIsEcoz(true);
    }
  }, []);

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
          isAgrarian : isAgrarian,
          isEcoz:isEcoz
          
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
          isAgrarian : isAgrarian,
          isEcoz:isEcoz
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
          isAgrarian : isAgrarian,
          isEcoz:isEcoz
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
          isAgrarian : isAgrarian,
          isEcoz:isEcoz
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
          isAgrarian : isAgrarian,
          isEcoz:isEcoz
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
          isAgrarian : isAgrarian,
          isEcoz:isEcoz
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
          isAgrarian : isAgrarian,
          isEcoz:isEcoz
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
          isAgrarian : isAgrarian,
          isEcoz:isEcoz
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
          isAgrarian : isAgrarian,
          isEcoz:isEcoz
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
          isAgrarian : isAgrarian,
          isEcoz:isEcoz
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
          isAgrarian : isAgrarian,
          isEcoz:isEcoz
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
          isAgrarian : isAgrarian,
          isEcoz:isEcoz
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
  };

  const close = () => {
    setOpen(false);
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
      for (const gnDivision of selectedGnDivisions) {
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
  useEffect(() => {
    get_ProvinceList().then(({ dataList = [] }) => {
      console.log(dataList);
      setProvinces(dataList);
    });
  }, []);

  const getFilteredData = (selectedDsDevision) => {
    setDataEndPoint(
      `geo-data/gn-divisions/ds-division/` + selectedDsDevision?.id
    );
  };

  const resetFilter = () => {
    setSelectedProvince({ code: "", name: "" });
    setSelectedDistrict({ code: "", name: "" });
    setSelectedDsDevision({ code: "", name: "" });
    setDataEndPoint("geo-data/gn-divisions");
  };

  const getDistricts = (id) => {
    get_DistrictListByProvinceId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setDistrics(dataList);
    });
  };
  const getDsDivisions = (id) => {
    get_DsDivisionListByDistrictId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setDsDivisions(dataList);
    });
  };

  return (
    <div>
      <ListHeader title="Gn Division" />
      <ActionWrapper isLeft>
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
      </ActionWrapper>
      <ActionWrapper isLeft>
        <Grid container>
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Select Province</FieldName>
              <Autocomplete
                options={provinces}
                value={selectedProvince}
                getOptionLabel={(i) => `${i?.code} - ${i?.name}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedProvince(value);
                  setSelectedDistrict({ name: "", code: "" });
                  setSelectedDsDevision({ name: "", code: "" });

                  getDistricts(value.id);
                }}
                fullWidth
                disableClearable
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
                  marginRight: "5px",
                }}
                renderInput={(params) => (
                  <TextField {...params} size="small" fullWidth />
                )}
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Select District</FieldName>
              <Autocomplete
                disabled={selectedProvince?.id == null}
                options={districs}
                value={selectedDistrict}
                getOptionLabel={(i) => `${i?.code} - ${i?.name}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedDistrict(value);
                  setSelectedDsDevision({ name: "", code: "" });

                  getDsDivisions(value.id);
                }}
                fullWidth
                disableClearable
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
                  marginRight: "5px",
                }}
                renderInput={(params) => (
                  <TextField {...params} size="small" fullWidth />
                )}
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Select Ds Devision</FieldName>
              <Autocomplete
                disabled={selectedDistrict?.id == null}
                options={dsDivisions}
                value={selectedDsDevision}
                getOptionLabel={(i) => `${i?.code} - ${i?.name}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedDsDevision(value);
                  getFilteredData(value);
                }}
                fullWidth
                disableClearable
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
                  marginRight: "5px",
                }}
                renderInput={(params) => (
                  <TextField {...params} size="small" fullWidth />
                )}
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={2} md={2} lg={2}>
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
        </Grid>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.GN_DIVISION}`}
      >
        {loading === false && (
          <GnDivisionList
            selectedRows={selectedGnDivisions}
            onRowSelect={toggleGnDivisionSelect}
            selectAll={selectAllGnDivisions}
            unSelectAll={resetSelectedGnDivisions}
            dataEndPoint={dataEndPoint}
          />
        )}
      </PermissionWrapper>
      <DialogBox
        open={open}
        title="Delete Soil Subtype"
        actions={
          <ActionWrapper>
            <Button
              variant="contained"
              color="info"
              onClick={onConfirm}
              sx={{ ml: "8px" }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={close}
              sx={{ ml: "8px" }}
            >
              Close
            </Button>
          </ActionWrapper>
        }
      >
        <>
          <DeleteMsg />
          <Divider sx={{ mt: "16px" }} />
          {renderSelectedItems()}
        </>
      </DialogBox>
    </div>
  );
};

export default GnDivision;
