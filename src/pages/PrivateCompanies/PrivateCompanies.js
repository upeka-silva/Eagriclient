import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import { useUserAccessValidation } from "../../hooks/authentication";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { deleteFarmLand } from "../../redux/actions/farmLand/action";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import { ActionButton } from "../../components/ActionButtons/ActionButton";
import { defaultMessages } from "../../utils/constants/apiMessages";
import PrivateCompaniesList from "./PrivateCompaniesList";
import DialogBox from "../../components/PageLayout/DialogBox";
import DeleteMsg from "../../utils/constants/DeleteMsg";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const PrivateCompanies = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [selectPrivateCompany, setSelectPrivateCompany] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const togglePrivateCompanySelect = (component) => {
    setSelectPrivateCompany((current = []) => {
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

  const selectAllPrivateCompanies = (all = []) => {
    setSelectPrivateCompany(all);
  };

  const resetSelectedPrivateCompanies = () => {
    setSelectPrivateCompany([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/private-company-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/private-company-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectPrivateCompany[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/private-company-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectPrivateCompany[0] || {},
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
        {selectPrivateCompany.map((p, key) => {
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
      for (const farmLand of selectPrivateCompany) {
        await deleteFarmLand(farmLand?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedPrivateCompanies();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <ActionWrapper isLeft>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.FARM_LAND}`}
        >
          <ActionButton variant="contained" onClick={onCreate}>
            <AddIcon />
          </ActionButton>
        </PermissionWrapper>
        {selectPrivateCompany.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.FARM_LAND}`}
          >
            <ActionButton
              variant="contained"
              color="secondary"
              onClick={onEdit}
              sx={{ ml: "8px" }}
            >
              <EditIcon />
            </ActionButton>
          </PermissionWrapper>
        )}
        {selectPrivateCompany.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.FARM_LAND}`}
          >
            <ActionButton
              variant="contained"
              color="info"
              onClick={onView}
              sx={{ ml: "8px" }}
            >
              <VisibilityIcon />
            </ActionButton>
          </PermissionWrapper>
        )}
        {selectPrivateCompany.length > 0 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.FARM_LAND}`}
          >
            <ActionButton
              variant="contained"
              color="error"
              onClick={onDelete}
              sx={{ ml: "8px" }}
            >
              <DeleteForeverIcon />
            </ActionButton>
          </PermissionWrapper>
        )}
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.FARM_LAND}`}
      >
        {loading === false && (
          <PrivateCompaniesList
            selectedRows={selectPrivateCompany}
            onRowSelect={togglePrivateCompanySelect}
            selectAll={selectAllPrivateCompanies}
            unSelectAll={resetSelectedPrivateCompanies}
          />
        )}
      </PermissionWrapper>
      <DialogBox
        open={open}
        title="Delete Private Company"
        actions={
          <ActionWrapper>
            <Button
              variant="contained"
              color="info"
              onClick={onConfirm}
              sx={{ ml: "8px" }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={close}
              sx={{ ml: "8px" }}
            >
              Close
            </Button>
          </ActionWrapper>
        }
      >
        <>
          <DeleteMsg />
          <Divider sx={{ mt: "16px" }} />
          {renderSelectedItems()}
        </>
      </DialogBox>
    </div>
  );
};

export default PrivateCompanies;
