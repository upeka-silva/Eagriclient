import React, { useEffect, useState } from "react";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ARPAList from "./ARPAList";
import { useNavigate } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { useSnackBars } from "../../../context/SnackBarContext";
import DialogBox from "../../../components/PageLayout/DialogBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { deleteARPA,downloadARPAExcel } from "../../../redux/actions/arpa/action";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { Add, Delete, Edit, RestartAlt, Vrpano } from "@mui/icons-material";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_DistrictCommList } from "../../../redux/actions/districtComm/action";
import { get_ASCListByComId } from "../../../redux/actions/asc/action";
import { Fonts } from "../../../utils/constants/Fonts";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CrudActionButton from "../../../components/CrudActionButton/CrudActionButton";
import ExportButton from "../../../components/ExportButton/ExportButton";

const ARPA = () => {
  useUserAccessValidation();
  const { addSnackBar } = useSnackBars();

  const [dataEndPoint, setDataEndPoint] = useState("geo-data/arpa");
  const [selectedArpa, setSelectedArpa] = useState([]);
  const [dialogSelectedArpa, setDialogSelectedArpa] = useState([]);

  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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

  const navigate = useNavigate();

  const toggleArpaSelect = (component) => {
    setSelectedArpa((current = []) => {
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

  const selectAllArpa = (all = []) => {
    setSelectedArpa(all);
  };

  const resetSelectedArpa = () => {
    setSelectedArpa([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/agrarian/arpa-division-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/agrarian/arpa-division-form", {
      state: { action: DEF_ACTIONS.EDIT, target: selectedArpa[0] || {} },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/agrarian/arpa-division-form", {
      state: { action: DEF_ACTIONS.VIEW, target: selectedArpa[0] || {} },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedArpa(selectedArpa);
  };

  const close = () => {
    setOpen(false);
    setDialogSelectedArpa(dialogSelectedArpa);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedArpa.map((p, key) => {
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
                {p.arpaId} - {p.name}
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
      for (const arpa of dialogSelectedArpa) {
        await deleteARPA(arpa?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedArpa();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const resetFilter = () => {
    setSelectedDcomm({
      districtCommId: "",
      name: "",
    });
    setSelectedAscDivision({
      ascId: "",
      name: "",
    });
    setDataEndPoint("geo-data/arpa/agrarian");
  };

  const filter = () => {

    if(selectedDcomm?.id) {
     setDataEndPoint(`geo-data/arpa/agrarian?distComId=${selectedDcomm?.id}`);
    }

    if(selectedAscDivision?.id && selectedDcomm?.id) {
      setDataEndPoint(`geo-data/arpa/agrarian?ascDivId=${selectedAscDivision?.id}`);
    }

  }

  useEffect(() => {
    get_DistrictCommList().then(({ dataList = [] }) => {
      setDcomms(dataList);
    });
  }, []);

  const getAscDivisions = (id) => {
    get_ASCListByComId(id).then(({ dataList = [] }) => {
      setAscDivisions(dataList);
    });
  };

  const getFilteredData = (selectedAscDivision) => {
    // console.log(selectedAscDivision);
    // setDataEndPoint(`geo-data/arpa/AscDivision/` + selectedAscDivision?.id);
  };
  const onDownloadSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Downloaded successfully",
    });
  };
  
  const onDownloadError = () => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: "Download failed",
    });
  };
  
  const onDownload = async () => {
    try {
      await downloadARPAExcel(onDownloadSuccess,onDownloadError);
    } catch (error) {
      console.error("Download failed:", error);
      onDownloadError();
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
      <ListHeader title="ARPA Division" />
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
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.ARPA}`}
          >
            <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
          </PermissionWrapper>

          {selectedArpa.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.ARPA}`}
            >
              <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
            </PermissionWrapper>
          )}
          {selectedArpa.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.ARPA}`}
            >
              <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
            </PermissionWrapper>
          )}
          {selectedArpa.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.ARPA}`}
            >
              <CrudActionButton action={DEF_ACTIONS.DELETE} handle={onDelete} />
            </PermissionWrapper>
          )}
        </ButtonGroup>
        </Stack>
      </ActionWrapper>
      <ActionWrapper isLeft>
        <Grid container>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Select District Commissioner</FieldName>
              <Autocomplete
                // disabled={state?.action === DEF_ACTIONS.VIEW}
                options={dcomms}
                value={selectedDcomm}
                getOptionLabel={(i) => `${i?.districtCommId} - ${i?.name}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedDcomm(value);
                  setSelectedAscDivision({
                    ascId: "",
                    name: "",
                  });
                  getAscDivisions(value.id);
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
              <FieldName>Select ASC Division</FieldName>
              <Autocomplete
                disabled={selectedDcomm.id == null}
                options={ascDivisions}
                value={selectedAscDivision}
                getOptionLabel={(i) => `${i?.ascId} - ${i?.name}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedAscDivision(value);
                  getFilteredData(value.id);
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
        </Grid>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.ARPA}`}
      >
        {loading === false && (
          <ARPAList
            dataEndPoint={dataEndPoint}
            selectedRows={selectedArpa}
            onRowSelect={toggleArpaSelect}
            selectAll={selectAllArpa}
            unSelectAll={resetSelectedArpa}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedArpa}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedArpa}
        dialogSelectedTypes={dialogSelectedArpa}
        propertyId="arpaId"
        propertyDescription="name"
      />
    </div>
  );
};

export default ARPA;
