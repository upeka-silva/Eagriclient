import React, { useState } from "react";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
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
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ASCList from "./ASCList";
import { useNavigate } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { deleteASC } from "../../../redux/actions/asc/action";
import DialogBox from "../../../components/PageLayout/DialogBox";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";

const ASC = () => {
  useUserAccessValidation();
  const { addSnackBar } = useSnackBars();

  const [selectedAsc, setSelectedAsc] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const toggleAscSelect = (component) => {
    setSelectedAsc((current = []) => {
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

  const selectAllAsc = (all = []) => {
    setSelectedAsc(all);
  };

  const resetSelectedAsc = () => {
    setSelectedAsc([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/agrarian/asc-division-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/agrarian/asc-division-form", {
      state: { action: DEF_ACTIONS.EDIT, target: selectedAsc[0] || {} },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/agrarian/asc-division-form", {
      state: { action: DEF_ACTIONS.VIEW, target: selectedAsc[0] || {} },
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
        {selectedAsc.map((p, key) => {
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
                {p.ascCode} - {p.name}
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
      for (const asc of selectedAsc) {
        await deleteASC(asc?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedAsc();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.ASC}`}
          >
            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>

          {selectedAsc.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.ASC}`}
            >
              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectedAsc.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.ASC}`}
            >
              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedAsc.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.ASC}`}
            >
              <Button onClick={onDelete}>
                <Delete />
                {DEF_ACTIONS.DELETE}
              </Button>
            </PermissionWrapper>
          )}
        </ButtonGroup>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.ASC}`}
      >
        {loading === false && (
          <ASCList
            selectedRows={selectedAsc}
            onRowSelect={toggleAscSelect}
            selectAll={selectAllAsc}
            unSelectAll={resetSelectedAsc}
          />
        )}
      </PermissionWrapper>
      <DialogBox
        open={open}
        title="Delete ASC Area"
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

export default ASC;
