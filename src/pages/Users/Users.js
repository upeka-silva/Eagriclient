import React, { useState } from "react";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import {
  changePassword,
  deleteUsers,
  changeUserStatus,
} from "../../redux/actions/users/action";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import UsersList from "./UserList";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import ListHeader from "../../components/ListHeader/ListHeader";
import PasswordChangeDialog from "./passwordChangeDialog";
import Checkbox from "@mui/material/Checkbox";
import { Fonts } from "../../utils/constants/Fonts";
import SearchBox from "../../components/SearchBox/SearchBox";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";
import CrudActionButton from "../../components/CrudActionButton/CrudActionButton";

const Users = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openPasswordReset, setOpenPasswordReset] = useState(false);
  const [selectUsers, setSelectUsers] = useState([]);
  const [dialogSelectUsers, setDialogSelectUsers] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [dataUrl, setDataUrl] = useState("user-manage/users");

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
    navigate("/user/users-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onChangePassword = () => {
    setOpenPasswordReset(true);
  };

  const handlePasswordChanegDialogClose = () => {
    setOpenPasswordReset(false);
  };

  const handlePasswordChange = (event, formData) => {
    changePassword(formData, onSuccessPassChange, onErrorPassChange);
  };

  const onSuccessPassChange = async (response) => {
    setOpenPasswordReset(false);
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully changed password",
    });
  };

  const onErrorPassChange = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/user/users-form", {
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
    navigate("/user/users-form", {
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
    setDialogSelectUsers(selectUsers);
  };

  const close = () => {
    setOpen(false);
    setDialogSelectUsers([]);
  };

  const handleChangeUserStatus = () => {
    if (selectUsers.length === 1) {
      var user = selectUsers[0];
      const newStatus = !user.enabled;

      changeUserStatus(user.id, newStatus).then((status) => {
        const changdStatus = status === "disabled" ? false : true;

        user.enabled = changdStatus;

        setSelectUsers([user]);
      });
    }
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
              <Checkbox
                checked={selectUsers.includes(p)}
                onChange={(e) => toggleUsersSelect(p)}
              />
              <ListItemText>
                {p.email} - {p.firstName} {p.lastName}
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
      for (const users of dialogSelectUsers) {
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

  const handleSearch = (searchText) => {
    let url = dataUrl;
    const searchTextParam = "searchText=" + encodeURIComponent(searchText);

    if (url.includes("searchText=") && searchText) {
      url = url.replace(/searchText=[^&]+/, searchTextParam);
    } else if (url.includes("searchText=") && !searchText) {
      url = url.replace(/searchText=[^&]+/, "");
    } else {
      url += (url.includes("?") ? "&" : "?") + searchTextParam;
    }

    setDataUrl(url);
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
      <ListHeader title="Users" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.USER}`}
          >
            <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
          </PermissionWrapper>
          {selectUsers.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.USER}`}
            >
              <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
            </PermissionWrapper>
          )}
          {selectUsers.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.USER}`}
            >
              <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
            </PermissionWrapper>
          )}
          {selectUsers.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.USER}`}
            >
              <CrudActionButton action={DEF_ACTIONS.DELETE} handle={onDelete} />
            </PermissionWrapper>
          )}
          {selectUsers.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.USER}`}
            >
              <Button onClick={onChangePassword}>
                <Edit />
                Change Password
              </Button>
            </PermissionWrapper>
          )}

          {selectUsers.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.USER}`}
            >
              <Button onClick={handleChangeUserStatus}>
                {selectUsers[0].enabled ? "De-activate" : "Activate"}
              </Button>
            </PermissionWrapper>
          )}
        </ButtonGroup>
        <SearchBox handleSearch={handleSearch} />
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.USER}`}
      >
        {loading === false && (
          <>
            <UsersList
              selectedRows={selectUsers}
              onRowSelect={toggleUsersSelect}
              selectAll={selectAllUsers}
              unSelectAll={resetSelectedUsers}
              dataUrl={dataUrl}
            />
          </>
        )}
      </PermissionWrapper>

      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectUsers}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectUsers}
        dialogSelectedTypes={dialogSelectUsers}
        propertyId="firstName"
        propertyDescription="lastName"
      />

      {openPasswordReset && selectUsers[0]?.email ? (
        <PasswordChangeDialog
          open={openPasswordReset}
          handleClose={handlePasswordChanegDialogClose}
          confirmAction={handlePasswordChange}
          email={selectUsers[0].email}
        />
      ) : null}
    </div>
  );
};

export default Users;
