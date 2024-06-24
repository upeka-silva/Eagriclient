import { Avatar, Box } from "@mui/material";
import { stringAvatar } from "../../utils/helpers/stringUtils";

const ChatMessage = ({ message, user }) => {
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  const formattedDate = formatDate(message?.timeStamp);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: message.senderId === user.id ? "flex-end" : "flex-start",
        margin: "10px ",
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
        <Avatar {...stringAvatar(message?.senderName)} size="35" round={true} />
        <p>{message.senderName}</p>
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
          backgroundColor: "#B3C8CF",
          wordWrap: "break-word",
        }}
      >
        <p style={{ color: "white" }}>{message?.content}</p>
      </Box>
      <p
        style={{
          fontSize: "8px",
        }}
      >
        {formattedDate}
      </p>
    </Box>
  );
};

export default ChatMessage;
