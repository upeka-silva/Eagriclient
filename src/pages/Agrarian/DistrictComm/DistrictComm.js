import React, { useEffect, useState } from "react";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useNavigate } from "react-router-dom";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
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
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import DialogBox from "../../../components/PageLayout/DialogBox";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import {
  deleteDistrictComm,
  get_DistrictCommList,
} from "../../../redux/actions/districtComm/action";
import { Add, Delete, Edit, Search, Vrpano } from "@mui/icons-material";
import DistrictCommList from "./DistrictCommList";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import CrudActionButton from "../../../components/CrudActionButton/CrudActionButton";
import ExportButton from "../../../components/ExportButton/ExportButton";
import { downloadDistrictComExcel } from "../../../redux/actions/districtComm/action";

const DistrictComm = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState({});

  const [selectedDistrictComm, setSelectedDistrictComm] = useState([]);
  const [dialogSelectedDistrictComm, setDialogSelectedDistrictComm] = useState(
    []
  );

  const [dataEndPoint, setDataEndPoint] = useState(
    "geo-data/district-commissioner-level"
  );

  const [selectedDoa, setSelectedDoa] = useState();
  const [doas, setDoas] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleDistrictCommSelect = (component) => {
    setSelectedDistrictComm((current = []) => {
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

  const selectAllDistrictComm = (all = []) => {
    setSelectedDistrictComm(all);
  };

  const resetSelectedDistrictComm = () => {
    setSelectedDistrictComm([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/agrarian/district-commissioner-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/agrarian/district-commissioner-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedDistrictComm[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/agrarian/district-commissioner-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedDistrictComm[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedDistrictComm(selectedDistrictComm);
  };

  const onClose = () => {
    setOpen(false);
    setDialogSelectedDistrictComm([]);
  };

  useEffect(() => {
    get_DistrictCommList().then(({ dataList = [] }) => {
      console.log(dataList);
      setDoas(dataList);
    });
  }, []);

  const getFilteredData = () => {
    console.log(selectedDoa);
    setDataEndPoint(`geo-data/district-commissioner-level` + selectedDoa?.id);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedDistrictComm.map((item) => {
          return (
            <ListItem>
              <ListItemIcon>
                {loading ? (
                  <CircularProgress size={20} />
                ) : (
                  <RadioButtonCheckedIcon color="info" />
                )}
              </ListItemIcon>
              <ListItemText>
                {item?.doAgrarianDevelopmentId} - {item?.name}
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
      message: "Successfully deleted",
    });
  };

  const onError = () => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: "Failed to delete",
    });
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const districtComm of dialogSelectedDistrictComm) {
        await deleteDistrictComm(districtComm.id, onSuccess, onError);
      }
      setLoading(false);
      onClose();
      resetSelectedDistrictComm();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
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
      await downloadDistrictComExcel(onDownloadSuccess,onDownloadError);
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
      <ListHeader title="District Commissioner" />
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
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.DISTRICT_COMMISSIONER_LEVEL}`}
          >
            <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
          </PermissionWrapper>

          {selectedDistrictComm.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.DISTRICT_COMMISSIONER_LEVEL}`}
            >
              <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
            </PermissionWrapper>
          )}
          {selectedDistrictComm.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.DISTRICT_COMMISSIONER_LEVEL}`}
            >
              <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
            </PermissionWrapper>
          )}
          {selectedDistrictComm.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.DISTRICT_COMMISSIONER_LEVEL}`}
            >
              <CrudActionButton action={DEF_ACTIONS.DELETE} handle={onDelete} />
            </PermissionWrapper>
          )}
        </ButtonGroup>
        </Stack>
      </ActionWrapper>

      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.DISTRICT_COMMISSIONER_LEVEL}`}
      >
        {loading === false && (
          <DistrictCommList
            selectedRows={selectedDistrictComm}
            onRowSelect={toggleDistrictCommSelect}
            selectAll={selectAllDistrictComm}
            unSelectAll={resetSelectedDistrictComm}
            // dataEndPoint={dataEndPoint}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedDistrictComm}
        loading={loading}
        onClose={onClose}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedDistrictComm}
        dialogSelectedTypes={dialogSelectedDistrictComm}
        propertyId="districtCommId"
        propertyDescription="name"
      />
    </div>
  );
};

export default DistrictComm;
