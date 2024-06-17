import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";
import { Add, Delete, Edit, Vrpano, PanTool } from "@mui/icons-material";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import { useTranslation } from "react-i18next";
import { TranslateActions } from "../../../utils/constants/CrudActionTranslation";
import CropDamageReportList from "./CropDamageReportList";
import {
  cropDamageReportingRejected,
  updateStatusCropDamageReporting,
} from "../../../redux/actions/cropDamageReport.js/action";


const DamageReport = () => {
  const { t } = useTranslation();
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);

  const [selectCropDamage, setSelectCropDamage] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  console.log({ selectCropDamage });

  const [refresh, setRefresh] = useState(true);
  const toggleCategorySelect = (component) => {
    setSelectCropDamage((current = []) => {
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

  const refreshList = () => {
    setRefresh(!refresh);
  };

  const selectAllCategories = (all = []) => {
    setSelectCropDamage(all);
  };

  const resetSelectedCategory = () => {
    setSelectCropDamage([]);
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: t("message.successfullyUpdated"),
    });
  };

  const onSuccessDelete = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully Rejected",
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || t("message.loginFailed"),
    });
  };

  const onEdit = () => {
    const id = selectCropDamage[0]?.id;
    updateStatusCropDamageReporting(id, onSuccess, onError, refreshList).then(
      () => {
        setSelectCropDamage([]);
      }
    );
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/extension/crop-damage-report-view", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectCropDamage[0] || {},
      },
    });
  };

  const onDelete = () => {
    cropDamageReportingRejected(
      selectCropDamage[0]?.id,
      onSuccessDelete,
      onError
    ).then(() => {
      setSelectCropDamage([]);
      refreshList();
    });
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
      <ListHeader title="Crop Damage Report" />
      <ActionWrapper isLeft>
        <Stack direction="row" spacing={1} sx={{ paddingTop: "2px" }}>
          <ButtonGroup
            variant="outlined"
            disableElevation
            size="small"
            aria-label="action button group"
            color="success"
          >
            {selectCropDamage.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.CROP_DAMAGE_REPORTING}`}
              >
                {selectCropDamage[0]?.status === "UNAPPROVED" && (
                  <>
                    <Button onClick={onEdit}>
                      {/* <Edit /> */}
                      {"APPROVED"}
                    </Button>
                  </>
                )}
              </PermissionWrapper>
            )}
            {selectCropDamage.length > 0 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.CROP_DAMAGE_REPORTING}`}
              >
                {selectCropDamage[0]?.status === "UNAPPROVED" && (
                  <Button onClick={onDelete}>{"Rejected"}</Button>
                )}
              </PermissionWrapper>
            )}
          </ButtonGroup>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <ButtonGroup
            variant="outlined"
            disableElevation
            size="small"
            aria-label="action button group"
            color="success"
          >
            {selectCropDamage.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_DAMAGE_REPORTING}`}
              >
                <Button onClick={onView}>
                  <Vrpano />
                  {TranslateActions(t, DEF_ACTIONS.VIEW)}
                </Button>
              </PermissionWrapper>
            )}
          </ButtonGroup>
        </Stack>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.CROP_DAMAGE_REPORTING}`}
      >
        {loading === false && (
          <CropDamageReportList
            selectedRows={selectCropDamage}
            onRowSelect={toggleCategorySelect}
            selectAll={selectAllCategories}
            unSelectAll={resetSelectedCategory}
            refresh={refresh}
          />
        )}
      </PermissionWrapper>
    </div>
  );
};

export default DamageReport;
