import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import { Add, Delete, Download, Edit, Vrpano } from "@mui/icons-material";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { useUserAccessValidation } from "../../../hooks/authentication";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import CropActivityList from "./CropActivityList";
import {
  deleteCropActivity,
  downloadCropActivityExcel,
} from "../../../redux/actions/crop/cropActivity/action";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { Fonts } from "../../../utils/constants/Fonts";

const CropActivity = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [dialogSelectedActivityTypes, setDialogSelectedActivityTypes] =
    useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleCategorySelect = (component) => {
    setSelectedActivities((current = []) => {
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

  const selectAllCategories = (all = []) => {
    setSelectedActivities(all);
  };

  const resetSelectedCategory = () => {
    setSelectedActivities([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/crop/activity-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/crop/activity-form", {
      state: { action: DEF_ACTIONS.EDIT, target: selectedActivities[0] || {} },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/crop/activity-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedActivities[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedActivityTypes(selectedActivities);
  };

  const close = () => {
    setOpen(false);
    setDialogSelectedActivityTypes([]);
  };

  const onConfirmDelete = async () => {
    try {
      setLoading(true);
      for (const activity of dialogSelectedActivityTypes) {
        await deleteCropActivity(activity?.id);
      }
      setLoading(false);
      close();
      setSelectedActivities([]);
      addSnackBar({
        type: SnackBarTypes.success,
        message: "Successfully deleted",
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      addSnackBar({
        type: SnackBarTypes.error,
        message: error.message || defaultMessages.apiErrorUnknown,
      });
    }
  };

  const onDownload = async () => {
    try {
      await downloadCropActivityExcel();
    } catch (error) {
      console.error(error);
      addSnackBar({
        type: SnackBarTypes.error,
        message: "Failed to download crop activity excel",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: Fonts.fontStyle1,
        marginTop: "10px",
        height: "90vh",
        overflowY: "scroll",
      }}
    >
      <ListHeader title="crop activity" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.CROP_ACTIVITY}`}
          >
            <Button onClick={onCreate} title="Add">
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>
          {selectedActivities.length === 1 && (
            <>
              <PermissionWrapper
                permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.CROP_ACTIVITY}`}
              >
                <Button onClick={onEdit} title="Edit">
                  <Edit />
                  {DEF_ACTIONS.EDIT}
                </Button>
              </PermissionWrapper>
            </>
          )}
          {selectedActivities.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_ACTIVITY}`}
            >
              <Button onClick={onView} title="view">
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedActivities.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.CROP_ACTIVITY}`}
            >
              <Button onClick={onDelete} title="Delete">
                <Delete />
                {DEF_ACTIONS.DELETE}
              </Button>
            </PermissionWrapper>
          )}
        </ButtonGroup>
        <PermissionWrapper>
          <Button
            onClick={onDownload}
            title="Export"
            style={{ position: "absolute", right: "30px" }}
            color="success"
          >
            <Download />
            Export{DEF_ACTIONS.EXPORT}
          </Button>
        </PermissionWrapper>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.CROP_ACTIVITY}`}
      >
        {!loading && (
          <CropActivityList
            selectedRows={selectedActivities}
            onRowSelect={toggleCategorySelect}
            selectAll={selectAllCategories}
            unSelectAll={resetSelectedCategory}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedActivities}
        loading={loading}
        onClose={close}
        onConfirm={onConfirmDelete}
        setDialogSelectedTypes={setDialogSelectedActivityTypes}
        dialogSelectedTypes={dialogSelectedActivityTypes}
        propertyId="name"
        propertyDescription="description"
      />
    </div>
  );
};

export default CropActivity;
