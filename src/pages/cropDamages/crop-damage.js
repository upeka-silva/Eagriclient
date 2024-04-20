import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material";
import { useUserAccessValidation } from "../../hooks/authentication";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import DialogBox from "../../components/PageLayout/DialogBox";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../context/SnackBarContext";
import DeleteMsg from "../../utils/constants/DeleteMsg";
import { defaultMessages } from "../../utils/constants/apiMessages";
import {
  Add,
  Delete,
  Vrpano,
  CheckRounded,
  CancelOutlined,
  Download,
} from "@mui/icons-material";
import ListHeader from "../../components/ListHeader/ListHeader";
import CropDamageList from "./crop-damage-list";
import { deleteDamageCategory, downloadCropDamageExcel } from "../../redux/actions/crop/cropDamage/action";
import { Fonts } from "../../utils/constants/Fonts";

const CropDamage = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectSubCategory, setSelectSubCategory] = useState([]);

  const toggleSubCategorySelect = (component) => {
    setSelectSubCategory((current = []) => {
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

  const selectAllSubCategories = (all = []) => {
    setSelectSubCategory(all);
  };

  const resetSelectedSubCategory = () => {
    setSelectSubCategory([]);
  };

  const onCreate = () => {
    navigate("/crop/damage-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onView = () => {
    navigate("/crop/damage-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectSubCategory[0] || {},
      },
    });
  };

  const onEdit = () => {
    navigate("/crop/damage-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectSubCategory[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
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
      for (const subCat of selectSubCategory) {
        await deleteDamageCategory(subCat?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedSubCategory();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const onDownload = async () => {
    try {
      await downloadCropDamageExcel();
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
      <ListHeader title="Crop Damages" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.CROP_SUB_CATEGORY}`}
          >
            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>
          {selectSubCategory.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_SUB_CATEGORY}`}
            >
              <Button
                variant="outlined"
                color="success"
                onClick={onEdit}
                sx={{ ml: "8px" }}
              >
                <Vrpano />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectSubCategory.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_SUB_CATEGORY}`}
            >
              <Button
                variant="outlined"
                color="success"
                onClick={onView}
                sx={{ ml: "8px" }}
              >
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectSubCategory.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.CROP_SUB_CATEGORY}`}
            >
              <Button
                variant="outlined"
                color="success"
                onClick={onDelete}
                sx={{ ml: "8px" }}
              >
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
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.CROP_SUB_CATEGORY}`}
      >
        {loading === false && (
          <CropDamageList
            selectedRows={selectSubCategory}
            onRowSelect={toggleSubCategorySelect}
            selectAll={selectAllSubCategories}
            unSelectAll={resetSelectedSubCategory}
          />
        )}
      </PermissionWrapper>

      <DialogBox
        open={open}
        title="Do You Want to Delete?"
        actions={
          <ActionWrapper>
            <ButtonGroup
              variant="outlined"
              disableElevation
              size="small"
              aria-label="action button group"
            >
              <Button color="info" onClick={onConfirm} sx={{ ml: "8px" }}>
                <CheckRounded />
                Confirm
              </Button>
              <Button color="error" onClick={close} sx={{ ml: "8px" }}>
                <CancelOutlined />
                Cancel
              </Button>
            </ButtonGroup>
          </ActionWrapper>
        }
      >
      </DialogBox>
    </div>
  );
};

export default CropDamage;
