import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import DialogBox from "../../../components/PageLayout/DialogBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { Add, Delete, Download, Edit, Vrpano } from "@mui/icons-material";
import ListHeader from "../../../components/ListHeader/ListHeader";
import CropPestList from "./CropPestList";
import ExportButton from "../../../components/ExportButton/ExportButton";
import {
  deleteCropPest,
  downloadCropPestExcel,
  get_CropPestList,
} from "../../../redux/actions/crop/CropPest/action";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";

const CropPest = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectCropPest, setSelectCropPest] = useState([]);
  const [dialogSelectedCropPest, setDialogSelectedCropPest] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const url = `crop/crop-pests`;

  const toggleCropPestSelect = (component) => {
    setSelectCropPest((current = []) => {
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

  const selectAllCropPest = (all = []) => {
    setSelectCropPest(all);
  };

  const resetSelectedCropPest = () => {
    setSelectCropPest([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/crop/crop-pest-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/crop/crop-pest-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectCropPest[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/crop/crop-pest-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectCropPest[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedCropPest(selectCropPest);
  };

  const close = () => {
    setOpen(false);
    setDialogSelectedCropPest([]);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectCropPest.map((p, key) => {
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
                {p.pestName} - {p.scientificName}
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
      for (const crop of dialogSelectedCropPest) {
        await deleteCropPest(crop?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedCropPest();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const onDownload = async () => {
    try {
      await downloadCropPestExcel();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ListHeader title="Crop Pest" />
      <ActionWrapper isLeft>
      <Stack direction="row" spacing={1} sx={{ paddingTop:"2px"}}>
      <ExportButton onDownload={onDownload} />
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.CROP_PEST}`}
          >
            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>
          {selectCropPest.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.CROP_PEST}`}
            >
              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectCropPest.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_PEST}`}
            >
              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectCropPest.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.CROP_PEST}`}
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
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.CROP_PEST}`}
      >
        {loading === false && (
          <CropPestList
            url={url}
            selectedRows={selectCropPest}
            onRowSelect={toggleCropPestSelect}
            selectAll={selectAllCropPest}
            unSelectAll={resetSelectedCropPest}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectCropPest}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedCropPest}
        dialogSelectedTypes={dialogSelectedCropPest}
        propertyId="pestName"
        propertyDescription="scientificName"
      />
    </div>
  );
};

export default CropPest;
