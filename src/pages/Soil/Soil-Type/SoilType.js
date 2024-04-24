import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
} from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";

import { useLocation, useNavigate } from "react-router";
import SoilTypeList from "./SoilTypeList";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";
import { deleteSoilType, downloadSoilTypeExcel } from "../../../redux/actions/soil/soilType/action";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { Add, Delete, Download, Edit, Vrpano } from "@mui/icons-material";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";

const SoilType = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedSoilTypes, setSelectedSoilTypes] = useState([]);
  const [dialogSelectedSoilTypes, setDialogSelectedSoilTypes] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleSoilTypeSelect = (soilType) => {
    const selectedIndex = selectedSoilTypes.findIndex(
      (selected) => selected.id === soilType.id
    );
    let newSelected = [...selectedSoilTypes];

    if (selectedIndex === -1) {
      newSelected.push(soilType);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedSoilTypes(newSelected);
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

    // Set dialog selected soil types to currently selected ones
    setDialogSelectedSoilTypes(selectedSoilTypes);
  };

  const close = () => {
    setOpen(false);
    // Clear dialog selected soil types when closing the dialog
    setDialogSelectedSoilTypes([]);
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: 
      state?.action === DEF_ACTIONS.DELETE ?
        "Successfully Deleted" :
        "Successfully Downloading",
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
      for (const soilType of dialogSelectedSoilTypes) {
        await deleteSoilType(soilType?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      setSelectedSoilTypes([]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const onDownload = async () => {
    try {
      await downloadSoilTypeExcel(onSuccess, onError);
    } catch (error) {
      console.error(error);
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
      <ListHeader title="Soil Type" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.SOIL_TYPE}`}
          >
            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>
          {selectedSoilTypes.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.SOIL_TYPE}`}
            >
              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectedSoilTypes.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.SOIL_TYPE}`}
            >
              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedSoilTypes.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.SOIL_TYPE}`}
            >
              <Button onClick={onDelete}>
                <Delete />
                {DEF_ACTIONS.DELETE}
              </Button>
            </PermissionWrapper>
          )}
        </ButtonGroup>
          <PermissionWrapper
            // permission={`${DEF_ACTIONS.EXPORT}_${DEF_COMPONENTS.CROP_CATEGORY}`}
          >
            <Button onClick={onDownload} title="export" 
              style={
                {
                  position: "absolute",
                  right: "30px",
                }
              }
              color="success">
              <Download />
              Export
              {DEF_ACTIONS.EXPORT}
            </Button>
          </PermissionWrapper>
      </ActionWrapper>
      <PermissionWrapper withoutPermissions>
        {loading === false && (
          <SoilTypeList
            selectedRows={selectedSoilTypes}
            onRowSelect={toggleSoilTypeSelect}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedSoilTypes}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedSoilTypes}
        dialogSelectedTypes={dialogSelectedSoilTypes}
        propertyId = "soilTypeCode"
        propertyDescription = "description"
      />
    </div>
  );
};

export default SoilType;
