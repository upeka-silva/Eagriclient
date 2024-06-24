import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import DialogBox from "../../../components/PageLayout/DialogBox";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { deleteScsService,downloadScsExcel } from "../../../redux/actions/scsService/action";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import ScsServiceList from "./ScsServiceList";
import { Fonts } from "../../../utils/constants/Fonts";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import CrudActionButton from "../../../components/CrudActionButton/CrudActionButton";
import ExportButton from "../../../components/ExportButton/ExportButton";

const ScsService = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedScsService, setSelectedScsService] = useState([]);
  const [dialogSelectedScsService, setDialogSelectedScsService] = useState([]);

  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleScsServiceSelect = (component) => {
    setSelectedScsService((current = []) => {
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

  const selectAllScsService = (all = []) => {
    setSelectedScsService(all);
  };

  const resetSelectedScsService = () => {
    setSelectedScsService([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/scs-structure/scs-service-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/scs-structure/scs-service-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedScsService[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/scs-structure/scs-service-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedScsService[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedScsService(selectedScsService);
  };

  const onClose = () => {
    setOpen(false);
    setDialogSelectedScsService([]);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedScsService.map((item, id) => {
          return (
            <ListItem key={id}>
              <ListItemIcon>
                {loading ? (
                  <CircularProgress size={20} />
                ) : (
                  <RadioButtonCheckedIcon color="info" />
                )}
              </ListItemIcon>
              <ListItemText>
                {" "}
                {item?.scsServiceId} - {item?.name}
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
      for (const scsService of dialogSelectedScsService) {
        await deleteScsService(scsService.id, onSuccess, onError);
      }
      setLoading(false);
      onClose();
      resetSelectedScsService();
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
      await downloadScsExcel(onDownloadSuccess,onDownloadError);
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
      <ListHeader title="Scs Service" />
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
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.SCS_SERVICE}`}
          >
            <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
          </PermissionWrapper>

          {selectedScsService.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.SCS_SERVICE}`}
            >
              <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
            </PermissionWrapper>
          )}
          {selectedScsService.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.SCS_SERVICE}`}
            >
              <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
            </PermissionWrapper>
          )}
          {selectedScsService.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.SCS_SERVICE}`}
            >
              <CrudActionButton action={DEF_ACTIONS.DELETE} handle={onDelete} />
            </PermissionWrapper>
          )}
        </ButtonGroup>
        </Stack>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.SCS_SERVICE}`}
      >
        {loading === false && (
          <ScsServiceList
            selectedRows={selectedScsService}
            onRowSelect={toggleScsServiceSelect}
            selectAll={selectAllScsService}
            unSelectAll={resetSelectedScsService}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedScsService}
        loading={loading}
        onClose={onClose}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedScsService}
        dialogSelectedTypes={dialogSelectedScsService}
        propertyId="scsServiceId"
        propertyDescription="name"
      />
    </div>
  );
};

export default ScsService;
