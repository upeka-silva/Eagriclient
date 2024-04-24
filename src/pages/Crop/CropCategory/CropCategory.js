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
import CropCategoryList from "./CropCategoryList";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import DialogBox from "../../../components/PageLayout/DialogBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";
import { deleteCropCategory, downloadCropCategoryExcel } from "../../../redux/actions/crop/cropCategory/action";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import {
  Add,
  CancelOutlined,
  CheckRounded,
  Delete,
  Download,
  Edit,
  Margin,
  Vrpano,
} from "@mui/icons-material";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import { style } from "d3";
import ExportButton from "../../../components/ExportButton/ExportButton";
const CropCategory = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectCategory, setSelectCategory] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleCategorySelect = (component) => {
    setSelectCategory((current = []) => {
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
    setSelectCategory(all);
  };

  const resetSelectedCategory = () => {
    setSelectCategory([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/crop/category-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/crop/category-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectCategory[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/crop/category-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectCategory[0] || {},
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
        {selectCategory.map((p, key) => {
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
                {p.categoryId} - {p.description}
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
      for (const cropCat of selectCategory) {
        await deleteCropCategory(cropCat?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedCategory();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onDownload = async () => {
    try {
      await downloadCropCategoryExcel();
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
      <ListHeader title="Crop Category" />
      <ExportButton/>
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.CROP_CATEGORY}`}
          >
            <Button onClick={onCreate} title="add">
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>
          {selectCategory.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.CROP_CATEGORY}`}
            >
              <Button onClick={onEdit} title="edit">
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectCategory.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_CATEGORY}`}
            >
              <Button onClick={onView} title="view">
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectCategory.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.CROP_CATEGORY}`}
            >
              <Button onClick={onDelete} title="delete">
                <Delete />
                {DEF_ACTIONS.DELETE}
              </Button>
            </PermissionWrapper>
          )}
        </ButtonGroup>
         
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.CROP_CATEGORY}`}
      >
        {loading === false && (
          <CropCategoryList
            selectedRows={selectCategory}
            onRowSelect={toggleCategorySelect}
            selectAll={selectAllCategories}
            unSelectAll={resetSelectedCategory}
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
        <>
          <Divider sx={{ mt: "8px" }} />
          {renderSelectedItems()}
        </>
      </DialogBox>
    </div>
  );
};

export default CropCategory;
