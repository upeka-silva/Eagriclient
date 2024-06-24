import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import ChatPage from "./ChatPage";
import SingleConversation from "./SingleConversation";
import { useEffect, useRef, useState } from "react";
import { getUserProfile } from "../../redux/actions/users/action";
import {
  createGroup,
  createPrivateChat,
  deleteMessageGroup,
  deletePrivateChat,
  getMessageGroupList,
  getPrivateChatList,
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
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import CreatePrivateChat from "./CreatePrivateChat";

const Chat = () => {
  const [conversation, setConversation] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [formData, setformData] = useState({});
  const { addSnackBar } = useSnackBars();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [dialogOpenAction, setDialogOpenAction] = useState("");
  const [value, setValue] = useState(0);
  const [formDataPrivate, setFormDataPrivate] = useState({});
  const [privateChatList, setPrivateChatList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(
    formData?.presignedUrl || null
  );
  const [imageForm, setImageForm] = useState(null);

  const handleChangeTab = (event, newValue) => {
    setConversation(null);
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 0 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  useEffect(() => {
    selectUser();
  }, []);
  useEffect(() => {
    fetchGroupList();
    fetchPrivateChatList();
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
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const selectConversation = (groupId) => {
    if (value === 0) {
      const selectedGroup = groupList.find((group) => group.id === groupId);
      if (selectedGroup) {
        setConversation(selectedGroup);
        setDialogOpenAction("group");
      }
    } else {
      const selectedChat = privateChatList.find((chat) => chat.id === groupId);
      if (selectedChat) {
        setConversation(selectedChat);
        setDialogOpenAction("private");
      }
    }
  };
  const handleChange = (value, target) => {
    setformData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setImageForm(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleChangePrivate = (value, target) => {
    setFormDataPrivate((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const confirmAction = async (status) => {
    setLoading(true);
    try {
      if (status === "group") {
        if (formData?.id) {
          const form = new FormData();
          form.append("messageGroupDTO", JSON.stringify(formData));
          if (imageForm) {
            form.append("file", imageForm);
          }
          await updateGroup(formData?.id, form, onSuccess, onError);
        } else {
          const form = new FormData();
          form.append("messageGroupDTO", JSON.stringify(formData));
          form.append("file", imageForm);
          await createGroup(form, onSuccess, onError);
        }
      } else {
        await createPrivateChat(formDataPrivate, onSuccess, onError);
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    setformData({});
    setFormDataPrivate({});
    setImageForm(null);
    setSelectedImage(null);
    setImageForm(null);
    setLoading(false);
  };
  const handleOpen = (state) => {
    setAction(DEF_ACTIONS.ADD);
    setDialogOpenAction(state);
    setOpen(true);
    setformData({});
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    setOpen(true);
    setformData(conversation);
    setSelectedImage(conversation?.presignedUrl);
  };

  const onDelete = () => {
    setAction(DEF_ACTIONS.DELETE);
    setformData(conversation);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    setformData(conversation);
    setLoading(true);
    if (value === 0) {
      await deleteMessageGroup(formData, onSuccess, onError);
    } else {
      await deletePrivateChat(formData, onSuccess, onError);
    }
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
    setSelectedImage(conversation?.presignedUrl);
  };

  const fetchGroupList = () => {
    getMessageGroupList().then(({ dataList = [] }) => {
      setGroupList(dataList);
    });
  };

  const fetchPrivateChatList = () => {
    getPrivateChatList().then(({ dataList = [] }) => {
      setPrivateChatList(dataList);
    });
  };
  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        action === DEF_ACTIONS.EDIT
          ? "Successfully Updated"
          : action === DEF_ACTIONS.ADD
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
      <h4>Chat</h4>
      <Grid container justifyContent="center">
        <Grid className="button-group" item xs={3} md={3} lg={3}>
          <Box
            sx={{
              height: "100%",
              overflow: "auto",

              border: "0px",
              borderRadius: "20px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <ButtonGroup
              variant="contained"
              disableElevation
              size="small"
              aria-label="action button group"
              // color="success"
              fullWidth
              border="0px"
            >
              {value === 0 && (
                <PermissionWrapper
                  permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.CHAT_GROUP}`}
                >
                  <Button
                    sx={{
                      background: "#B3C8CF",
                      "&:hover": {
                        background: "#8b9695",
                        border: "0px",
                      },
                    }}
                    onClick={() => handleOpen("group")}
                    title="add"
                  >
                    <Add />
                    {DEF_ACTIONS.ADD}
                  </Button>
                </PermissionWrapper>
              )}
              {conversation !== null && value === 0 && (
                <PermissionWrapper
                  permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.CHAT_GROUP}`}
                >
                  <Button
                    sx={{
                      background: "#B3C8CF",
                      "&:hover": {
                        background: "#8b9695",
                        border: "0px",
                      },
                    }}
                    onClick={onEdit}
                    title="edit"
                  >
                    <Edit />
                    {DEF_ACTIONS.EDIT}
                  </Button>
                </PermissionWrapper>
              )}
              {conversation !== null && value === 0 && (
                <PermissionWrapper
                  permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CHAT_GROUP}`}
                >
                  <Button
                    sx={{
                      background: "#B3C8CF",
                      "&:hover": {
                        background: "#8b9695",
                        border: "0px",
                      },
                    }}
                    onClick={onView}
                    title="view"
                  >
                    <Vrpano />
                    {DEF_ACTIONS.VIEW}
                  </Button>
                </PermissionWrapper>
              )}
              {conversation !== null && (
                <PermissionWrapper
                  permission={
                    value === 0
                      ? `${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.CHAT_GROUP}`
                      : `${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.PRIVATE_CHAT}`
                  }
                >
                  <Button
                    sx={{
                      background: "#B3C8CF",
                      "&:hover": {
                        background: "#8b9695",
                        border: "0px",
                      },
                    }}
                    onClick={onDelete}
                    title="delete"
                  >
                    <Delete />
                    {DEF_ACTIONS.DELETE}
                  </Button>
                </PermissionWrapper>
              )}
            </ButtonGroup>
            <Tabs
              textColor="secondary"
              indicatorColor="secondary"
              variant="fullWidth"
              value={value}
              onChange={handleChangeTab}
              aria-label="message tabs"
            >
              <Tab icon={<GroupsIcon color="secondary" />} label="GROUP" />
              <Tab icon={<PersonIcon color="secondary" />} label="PRIVATE" />
            </Tabs>
            <TabPanel value={value} index={0}>
              {loading === false &&
                groupList.map((group) => (
                  <SingleConversation
                    key={group.id}
                    conversation={group}
                    handleConversation={() =>
                      selectConversation(group.id, "group")
                    }
                    isSelected={conversation?.id === group.id && value === 0}
                  />
                ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PermissionWrapper
                permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.PRIVATE_CHAT}`}
              >
                <Button
                  title="Start New Chat"
                  fullWidth
                  sx={{
                    text: "#ffffff",
                    background: "#B3C8CF",
                    "&:hover": {
                      background: "#8b9695",
                      border: "0px",
                    },
                  }}
                  onClick={() => handleOpen("private")}
                >
                  Start New Chat
                </Button>
              </PermissionWrapper>
              {loading === false &&
                privateChatList.map((chat) => (
                  <SingleConversation
                    key={chat.id}
                    privateConversation={chat}
                    user={user}
                    handleConversation={() =>
                      selectConversation(chat.id, "private")
                    }
                    isSelected={conversation?.id === chat.id && value === 1}
                  />
                ))}
            </TabPanel>
          </Box>
        </Grid>
        <Grid item xs={4} md={8} lg={8}>
          <ChatPage conversation={conversation} user={user} value={value} />
        </Grid>
        <CreateGroupDialog
          action={action}
          open={open && dialogOpenAction === "group"}
          handleChange={handleChange}
          handleClose={handleClose}
          formData={formData}
          confirmAction={() => confirmAction("group")}
          selectedImage={selectedImage}
          handleImageChange={handleImageChange}
        />
        <CreatePrivateChat
          open={open && dialogOpenAction === "private"}
          handleChangePrivate={handleChangePrivate}
          handleClose={handleClose}
          formDataPrivate={formDataPrivate}
          confirmAction={() => confirmAction("private")}
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
