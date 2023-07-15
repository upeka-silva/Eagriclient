import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import {
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { defaultMessages } from "../../utils/constants/apiMessages";
import { deleteUserType } from "../../redux/actions/userType/action"
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import { ActionButton } from "../../components/ActionButtons/ActionButton";
import DialogBox from "../../components/PageLayout/DialogBox";
import DeleteMsg from "../../utils/constants/DeleteMsg";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UserTypeList from "./UserTypeList";

const UserType = () => {

    useUserAccessValidation();
    const navigate = useNavigate();
    const { addSnackBar } = useSnackBars();
  
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
  
    const [selectUserType, setSelectUserType] = useState([]);
    const [action, setAction] = useState(DEF_ACTIONS.ADD);

    const toggleUserTypeSelect = (component) => {
        setSelectUserType((current = []) => {
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
    
      const selectAllUserTypes = (all = []) => {
        setSelectUserType(all);
      };
    
      const resetUserType = () => {
        setSelectUserType([]);
      };

      const onCreate = () => {
        setAction(DEF_ACTIONS.ADD);
        navigate("/user-type-form", {
          state: { action: DEF_ACTIONS.ADD },
        });
      };
    
      const onEdit = () => {
        setAction(DEF_ACTIONS.EDIT);
        navigate("/user-type-form", {
          state: {
            action: DEF_ACTIONS.EDIT,
            target: selectUserType[0] || {},
          },
        });
      };
    
      const onView = () => {
        setAction(DEF_ACTIONS.VIEW);
        navigate("/user-type-form", {
          state: {
            action: DEF_ACTIONS.VIEW,
            target: selectUserType[0] || {},
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
            {selectUserType.map((p, key) => {
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
                    {p.userTypeId} - {p.name}
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
          for (const userType of selectUserType) {
            await deleteUserType(userType?.id, onSuccess, onError);
          }
          setLoading(false);
          close();
          resetUserType();
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };



  return (
    <div>
   <ActionWrapper isLeft>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.USER_TYPE}`}
        >
          <ActionButton variant="contained" onClick={onCreate}>
            <AddIcon />
          </ActionButton>
        </PermissionWrapper>
        {selectUserType.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.USER_TYPE}`}
          >
            <ActionButton
              variant="contained"
              color="secondary"
              onClick={onEdit}
            >
              <EditIcon />
            </ActionButton>
          </PermissionWrapper>
        )}
        {selectUserType.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.USER_TYPE}`}
          >
            <ActionButton
              variant="contained"
              color="info"
              onClick={onView}
            >
              <VisibilityIcon />
            </ActionButton>
          </PermissionWrapper>
        )}
        {selectUserType.length > 0 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.USER_TYPE}`}
          >
            <ActionButton
              variant="contained"
              color="error"
              onClick={onDelete}
            >
             <DeleteForeverIcon />
            </ActionButton>
          </PermissionWrapper>
        )}
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.USER_TYPE}`}
      >
        {loading === false && (
          <UserTypeList
            selectedRows={selectUserType}
            onRowSelect={toggleUserTypeSelect}
            selectAll={selectAllUserTypes}
            unSelectAll={resetUserType}
          />
        )}
      </PermissionWrapper>
      <DialogBox
        open={open}
        title="Delete User type"
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
  )
}

export default UserType