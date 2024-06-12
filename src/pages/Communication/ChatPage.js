import { Box, Button, Container, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import ChatMessage from "./ChatMessage";
import SockJS from "sockjs-client";
import { getMessageList } from "../../redux/actions/communication/action";
import { baseURL } from "../../utils/constants/api";

const ChatPage = ({ conversation, user }) => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const messageInputRef = useRef();
  const messagesEndRef = useRef(null);
  const [client, setClient] = useState(null);
  const type = "GROUP";
  const value = conversation?.id;

  const fetchMessages = () => {
    getMessageList(type, value, page).then(({ dataList = [], totalPages }) => {
      setTotalPages(totalPages);
      setMessages((prevMessages) => [...prevMessages, ...dataList]);
    });
  };

  useEffect(() => {
    setPage(0);
    setMessages([]);
    fetchMessages();
    const newClient = new Client({
      webSocketFactory: () => new SockJS(`${baseURL}ws-endpoint`),
      onConnect: () => {
        newClient.subscribe(`/topic/${conversation.id}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [newMessage, ...prevMessages]);
        });
      },
      onStompError: (frame) => {
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      },
    });

    newClient.activate();
    setClient(newClient);

    return () => {
      newClient.deactivate();
    };
  }, [conversation?.id]);

  useEffect(() => {
    const contentElement = document.getElementById("chat-page-content");
    const handleScroll = () => {
      const scrollHeight = contentElement.scrollHeight;
      const currentHeight = contentElement.clientHeight +
        contentElement.scrollTop * -1;
      if (currentHeight + 1 >= scrollHeight) {
        setPage(page + 1);
      }
    };
    if (page < totalPages) {
      fetchMessages();
    }
    contentElement.addEventListener("scroll", handleScroll);
    return () => contentElement.removeEventListener("scroll", handleScroll);
  }, [page]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      publishMessage();
      event.preventDefault();
    }
  };

  const publishMessage = () => {
    if (client) {
      const chatMessage = {
        content: messageInputRef.current.value,
        recipientType: "GROUP",
        recipientValue: conversation.id,
        senderId: user.id,
        senderName: `${user.firstName} ${user.lastName}`,
      };
      client.publish({
        destination: "/app/chat.send-message",
        body: JSON.stringify(chatMessage),
        skipContentLengthHeader: true,
      });
      messageInputRef.current.value = "";
    }
  };

  return (
    <Box
      className="chat-page"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="left"
      ml={2}
    >
      <Box
        id="chat-page-content"
        sx={{
          height: "500px",
          overflow: "auto",
          width: "100%",
          border: "3px solid green",
          borderRadius: "20px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            display: "flex",
            flexDirection: "column-reverse"
        }}
      >
        <div ref={messagesEndRef} />
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} user={user} />
        ))}
      </Box>
      <Box display="flex" justifyContent="left" alignItems="left" mt={2}>
        <TextField
          sx={{
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
            width: "100%",
            height: "10px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "36px",
              "& fieldset": {
                borderColor: "gray",
              },
              "& input": {
                height: "10px",
              },
            },
          }}
          inputProps={{ style: { color: "black" } }}
          inputRef={messageInputRef}
          variant="outlined"
          placeholder="Type a message..."
          onKeyDown={handleKeyDown}
        />
        <Box marginLeft={2}>
          <Button
            variant="contained"
            color="success"
          disabled={conversation === null}
            sx={{
              width: "94px",
              height: "42px",
              borderRadius: "36px",
            }}
            onClick={publishMessage}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
