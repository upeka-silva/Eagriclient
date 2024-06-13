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
} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ASCList from "./ASCList";
import { useNavigate } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { deleteASC ,downloadASCExcel} from "../../../redux/actions/asc/action";
import DialogBox from "../../../components/PageLayout/DialogBox";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { Add, Delete, Edit, RestartAlt, Vrpano } from "@mui/icons-material";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_DistrictCommList } from "../../../redux/actions/districtComm/action";
import { Fonts } from "../../../utils/constants/Fonts";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import CrudActionButton from "../../../components/CrudActionButton/CrudActionButton";
import ExportButton from "../../../components/ExportButton/ExportButton";

const ASC = () => {
  useUserAccessValidation();
  const { addSnackBar } = useSnackBars();

  const [dataEndPoint, setDataEndPoint] = useState("geo-data/asc-divisions");
  const [selectedAsc, setSelectedAsc] = useState([]);
  const [dialogSelectedAsc, setDialogSelectedAsc] = useState([]);

  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dcomms, setDcomms] = useState([]);
  const [selectedDcomm, setSelectedDcomm] = useState({
    districtCommId: "",
    name: "",
  });

  const navigate = useNavigate();

  const toggleAscSelect = (component) => {
    setSelectedAsc((current = []) => {
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

  const selectAllAsc = (all = []) => {
    setSelectedAsc(all);
  };

  const resetSelectedAsc = () => {
    setSelectedAsc([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/agrarian/asc-division-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/agrarian/asc-division-form", {
      state: { action: DEF_ACTIONS.EDIT, target: selectedAsc[0] || {} },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/agrarian/asc-division-form", {
      state: { action: DEF_ACTIONS.VIEW, target: selectedAsc[0] || {} },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedAsc(selectedAsc);
  };

  const close = () => {
    setOpen(false);
    setDialogSelectedAsc([]);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedAsc.map((p, key) => {
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
                {p.ascCode} - {p.name}
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
      for (const asc of dialogSelectedAsc) {
        await deleteASC(asc?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedAsc();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getFilteredData = (selectedDcomm) => {
    console.log(selectedDcomm);
    setDataEndPoint(
      `geo-data/asc-divisions/districtCommissionerLevel/` + selectedDcomm?.id
    );
  };

  const resetFilter = () => {
    setSelectedDcomm({
      districtCommId: "",
      name: "",
    });
    setDataEndPoint("geo-data/asc-divisions");
  };

  useEffect(() => {
    get_DistrictCommList().then(({ dataList = [] }) => {
      setDcomms(dataList);
    });
  }, []);
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
      await downloadASCExcel();
      onDownloadSuccess();
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
      <ListHeader title="ASC Division" />
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
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.ASC_DIVISION}`}
          >
            <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
          </PermissionWrapper>

          {selectedAsc.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.ASC_DIVISION}`}
            >
              <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
            </PermissionWrapper>
          )}
          {selectedAsc.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.ASC_DIVISION}`}
            >
              <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
            </PermissionWrapper>
          )}
          {selectedAsc.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.ASC_DIVISION}`}
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
          <Grid item lg={2}>
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.ASC_DIVISION}`}
      >
        {loading === false && (
          <ASCList
            dataEndPoint={dataEndPoint}
            selectedRows={selectedAsc}
            onRowSelect={toggleAscSelect}
            selectAll={selectAllAsc}
            unSelectAll={resetSelectedAsc}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedAsc}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedAsc}
        dialogSelectedTypes={dialogSelectedAsc}
        propertyId="ascId"
        propertyDescription="name"
      />
    </div>
  );
};

export default ASC;
