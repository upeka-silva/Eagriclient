import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";

import DialogBox from "../../../components/PageLayout/DialogBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useNavigate } from "react-router";
import SoilSubTypeList from "./SoilSubTypeList";
import { deleteSoilSubType } from "../../../redux/actions/soil/soilSubType/action";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import ListHeader from "../../../components/ListHeader/ListHeader";

const SoilSubType = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedSoilSubTypes, setSelectedSoilSubTypes] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleSoilSubTypesSelect = (component) => {
    setSelectedSoilSubTypes((current = []) => {
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

  const selectAllSoilSubTypes = (all = []) => {
    setSelectedSoilSubTypes(all);
  };

  const resetSelectedSoilSubTypes = () => {
    setSelectedSoilSubTypes([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/soil/soil-sub-type-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/soil/soil-sub-type-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedSoilSubTypes[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/soil/soil-sub-type-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedSoilSubTypes[0] || {},
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
        {selectedSoilSubTypes.map((p, key) => {
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
                {p.soilSubTypeCode} - {p.description}
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
      for (const soilSubType of selectedSoilSubTypes) {
        await deleteSoilSubType(soilSubType?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedSoilSubTypes();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <ListHeader title="Soil Sub Type" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.SOIL_SUB_TYPE}`}
          >
            <Button onClick={onCreate}><Add/>{DEF_ACTIONS.ADD}</Button>
          </PermissionWrapper>
          {selectedSoilSubTypes.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.SOIL_SUB_TYPE}`}
            >
              <Button onClick={onEdit}><Edit/>{DEF_ACTIONS.EDIT}</Button>
            </PermissionWrapper>
          )}
          {selectedSoilSubTypes.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.SOIL_SUB_TYPE}`}
            >
              <Button onClick={onView}><Vrpano/>{DEF_ACTIONS.VIEW}</Button>
            </PermissionWrapper>
          )}
          {selectedSoilSubTypes.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.SOIL_SUB_TYPE}`}
            >
              <Button onClick={onDelete}><Delete/>{DEF_ACTIONS.DELETE}</Button>
            </PermissionWrapper>
          )}
        </ButtonGroup>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.SOIL_SUB_TYPE}`}
      >
        {loading === false && (
          <SoilSubTypeList
            selectedRows={selectedSoilSubTypes}
            onRowSelect={toggleSoilSubTypesSelect}
            selectAll={selectAllSoilSubTypes}
            unSelectAll={resetSelectedSoilSubTypes}
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

export default SoilSubType;
