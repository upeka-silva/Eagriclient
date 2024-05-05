import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import {
  Button,
  ButtonGroup,
  CircularProgress,
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
import FarmerList from "./FarmerList";

import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import ListHeader from "../../components/ListHeader/ListHeader";
import { Fonts } from "../../utils/constants/Fonts";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";


const Farmer = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedFarmer, setSelectedFarmer] = useState([]);
  const [dialogSelectedFarmer, setDialogSelectedFarmer] = useState([]);

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

  const onCreate = async () => {
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
    setDialogSelectedFarmer(selectedFarmer);
  };

  const close = () => {
    setOpen(false);
    setDialogSelectedFarmer([]);
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
                {p.farmerId} - {p.firstName} {p.lastName}
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
      for (const farmer of dialogSelectedFarmer) {
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
      <ListHeader title="Farmer" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.FARMER}`}
          >
            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>
          {selectedFarmer.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.FARMER}`}
            >
              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectedFarmer.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.FARMER}`}
            >
              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedFarmer.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.FARMER}`}
            >
              <Button onClick={onDelete}>
                <Delete />
                {DEF_ACTIONS.DELETE}
              </Button>
            </PermissionWrapper>
          )}
        </ButtonGroup>
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
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedFarmer}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedFarmer}
        dialogSelectedTypes={dialogSelectedFarmer}
        propertyId = "farmerId"
        propertyDescription = "firstName"
      />

    </div>
  );
};

export default Farmer;
