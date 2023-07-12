import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import {
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { defaultMessages } from "../../utils/constants/apiMessages";
import { deleteFarmer } from "../../redux/actions/farmer/action";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import { ActionButton } from "../../components/ActionButtons/ActionButton";
import FarmerList from "./FarmerList";
import DialogBox from "../../components/PageLayout/DialogBox";
import DeleteMsg from "../../utils/constants/DeleteMsg";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Farmer = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedFarmer, setSelectedFarmer] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleFarmerSelect = (component) => {
    setSelectedFarmer((current = []) => {
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

  const selectAllFarmers = (all = []) => {
    setSelectedFarmer(all);
  };

  const resetSelectedFarmers = () => {
    setSelectedFarmer([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/farmer-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/farmer-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedFarmer[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/farmer-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedFarmer[0] || {},
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
        {selectedFarmer.map((p, key) => {
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
      for (const farmer of selectedFarmer) {
        await deleteFarmer(farmer?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedFarmers();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <ActionWrapper isLeft>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.FARMER}`}
        >
          <ActionButton variant="contained" onClick={onCreate}>
            <AddIcon />
          </ActionButton>
        </PermissionWrapper>
        {selectedFarmer.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.FARMER}`}
          >
            <ActionButton
              variant="contained"
              color="secondary"
              onClick={onEdit}
            >
              <EditIcon />
            </ActionButton>
          </PermissionWrapper>
        )}
        {selectedFarmer.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.FARMER}`}
          >
            <ActionButton
              variant="contained"
              color="info"
              onClick={onView}
            >
              <VisibilityIcon />
            </ActionButton>
          </PermissionWrapper>
        )}
        {selectedFarmer.length > 0 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.FARMER}`}
          >
            <ActionButton
              variant="contained"
              color="error"
              onClick={onDelete}
            >
             <DeleteForeverIcon />
            </ActionButton>
          </PermissionWrapper>
        )}
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.FARMER}`}
      >
        {loading === false && (
          <FarmerList
            selectedRows={selectedFarmer}
            onRowSelect={toggleFarmerSelect}
            selectAll={selectAllFarmers}
            unSelectAll={resetSelectedFarmers}
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

export default Farmer;
