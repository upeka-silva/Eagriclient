import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";

import { useNavigate } from "react-router";
import SoilTypeList from "./SoilTypeList";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";
import { deleteSoilType } from "../../../redux/actions/soil/soilType/action";
import DialogBox from "../../../components/PageLayout/DialogBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { defaultMessages } from "../../../utils/constants/apiMessages";

const SoilType = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedSoilTypes, setSelectedSoilTypes] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleSoilTypesSelect = (component) => {
    setSelectedSoilTypes((current = []) => {
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

  const selectAllSoilTypes = (all = []) => {
    setSelectedSoilTypes(all);
  };

  const resetSelectedSoilTypes = () => {
    setSelectedSoilTypes([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/soil/soil-type-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/soil/soil-type-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedSoilTypes[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/soil/soil-type-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedSoilTypes[0] || {},
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
        {selectedSoilTypes.map((p, key) => {
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
                {p.soilTypeCode} - {p.description}
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
      for (const soilType of selectedSoilTypes) {
        await deleteSoilType(soilType?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedSoilTypes();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Paper style={{marginTop:5}}>
      <ActionWrapper isLeft>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.SOIL_TYPE}`}
        >
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>
        {selectedSoilTypes.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.SOIL_TYPE}`}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={onEdit}
              sx={{ ml: "8px" }}
            >
              {DEF_ACTIONS.EDIT}
            </Button>
          </PermissionWrapper>
        )}
        {selectedSoilTypes.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.SOIL_TYPE}`}
          >
            <Button
              variant="contained"
              color="info"
              onClick={onView}
              sx={{ ml: "8px" }}
            >
              {DEF_ACTIONS.VIEW}
            </Button>
          </PermissionWrapper>
        )}
        {selectedSoilTypes.length > 0 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.SOIL_TYPE}`}
          >
            <Button
              variant="contained"
              color="error"
              onClick={onDelete}
              sx={{ ml: "8px" }}
            >
              {DEF_ACTIONS.DELETE}
            </Button>
          </PermissionWrapper>
        )}
      </ActionWrapper>
      <PermissionWrapper withoutPermissions>
        {loading === false && (
          <SoilTypeList
            selectedRows={selectedSoilTypes}
            onRowSelect={toggleSoilTypesSelect}
            selectAll={selectAllSoilTypes}
            unSelectAll={resetSelectedSoilTypes}
          />
        )}
      </PermissionWrapper>
      <DialogBox
        open={open}
        title="Delete Soil Type"
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
    </Paper>
  );
};

export default SoilType;
