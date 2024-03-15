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
  Paper,
  Typography,
  formControlClasses,
} from "@mui/material";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useNavigate } from "react-router";
import CreatePostList from "./CreatePostList";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../context/SnackBarContext";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import DialogBox from "../../components/PageLayout/DialogBox";
import ListHeader from "../../components/ListHeader/ListHeader";
import { defaultMessages } from "../../utils/constants/apiMessages";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import { deleteAgriculturePost } from "../../redux/actions/extension/action";


const CreatePost = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedCreatePosts, setSelectedCreatePosts] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleCreatePostsSelect = (component) => {
    setSelectedCreatePosts((current = []) => {
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

  const selectAllCreatePosts = (all = []) => {
    setSelectedCreatePosts(all);
  };

  const resetSelectedCreatePosts = () => {
    setSelectedCreatePosts([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/extension/create-Post-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/extension/create-Post-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedCreatePosts[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/extension/create-Post-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedCreatePosts[0] || {},
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
        {selectedCreatePosts.map((p, key) => {
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
                {p.code}
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
      for (const CreatePost of selectedCreatePosts) {
        await deleteAgriculturePost(CreatePost?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedCreatePosts();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <ListHeader title="Agriculture Post" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.AGRICULTURE_POST}`}
          >
            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>
          {selectedCreatePosts.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.AGRICULTURE_POST}`}
            >
              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectedCreatePosts.length === 1 && (
            <PermissionWrapper
              permissionsion={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.AGRICULTURE_POST}`}
            >
              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedCreatePosts.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.AGRICULTURE_POST}`}
            >
              <Button onClick={onDelete}>
                <Delete />
                {DEF_ACTIONS.DELETE}
              </Button>
            </PermissionWrapper>
          )}
        </ButtonGroup>
      </ActionWrapper>
      <PermissionWrapper withoutPermissions>
        {loading === false && (
          <CreatePostList
            selectedRows={selectedCreatePosts}
            onRowSelect={toggleCreatePostsSelect}
            selectAll={selectAllCreatePosts}
            unSelectAll={resetSelectedCreatePosts}
          />
        )}
      </PermissionWrapper>
      <DialogBox
        open={open}
        title="Do you want to delete?"
        actions={
          <ActionWrapper>
            <Button
              variant="contained"
              color="info"
              onClick={onConfirm}
              sx={{ ml: "8px" }}
            >
             OK
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={close}
              sx={{ ml: "8px" }}
            >
             Cancel
            </Button>
          </ActionWrapper>
        }
      >
        <>
          
          <Divider sx={{ mt: "6px" }} />
          {renderSelectedItems()}
        </>
      </DialogBox>
    </div>
  );
};

export default CreatePost;
