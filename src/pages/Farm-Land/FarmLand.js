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
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import ListHeader from "../../components/ListHeader/ListHeader";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import DialogBox from "../../components/PageLayout/DialogBox";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import { useSnackBars } from "../../context/SnackBarContext";
import { useUserAccessValidation } from "../../hooks/authentication";
import { deleteFarmLand } from "../../redux/actions/farmLand/action";
import DeleteMsg from "../../utils/constants/DeleteMsg";
import { defaultMessages } from "../../utils/constants/apiMessages";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import FarmLandList from "./FarmLandList";
import { Fonts } from "../../utils/constants/Fonts";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";
import CrudActionButton from "../../components/CrudActionButton/CrudActionButton";

const FarmLand = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [selectedFarmLand, setSelectedFarmLand] = useState([]);
  const [dialogSelectedFarmLand, setDialogSelectedFarmLand] = useState([]);

  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleFarmLandSelect = (component) => {
    setSelectedFarmLand((current = []) => {
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

  const selectAllFarmLand = (all = []) => {
    setSelectedFarmLand(all);
  };

  const resetSelectedFarmLand = () => {
    setSelectedFarmLand([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/farm-land-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/farm-land-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedFarmLand[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/farm-land-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedFarmLand[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedFarmLand(selectedFarmLand);
  };

  const close = () => {
    setOpen(false);
    setDialogSelectedFarmLand([]);
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
      for (const farmLand of dialogSelectedFarmLand) {
        await deleteFarmLand(farmLand?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedFarmLand();
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
      <ListHeader title="Farm Land" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.FARM_LAND}`}
          >
            <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
          </PermissionWrapper>
          {selectedFarmLand.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.FARM_LAND}`}
            >
              <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
            </PermissionWrapper>
          )}
          {selectedFarmLand.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.FARM_LAND}`}
            >
              <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
            </PermissionWrapper>
          )}
          {selectedFarmLand.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.FARM_LAND}`}
            >
              <CrudActionButton action={DEF_ACTIONS.DELETE} handle={onDelete} />
            </PermissionWrapper>
          )}
        </ButtonGroup>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.FARM_LAND}`}
      >
        {loading === false && (
          <FarmLandList
            selectedRows={selectedFarmLand}
            onRowSelect={toggleFarmLandSelect}
            selectAll={selectAllFarmLand}
            unSelectAll={resetSelectedFarmLand}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedFarmLand}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedFarmLand}
        dialogSelectedTypes={dialogSelectedFarmLand}
        propertyId="code"
        propertyDescription="name"
      />
    </div>
  );
};

export default FarmLand;
