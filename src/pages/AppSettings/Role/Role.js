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
import React, { useState } from "react";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useNavigate } from "react-router";
import RoleList from "./RoleList";
import DialogBox from "../../../components/PageLayout/DialogBox";
import { deleteRole } from "../../../redux/actions/app_settings/roles/action";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { Fonts } from "../../../utils/constants/Fonts";

const Role = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [selectedRole, setSelectedRole] = useState([]);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [open, setOpen] = useState(false);

  const [dataEndPoint, setDataEndPoint] = useState("app-settings/roles");

  const toggleRoleSelect = (component) => {
    setSelectedRole((current = []) => {
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

  const selectAllRoles = (all = []) => {
    setSelectedRole(all);
  };

  const unSelectAllRoles = () => {
    setSelectedRole([]);
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

  const close = () => {
    setOpen(false);
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const ai of selectedRole) {
        await deleteRole(ai?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      unSelectAllRoles();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedRole.map((role) => {
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
                {role.code} - {role.name}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    );
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate(`/app-settings/role-form`, {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate(`/app-settings/role-form`, {
      state: { action: DEF_ACTIONS.EDIT, target: selectedRole[0] },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate(`/app-settings/role-form`, {
      state: { action: DEF_ACTIONS.VIEW, target: selectedRole[0] },
    });
  };

  const onDelete = () => {
    setOpen(true);
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
      <ListHeader title="Roles" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="contained"
          aria-label="contained primary button group"
          disableElevation
          size="small"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.ROLE}`}
          >
            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>

          {selectedRole.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.ROLE}`}
            >
              <Button onClick={onEdit} sx={{ ml: "8px" }}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectedRole.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.ROLE}`}
            >
              <Button onClick={onView} sx={{ ml: "8px" }}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedRole.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.ROLE}`}
            >
              <Button onClick={onDelete} sx={{ ml: "8px" }}>
                <Delete />
                {DEF_ACTIONS.DELETE}
              </Button>
            </PermissionWrapper>
          )}
        </ButtonGroup>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.ROLE}`}
      >
        {loading === false && (
          <RoleList
            selectedRows={selectedRole}
            onRowSelect={toggleRoleSelect}
            selectAll={selectAllRoles}
            unSelectAll={unSelectAllRoles}
            dataEndPoint={dataEndPoint}
          />
        )}
      </PermissionWrapper>
      <DialogBox
        open={open}
        title="Delete Roles"
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

export default Role;
