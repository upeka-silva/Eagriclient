import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
import { Add, Search } from "@mui/icons-material";
import { get_ProvinceList } from "../../../redux/actions/province/action";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import ListHeader from "../../../components/ListHeader/ListHeader";

const GnDivision = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

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
    navigate("/zone/ga-structure/gn-division-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/ga-structure/gn-division-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedGnDivisions[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/ga-structure/gn-division-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedGnDivisions[0] || {},
      },
    });
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

  const getFilteredData = () => {
    setDataEndPoint(
      `geo-data/gn-divisions/ds-division/` + selectedDsDevision?.id
    );
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
              <ActionButton onClick={onEdit}>
                <EditIcon />
              </ActionButton>
            </PermissionWrapper>
          )}
          {selectedGnDivisions.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.GN_DIVISION}`}
            >
              <ActionButton onClick={onView}>
                <VisibilityIcon />
              </ActionButton>
            </PermissionWrapper>
          )}
          {selectedGnDivisions.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.GN_DIVISION}`}
            >
              <ActionButton onClick={onDelete}>
                <DeleteForeverIcon />
              </ActionButton>
            </PermissionWrapper>
          )}
        </ButtonGroup>
      </ActionWrapper>
      <ActionWrapper isLeft>
        <Grid container>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Select Province</FieldName>
              <Autocomplete
                // disabled={state?.action === DEF_ACTIONS.VIEW}
                options={provinces}
                value={selectedProvince}
                getOptionLabel={(i) => `${i?.code} - ${i?.name}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedProvince(value);
                  setSelectedDistrict({ name: "", code: "" });
                  setSelectedDsDevision({ name: "", code: "" });
                  setDistrics(value?.districtDTOList);
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
          <Grid item lg={3}>
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
                  setDsDivisions(value.dsDivisionDTOList);
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
          <Grid item lg={3}>
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
          <Grid item lg={2}>
            <FieldWrapper>
              <Button
                color="success"
                variant="contained"
                size="small"
                onClick={getFilteredData}
                sx={{ marginTop: "40px" }}
              >
                <Search />
                Search
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
