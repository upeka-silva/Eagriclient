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
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import ListHeader from "../../../components/ListHeader/ListHeader";
import {
  deleteCropDisease,
  downloadCropDiseaseExcel,
} from "../../../redux/actions/crop/CropDisease/action";
import CropDiseaseList from "./CropDiseaseList";
import ExportButton from "../../../components/ExportButton/ExportButton";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import { Fonts } from "../../../utils/constants/Fonts";
import { useTranslation } from "react-i18next";
import { TranslateActions } from "../../../utils/constants/CrudActionTranslation";
import CrudActionButton from "../../../components/CrudActionButton/CrudActionButton";

const CropDisease = () => {
  const { t } = useTranslation();
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [dialogSelectedCropDisease, setDialogSelectedCropDisease] = useState(
    []
  );
  const [selectCropDisease, setSelectCropDisease] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const url = `crop/crop-diseases`;

  const toggleCropDiseaseSelect = (component) => {
    setSelectCropDisease((current = []) => {
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

  const selectAllCropDisease = (all = []) => {
    setSelectCropDisease(all);
  };

  const resetSelectedCropDisease = () => {
    setSelectCropDisease([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/crop/crop-disease-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/crop/crop-disease-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectCropDisease[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/crop/crop-disease-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectCropDisease[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedCropDisease(selectCropDisease);
  };

  const close = () => {
    setOpen(false);
    setDialogSelectedCropDisease([]);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectCropDisease.map((p, key) => {
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
                {p.diseaseName} - {p.type}
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
      for (const cropDisease of dialogSelectedCropDisease) {
        await deleteCropDisease(cropDisease?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedCropDisease();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const onDownload = async () => {
    try {
      await downloadCropDiseaseExcel();
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
      <ListHeader title="nav.crop.cropDisease" />
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
              permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.CROP_DISEASE}`}
            >
              <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
            </PermissionWrapper>
            {selectCropDisease.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.CROP_DISEASE}`}
              >
                <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
              </PermissionWrapper>
            )}
            {selectCropDisease.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_DISEASE}`}
              >
                <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
              </PermissionWrapper>
            )}
            {selectCropDisease.length > 0 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.CROP_DISEASE}`}
              >
                <CrudActionButton
                  action={DEF_ACTIONS.DELETE}
                  handle={onDelete}
                />
              </PermissionWrapper>
            )}
          </ButtonGroup>
        </Stack>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.CROP_DISEASE}`}
      >
        {loading === false && (
          <CropDiseaseList
            url={url}
            selectedRows={selectCropDisease}
            onRowSelect={toggleCropDiseaseSelect}
            selectAll={selectAllCropDisease}
            unSelectAll={resetSelectedCropDisease}
          />
        )}
      </PermissionWrapper>

      <ConfirmationDialog
        open={open}
        title="doYouWantToDelete"
        items={selectCropDisease}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedCropDisease}
        dialogSelectedTypes={dialogSelectedCropDisease}
        propertyId="diseaseName"
        propertyDescription="type"
      />
    </div>
  );
};

export default CropDisease;
