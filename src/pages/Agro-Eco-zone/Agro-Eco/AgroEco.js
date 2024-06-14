import React, { useState } from "react";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useNavigate } from "react-router-dom";
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
  Typography,
} from "@mui/material";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import AgroEcoList from "./AgroEcoList";
import DialogBox from "../../../components/PageLayout/DialogBox";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { deleteAgroEco ,downloadEcoZoneExcel} from "../../../redux/actions/agroEco/action";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { useSnackBars } from "../../../context/SnackBarContext";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import CrudActionButton from "../../../components/CrudActionButton/CrudActionButton";
import ExportButton from "../../../components/ExportButton/ExportButton";

const AgroEco = () => {
  useUserAccessValidation();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedAgroEco, setSelectedAgroEco] = useState([]);
  const [dilogSelectedAgroEco, setDialogSelectedAgroEco] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [open, setOpen] = useState(false);
  const { addSnackBar } = useSnackBars();

  const toggleAgroEcoSelect = (component) => {
    setSelectedAgroEco((current = []) => {
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

  const selectAllAgroEco = (all = []) => {
    setSelectedAgroEco(all);
  };

  const resetSelectedAgroEco = () => {
    setSelectedAgroEco([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/ez-structure/agro-eco-zone-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/ez-structure/agro-eco-zone-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedAgroEco[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/ez-structure/agro-eco-zone-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedAgroEco[0] || {},
      },
    });
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

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedAgroEco(selectedAgroEco);
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const agro of dilogSelectedAgroEco) {
        await deleteAgroEco(agro?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedAgroEco();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const close = () => {
    setOpen(false);
    setDialogSelectedAgroEco([]);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedAgroEco.map((p, key) => {
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
                {p.aeZoneId} - {p.name}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    );
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
      await downloadEcoZoneExcel(onDownloadSuccess,onDownloadError);
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
      <ListHeader title="Agro Eco Zone" />
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
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.AGRO_ECOLOGICAL_ZONE}`}
          >
            <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
          </PermissionWrapper>
          {selectedAgroEco.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.AGRO_ECOLOGICAL_ZONE}`}
            >
              <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
            </PermissionWrapper>
          )}
          {selectedAgroEco.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.AGRO_ECOLOGICAL_ZONE}`}
            >
              <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
            </PermissionWrapper>
          )}
          {selectedAgroEco.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.AGRO_ECOLOGICAL_ZONE}`}
            >
              <CrudActionButton action={DEF_ACTIONS.DELETE} handle={onDelete} />
            </PermissionWrapper>
          )}
        </ButtonGroup>
        </Stack>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AGRO_ECOLOGICAL_ZONE}`}
      >
        {loading === false && (
          <AgroEcoList
            selectedRows={selectedAgroEco}
            onRowSelect={toggleAgroEcoSelect}
            selectAll={selectAllAgroEco}
            unSelectAll={resetSelectedAgroEco}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedAgroEco}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedAgroEco}
        dialogSelectedTypes={dilogSelectedAgroEco}
        propertyId="aeZoneId"
        propertyDescription="name"
      />
    </div>
  );
};

export default AgroEco;
