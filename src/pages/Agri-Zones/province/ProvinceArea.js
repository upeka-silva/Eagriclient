import React, { useState, useCallback } from "react";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { Button, Typography } from "@mui/material";
import PlusIcon from "@mui/icons-material/Add";
import theme from "../../../utils/theme/theme.json";
import ProvinceAreaList from "./ProvinceAreaList";
import ProvinceAreaForm from "./ProvinceAreaForm";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";

const ProvinceArea = () => {
  const navigation = useNavigate();

  const [selectedProvinceArea, setSelectedProvinceArea] = useState(null);
  const [selectedProvinceAreas, setSelectedProvinceAreas] = useState([]);
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
    navigation("/agri-zone/province-area-form")
  }, []);

  const onView = useCallback((province) => {
    setSelectedProvinceArea(province);
    setAction("view");
    openDialog();
  }, []);

  const onEdit = useCallback((province) => {
    setSelectedProvinceArea(province);
    setAction("edit");
    openDialog();
  }, []);

  const onDelete = useCallback((province) => {
    setSelectedProvinceArea(province);
    setAction("delete");
    openDialog();
  }, []);

  const updateProvinceArea = (value, key) => {
    setSelectedProvinceArea((current) => ({ ...current, [key]: value }));
  };

  const selectAllProvinceAreas = (provinces) => {
    setSelectedProvinceAreas(provinces);
  };

  const removeAllSelectedProvinceAreas = () => {
    setSelectedProvinceAreas([]);
  };

  const toggleSelectedProvinceAreas = (province) => {
    setSelectedProvinceAreas((current = []) => {
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
          <ProvinceAreaForm
            selectedProvinceArea={selectedProvinceArea}
            updateProvinceArea={updateProvinceArea}
          />
        );
      case "view":
        return (
          <div>
            <Typography>
              <br />
              <b>Province Cocde: </b>
              {selectedProvinceArea?.provinceCode}
            </Typography>
            <Typography>
              <b>Province Name: </b>
              {selectedProvinceArea?.name}
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
        return selectedProvinceArea?.name;
      case "edit":
        return `Editing ${selectedProvinceArea?.name}`;
      case "delete":
        return `Deleting ${selectedProvinceArea?.name}`;
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
              onClick={onCreate}
            >
              ADD
            </Button>
          }
        />
        {selectedProvinceAreas.length === 1 ? (
          <PermissionWrapper
            component={<Button variant="container" color="info" />}
          />
        ) : null}
        {selectedProvinceAreas.length === 1 ? (
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
          <ProvinceAreaList
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            selectedProvinceAreas={selectedProvinceAreas}
            setSelectedProvinceAreas={toggleSelectedProvinceAreas}
            selectAllProvinceAreas={selectAllProvinceAreas}
            removeSelectedProvinceAreas={removeAllSelectedProvinceAreas}
          />
        }
      />
    </div>
  );
};

export default ProvinceArea;
