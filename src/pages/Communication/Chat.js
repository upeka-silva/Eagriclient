import { Box, Button, ButtonGroup, Divider, Grid } from "@mui/material";
import ChatPage from "./ChatPage";
import SingleConversation from "./SingleConversation";
import { useEffect, useRef, useState } from "react";
import { getUserProfile } from "../../redux/actions/users/action";
import {
  createGroup,
  deleteMessageGroup,
  getMessageGroupList,
  updateGroup,
} from "../../redux/actions/communication/action";
import CreateGroupDialog from "./CreateGroupDialog";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../context/SnackBarContext";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import DialogBox from "../../components/PageLayout/DialogBox";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import DeleteMsg from "../../utils/constants/DeleteMsg";

const Chat = () => {
  const [conversation, setConversation] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [formData, setformData] = useState({});
  const { addSnackBar } = useSnackBars();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const containerRef = useRef(null);
  const [ action, setAction ] = useState(DEF_ACTIONS.ADD);

  console.log({ formData });

  useEffect(() => {
    selectUser();
  }, []);
  useEffect(() => {
    fetchGroupList();
  }, [loading]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // if (
      //   !event.target.closest(
      //     ".button-group, .chat-page, .create-group-dialog, .delete-group-dialog, .autocomplete"
      //   ) && action !== DEF_ACTIONS.EDIT
      // ) {
      //   setConversation(null);
      // }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectUser = () => {
    getUserProfile()
      .then((response) => {
        console.log({ response });
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log({ user });
  const selectConversation = (groupId) => {
    const selectedGroup = groupList.find((group) => group.id === groupId);
    if (selectedGroup) {
      setConversation(selectedGroup);
    }
  };
  const handleChange = (value, target) => {
    setformData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const confirmAction = async () => {
    setLoading(true);
    try {
      if (formData?.id) {
        await updateGroup(formData, onSuccess, onError);
      } else {
        await createGroup(formData, onSuccess, onError);
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    setLoading(false);
    setformData({});
  };
  const handleOpen = () => {
    setAction(DEF_ACTIONS.ADD);
    setOpen(true);
    setformData({});
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    setOpen(true);
    setformData(conversation);
  };

  const onDelete = () => {
    setAction(DEF_ACTIONS.DELETE);
    setformData(conversation);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    setformData(conversation);
    setLoading(true);
    await deleteMessageGroup(formData, onSuccess, onError);
    setConversation(null);
    setOpenDelete(false);
    setLoading(false);
  };

  const closeDelete = () => {
    setOpenDelete(false);
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    setOpen(true);
    setformData(conversation);
    console.log("onedit", formData);
  };

  const fetchGroupList = () => {
    getMessageGroupList().then(({ dataList = [] }) => {
      console.log({ dataList });
      setGroupList(dataList);
    });
  };
  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        action === DEF_ACTIONS.EDIT ? "Successfully Updated" : action === DEF_ACTIONS.ADD
        ? "Successfully Created"
        : "Successfully Deleted",
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
  };
  const renderSelectedItems = () => {
    return <p>{conversation?.groupId}</p>;
  };

  return (
    <div>
      <h4>Chat Functionality - Beta</h4>
      <Grid container justifyContent="center">
        <Grid className="button-group" item xs={3} md={3} lg={3}>
          <Box
            sx={{
              height: "100%",
              overflow: "auto",

              border: "5px solid green",
              borderRadius: "20px",
            }}
          >
            <ButtonGroup
              variant="contained"
              disableElevation
              size="small"
              aria-label="action button group"
              color="success"
              fullWidth
            >
              <PermissionWrapper
              permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.CHAT_GROUP}`}
              >
                <Button onClick={handleOpen} title="add">
                  <Add />
                  {DEF_ACTIONS.ADD}
                </Button>
              </PermissionWrapper>
              {conversation !== null && (
                <PermissionWrapper
                permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.CHAT_GROUP}`}
                >
                  <Button onClick={onEdit} title="edit">
                    <Edit />
                    {DEF_ACTIONS.EDIT}
                  </Button>
                </PermissionWrapper>
              )}
              {conversation !== null && (
                <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CHAT_GROUP}`}
                >
                  <Button onClick={onView} title="view">
                    <Vrpano />
                    {DEF_ACTIONS.VIEW}
                  </Button>
                </PermissionWrapper>
              )}
              {conversation !== null && (
                <PermissionWrapper
                permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.CHAT_GROUP}`}
                >
                  <Button onClick={onDelete} title="delete">
                    <Delete />
                    {DEF_ACTIONS.DELETE}
                  </Button>
                </PermissionWrapper>
              )}
            </ButtonGroup>
            {loading === false &&
              groupList.map((group) => (
                <SingleConversation
                  key={group.id}
                  conversation={group}
                  handleConversation={() => selectConversation(group.id)}
                  isSelected={conversation?.id === group.id}
                />
              ))}
          </Box>
        </Grid>
        <Grid item xs={4} md={8} lg={8}>
          <ChatPage conversation={conversation} user={user} />
        </Grid>
        <CreateGroupDialog
          action={action}
          open={open}
          handleChange={handleChange}
          handleClose={handleClose}
          formData={formData}
          confirmAction={confirmAction}
        />
        <DialogBox
          className="delete-group-dialog"
          open={openDelete}
          title={`Delete Group`}
          actions={
            <ActionWrapper>
              <Button
                variant="contained"
                color="info"
                onClick={confirmDelete}
                sx={{ ml: "8px" }}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={closeDelete}
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
      </Grid>
    </div>
  );
};

export default Chat;
