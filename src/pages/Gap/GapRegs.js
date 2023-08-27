import React, { useState } from "react";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
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
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { deleteUsers } from "../../redux/actions/users/action";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import GapRegList from "./GapRegList";
import DialogBox from "../../components/PageLayout/DialogBox";
import DeleteMsg from "../../utils/constants/DeleteMsg";
import { Fonts } from "../../utils/constants/Fonts";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";

const GapRegs = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectUsers, setSelectUsers] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleUsersSelect = (component) => {
    setSelectUsers((current = []) => {
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

  const selectAllUsers = (all = []) => {
    setSelectUsers(all);
  };

  const resetSelectedUsers = () => {
    setSelectUsers([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/gap-reg-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/users-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: {
          ...(selectUsers[0] || {}),
          startDate: selectUsers[0]?.startDate
            ? new Date(selectUsers[0]?.startDate)
            : null,
          endDate: selectUsers[0]?.endDate
            ? new Date(selectUsers[0]?.endDate)
            : null,
        },
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/users-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: {
          ...(selectUsers[0] || {}),
          startDate: selectUsers[0]?.startDate
            ? new Date(selectUsers[0]?.startDate)
            : null,
          endDate: selectUsers[0]?.endDate
            ? new Date(selectUsers[0]?.endDate)
            : null,
        },
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
        {selectUsers.map((p, key) => {
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
                {p.code} - {p.description}
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
      for (const users of selectUsers) {
        await deleteUsers(users?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedUsers();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h6" fontWeight={500} mt={1} fontFamily={Fonts.fontStyle1}>
        Gap Registration
      </Typography>
      {/* <ActionWrapper isLeft>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.AGRICULTURE_SEASON}`}
        >
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>
        {selectUsers.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.AGRICULTURE_SEASON}`}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={onEdit}
              sx={{ ml: "8px" }}
            >
              {DEF_ACTIONS.EDIT}
            </Button>
          </PermissionWrapper>
        )}
        {selectUsers.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.AGRICULTURE_SEASON}`}
          >
            <Button
              variant="contained"
              color="info"
              onClick={onView}
              sx={{ ml: "8px" }}
            >
              {DEF_ACTIONS.VIEW}
            </Button>
          </PermissionWrapper>
        )}
        {selectUsers.length > 0 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.AGRICULTURE_SEASON}`}
          >
            <Button
              variant="contained"
              color="error"
              onClick={onDelete}
              sx={{ ml: "8px" }}
            >
              {DEF_ACTIONS.DELETE}
            </Button>
          </PermissionWrapper>
        )}
      </ActionWrapper> */}
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
            <Button onClick={onCreate}  title="add">
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>
          {selectUsers.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.CROP_CATEGORY}`}
            >
              <Button onClick={onEdit} title="edit">
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectUsers.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_CATEGORY}`}
            >
              <Button onClick={onView} title="view">
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectUsers.length > 0 && (
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AGRICULTURE_SEASON}`}
      >
        {loading === false && (
          <GapRegList
            selectedRows={selectUsers}
            onRowSelect={toggleUsersSelect}
            selectAll={selectAllUsers}
            unSelectAll={resetSelectedUsers}
          />
        )}
      </PermissionWrapper>
      <DialogBox
        open={open}
        title="Delete Agriculture Season"
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

export default GapRegs;
