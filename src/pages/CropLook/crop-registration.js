import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useUserAccessValidation } from "../../hooks/authentication";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import DialogBox from "../../components/PageLayout/DialogBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../context/SnackBarContext";
import { deleteCropRegistration } from "../../redux/actions/cropLook/cropRegistration/actions";
import { defaultMessages } from "../../utils/constants/apiMessages";
import {
  Add,
  Delete,
  Edit,
  Vrpano,
  CheckRounded,
  CancelOutlined,
} from "@mui/icons-material";
import ListHeader from "../../components/ListHeader/ListHeader";
import CropRegistrationList from "./crop-registration-list";
import { Fonts } from "../../utils/constants/Fonts";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";
import CrudActionButton from "../../components/CrudActionButton/CrudActionButton";

const CropRegistration = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectSubCategory, setSelectSubCategory] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

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
    setAction(DEF_ACTIONS.ADD);
    navigate("/crop-look/crop-registration-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/crop-look/crop-registration-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectSubCategory[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/crop-look/crop-registration-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
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

  const renderSelectedItems = () => {
    return (
      <List>
        {selectSubCategory.map((p, key) => {
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
                {p.code} - {p.name}
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
      for (const cropSubCat of dialogSelectSubCategory) {
        await deleteCropRegistration(cropSubCat?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedSubCategory();
    } catch (error) {
      console.log(error);
      setLoading(false);
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
      <ListHeader title="Crop Registration Details" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.CROP_REGISTRATION}`}
          >
            <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
          </PermissionWrapper>
          {selectSubCategory.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.CROP_REGISTRATION}`}
            >
              <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
            </PermissionWrapper>
          )}
          {selectSubCategory.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_REGISTRATION}`}
            >
              <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
            </PermissionWrapper>
          )}
          {selectSubCategory.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.CROP_REGISTRATION}`}
            >
              <CrudActionButton action={DEF_ACTIONS.DELETE} handle={onDelete} />
            </PermissionWrapper>
          )}
        </ButtonGroup>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.CROP_REGISTRATION}`}
      >
        {loading === false && (
          <CropRegistrationList
            selectedRows={selectSubCategory}
            onRowSelect={toggleSubCategorySelect}
            selectAll={selectAllSubCategories}
            unSelectAll={resetSelectedSubCategory}
          />
        )}
      </PermissionWrapper>

      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectSubCategory}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectSubCategory}
        dialogSelectedTypes={dialogSelectSubCategory}
        propertyId="ddLabel"
        propertyDescription="season.description"
      />

      {/* <DialogBox
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
                Ok
              </Button>
              <Button color="error" onClick={close} sx={{ ml: "8px" }}>
                <CancelOutlined />
                Cancel
              </Button>
            </ButtonGroup>
          </ActionWrapper>
        }
      ></DialogBox> */}
    </div>
  );
};

export default CropRegistration;
