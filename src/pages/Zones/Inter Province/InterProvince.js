import React, { useState, useCallback } from "react";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { Button, Typography } from "@mui/material";
import PlusIcon from "@mui/icons-material/Add";
import theme from "../../../utils/theme/theme.json";
import InterProvinceList from "./InterProvinceList";
import InterProvinceForm from "./InterProvinceForm";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CustomDialog from "../../../components/PageLayout/Dialog";
import DialogBox from "../../../components/PageLayout/DialogBox";
import { Link } from "react-router-dom";

const InterProvince = () => {
  const [selectedInterProvince, setSelectedInterProvince] = useState(null);
  const [selectedInterProvinces, setSelectedInterProvinces] = useState([]);
  const [action, setAction] = useState("new");
  const [dialogState, setDialogState] = useState(false);

  const openDialog = () => {
    setDialogState(true);
  };

  const closeDialog = () => {
    setDialogState(false);
  };

  const onCreate = useCallback(() => {
    setAction("new");
    openDialog();
  }, []);

  const onView = useCallback((province) => {
    setSelectedInterProvince(province);
    setAction("view");
    openDialog();
  }, []);

  const onEdit = useCallback((province) => {
    setSelectedInterProvince(province);
    setAction("edit");
    openDialog();
  }, []);

  const onDelete = useCallback((province) => {
    setSelectedInterProvince(province);
    setAction("delete");
    openDialog();
  }, []);

  const updateInterProvince = (value, key) => {
    setSelectedInterProvince((current) => ({ ...current, [key]: value }));
  };

  const selectAllInterProvinces = (provinces) => {
    setSelectedInterProvinces(provinces);
  };

  const removeAllSelectedInterProvinces = () => {
    setSelectedInterProvinces([]);
  };

  const toggleSelectedInterProvinces = (province) => {
    setSelectedInterProvinces((current = []) => {
      let exists = current.findIndex((c) => c?.id === province.id) > -1;
      if (exists) {
        return current.filter((c) => c.id !== province.id);
      }
      return [...current, province];
    });
  };

  const generatePopUpBody = () => {
    switch (action) {
      case "new":
      case "edit":
        return (
          <InterProvinceForm
            selectedInterProvince={selectedInterProvince}
            updateInterProvince={updateInterProvince}
          />
        );
      case "view":
        return (
          <div>
            <Typography>
              <br />
              <b>Province Cocde: </b>
              {selectedInterProvince?.provinceCode}
            </Typography>
            <Typography>
              <b>Province Name: </b>
              {selectedInterProvince?.name}
            </Typography>
          </div>
        );
      case "delete":
        return (
          <Typography>
            <br />
            Do you want to delete this record?
          </Typography>
        );
      default:
        return null;
    }
  };

  const generatePopUpTitle = () => {
    switch (action) {
      case "new":
        return "New Inter Province";
      case "view":
        return selectedInterProvince?.name;
      case "edit":
        return `Editing ${selectedInterProvince?.name}`;
      case "delete":
        return `Deleting ${selectedInterProvince?.name}`;
      default:
        return null;
    }
  };

  const onConfirm = () => {
    closeDialog();
  };

  return (
    <div>
      <ActionWrapper>
        <PermissionWrapper
          component={
            <Button
              variant="container"
              startIcon={<PlusIcon />}
              sx={{ background: theme.coreColors.secondary }}
              component={Link}
              to="/agri-zone/inter-province-form"
            >
              ADD
            </Button>
          }
        />
        {selectedInterProvinces.length === 1 ? (
          <PermissionWrapper
            component={<Button variant="container" color="info" />}
          />
        ) : null}
        {selectedInterProvinces.length === 1 ? (
          <PermissionWrapper
            component={
              <Button
                variant="contained"
                color="info"
                startIcon={<ModeEditIcon />}
                sx={{ ml: "5px" }}
                onClick={onCreate}
              >
                Update
              </Button>
            }
          />
        ) : null}
      </ActionWrapper>
      <PermissionWrapper
        component={
          <InterProvinceList
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            selectedInterProvinces={selectedInterProvinces}
            setSelectedInterProvinces={toggleSelectedInterProvinces}
            selectAllInterProvinces={selectAllInterProvinces}
            removeSelectedInterProvinces={removeAllSelectedInterProvinces}
          />
        }
      />
      <DialogBox
        open={dialogState}
        title={generatePopUpTitle()}
        actions={
          <>
            <Button variant="contained" onClick={onConfirm}>
              {action !== "new" ? action.toUpperCase() : "CREATE"}
            </Button>
            <Button variant="text" color="error" onClick={closeDialog}>
              CANCEL
            </Button>
          </>
        }
        children={generatePopUpBody()}
      />
    </div>
  );
};

export default InterProvince;
