import React, { useState, useCallback } from "react";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import {
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ProvinceAreaList from "./ProvinceAreaList";
import { useNavigate } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import DialogBox from "../../../components/PageLayout/DialogBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { deleteInterProvinceArea } from "../../../redux/actions/interProvinceArea/action";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { ActionButton } from "../../../components/ActionButtons/ActionButton";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ProvinceArea = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedProvinceArea, setSelectedProvinceArea] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleProvinceAreaSelect = (component) => {
    setSelectedProvinceArea((current = []) => {
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

  const selectAllProvinceArea = (all = []) => {
    setSelectedProvinceArea(all);
  };

  const resetSelectedProvinceArea = () => {
    setSelectedProvinceArea([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/aa-structure/province-area-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/aa-structure/province-area-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedProvinceArea[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/aa-structure/province-area-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedProvinceArea[0] || {},
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
        {selectedProvinceArea.map((p, key) => {
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
                {p.agProvinceId} - {p.description}
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
      for (const provinceArea of selectedProvinceArea) {
        await deleteInterProvinceArea(provinceArea?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedProvinceArea();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <ActionWrapper isLeft>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.AG_PROVINCIAL_AREA}`}
        >
          <ActionButton variant="contained" onClick={onCreate}>
          <AddIcon />
          </ActionButton>
        </PermissionWrapper>

        {selectedProvinceArea.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.AG_PROVINCIAL_AREA}`}
          >
            <ActionButton
              variant="contained"
              color="secondary"
              onClick={onEdit}
              sx={{ ml: "8px" }}
            >
              <EditIcon />
            </ActionButton>
          </PermissionWrapper>
        )}
        {selectedProvinceArea.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.AG_PROVINCIAL_AREA}`}
          >
            <ActionButton
              variant="contained"
              color="info"
              onClick={onView}
              sx={{ ml: "8px" }}
            >
              <VisibilityIcon />
            </ActionButton>
          </PermissionWrapper>
        )}
        {selectedProvinceArea.length > 0 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.AG_PROVINCIAL_AREA}`}
          >
            <ActionButton
              variant="contained"
              color="error"
              onClick={onDelete}
              sx={{ ml: "8px" }}
            >
             <DeleteForeverIcon />
            </ActionButton>
          </PermissionWrapper>
        )}
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AG_PROVINCIAL_AREA}`}
      >
        {loading === false && (
          <ProvinceAreaList
            selectedRows={selectedProvinceArea}
            onRowSelect={toggleProvinceAreaSelect}
            selectAll={selectAllProvinceArea}
            unSelectAll={resetSelectedProvinceArea}
          />
        )}
      </PermissionWrapper>
      <DialogBox
        open={open}
        title="Delete Province Area"
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

export default ProvinceArea;
