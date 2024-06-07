import { Avatar, Box } from "@mui/material";
import { stringAvatar } from "../../utils/helpers/stringUtils";

const ChatMessage = ({ message, user }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: message.senderId === user.id ? "flex-end" : "flex-start",
        margin: "10px 0",
      }}
    >
      <Box
        sx={{
          marginRight: message.senderId === user.id ? "8px" : "auto",
          display: "flex",
          flexDirection: message.senderId === user.id ? "row-reverse" : "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar {...stringAvatar(message.senderName)} size="35" round={true} />
        <h4>{message.senderName}</h4>
      </Box>
      <Box
        sx={{
          marginRight: message.senderId === user.id ? "8px" : "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "60%",
          height: "auto",
          paddingTop: "0px",
          paddingBottom: "0px",
          paddingRight: "10px",
          paddingLeft: "10px",
          borderRadius: "16px",
          backgroundColor: "success.main",
          wordWrap: "break-word",
        }}
      >
        <p style={{ color: "white" }}>{message?.content}</p>
      </Box>
    </Box>
  );
};

export default ChatMessage;
