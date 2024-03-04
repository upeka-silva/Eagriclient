import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";

import { useNavigate } from "react-router";
import DialogBox from "../../../components/PageLayout/DialogBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { deleteInstitution } from "../../../redux/actions/institution/institution/action";
import InstitutionList from "./InstitutionList";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import ListHeader from '../../../components/ListHeader/ListHeader';
import { Fonts } from "../../../utils/constants/Fonts";

const Institution = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectInstitution, setSelectInstitution] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleInstitutionSelect = (component) => {
    setSelectInstitution((current = []) => {
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

  const selectAllInstitutions = (all = []) => {
    setSelectInstitution(all);
  };

  const resetSelectedInstitutions = () => {
    setSelectInstitution([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/institution/institution-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/institution/institution-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectInstitution[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/institution/institution-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectInstitution[0] || {},
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
        {selectInstitution.map((p, key) => {
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
                {p.code} - {p.institutionName}
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
      message: message || "Something went wrong.",
    });
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const institution of selectInstitution) {
        await deleteInstitution(institution?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedInstitutions();
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
      <ListHeader title="Institution" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.INSTITUTION}`}
          >
            <Button onClick={onCreate}><Add/>{DEF_ACTIONS.ADD}</Button>
          </PermissionWrapper>
          {selectInstitution.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.INSTITUTION}`}
            >
              <Button onClick={onEdit}><Edit/>{DEF_ACTIONS.EDIT}</Button>
            </PermissionWrapper>
          )}
          {selectInstitution.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.INSTITUTION}`}
            >
              <Button onClick={onView}><Vrpano/>{DEF_ACTIONS.VIEW}</Button>
            </PermissionWrapper>
          )}
          {selectInstitution.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.INSTITUTION}`}
            >
              <Button onClick={onDelete}><Delete/>{DEF_ACTIONS.DELETE}</Button>
            </PermissionWrapper>
          )}
        </ButtonGroup>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.INSTITUTION}`}
      >
        {loading === false && (
          <InstitutionList
            selectedRows={selectInstitution}
            onRowSelect={toggleInstitutionSelect}
            selectAll={selectAllInstitutions}
            unSelectAll={resetSelectedInstitutions}
          />
        )}
      </PermissionWrapper>
      <DialogBox
        open={open}
        title="Delete Institution"
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

export default Institution;
