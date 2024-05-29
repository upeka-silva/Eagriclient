import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Stack } from "@mui/material";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { Add, Delete, Vrpano } from "@mui/icons-material";
import ListHeader from "../../../components/ListHeader/ListHeader";
import CropCalendarList from "./crop-calendar-list";
import {
  deleteCropCalendar,
  downloadCropCalendarExcel,
} from "../../../redux/actions/crop/cropCalendar/action";
import { Fonts } from "../../../utils/constants/Fonts";
import ExportButton from "../../../components/ExportButton/ExportButton";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import { TranslateActions } from "../../../utils/constants/CrudActionTranslation";
import { useTranslation } from "react-i18next";

const CropCalendar = () => {
  const { t } = useTranslation();
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectSubCategory, setSelectSubCategory] = useState([]);
  const [dialogSelectSubCategory, setDialogSelectSubCategory] = useState([]);

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
    navigate("/crop/calendar-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onView = () => {
    navigate("/crop/calendar-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectSubCategory[0] || {},
      },
    });
  };

  const onEdit = () => {
    navigate("/crop/calendar-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectSubCategory[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectSubCategory(selectSubCategory);
  };

  const close = () => {
    setOpen(false);
    setDialogSelectSubCategory([]);
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: t("message.successfullyDeleted"),
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
      for (const subCat of dialogSelectSubCategory) {
        await deleteCropCalendar(subCat.id, onSuccess, onError);
      }
      // await deleteCropCalendar(selectSubCategory[0].id, onSuccess, onError);
      // await deleteCropCalendar(selectSubCategory[0].id, onSuccess, onError);
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
      await downloadCropCalendarExcel();
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
      <ListHeader title="crop.cropCalendar" />
      <ActionWrapper isLeft>
        <Stack direction="row" spacing={1} sx={{ paddingTop: "2px" }}>
          <ExportButton onDownload={onDownload} />
          <ButtonGroup
            variant="outlined"
            disableElevation
            size="small"
            aria-label="action button group"
            color="success"
          >
            <PermissionWrapper
              permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.CROP_CALENDAR}`}
            >
              <Button onClick={onCreate}>
                <Add />
                {TranslateActions(t, DEF_ACTIONS.ADD)}
              </Button>
            </PermissionWrapper>
            {selectSubCategory.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_CALENDAR}`}
              >
                <Button
                  variant="outlined"
                  color="success"
                  onClick={onEdit}
                  sx={{ ml: "8px" }}
                >
                  <Vrpano />
                  {TranslateActions(t, DEF_ACTIONS.EDIT)}
                </Button>
              </PermissionWrapper>
            )}
            {selectSubCategory.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_CALENDAR}`}
              >
                <Button
                  variant="outlined"
                  color="success"
                  onClick={onView}
                  sx={{ ml: "8px" }}
                >
                  <Vrpano />
                  {TranslateActions(t, DEF_ACTIONS.VIEW)}
                </Button>
              </PermissionWrapper>
            )}
            {selectSubCategory.length > 0 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.CROP_CALENDAR}`}
              >
                <Button
                  variant="outlined"
                  color="success"
                  onClick={onDelete}
                  sx={{ ml: "8px" }}
                >
                  <Delete />
                  {TranslateActions(t, DEF_ACTIONS.DELETE)}
                </Button>
              </PermissionWrapper>
            )}
          </ButtonGroup>
        </Stack>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.CROP_CALENDAR}`}
      >
        {loading === false && (
          <CropCalendarList
            selectedRows={selectSubCategory}
            onRowSelect={toggleSubCategorySelect}
            selectAll={selectAllSubCategories}
            unSelectAll={resetSelectedSubCategory}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="doYouWantToDelete?"
        items={selectSubCategory}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectSubCategory}
        dialogSelectedTypes={dialogSelectSubCategory}
        propertyId="soilTypeCode"
        propertyDescription="description"
      />
    </div>
  );
};

export default CropCalendar;
