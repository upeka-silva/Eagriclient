import { Box, Button, Container, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Client } from '@stomp/stompjs';
import ChatMessage from "./ChatMessage";
import SockJS from "sockjs-client";
import { style } from "d3";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  // const stompClient = useStompClient();
  const messageInputRef = useRef();
  const messagesEndRef = useRef(null);
  const [client, setClient] = useState(null);

  console.log({messages})

  useEffect(() => {
    const newClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws-endpoint'),
      onConnect: () => {
        newClient.subscribe('/topic/reply', message => {
          const newMessage = (message.body);
          setMessages(prevMessages => [...prevMessages, newMessage]); // Add the received message to the state
        });
      },
      onStompError: (frame) => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      },
    });

    newClient.activate();
    setClient(newClient);

    // Disconnect when the component unmounts
    return () => {
      newClient.deactivate();
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom whenever messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      publishMessage();
      event.preventDefault(); // Prevent form submission
    }
  };

  const publishMessage = () => {
    if (client) {
      client.publish({
        destination: "/app/broadcast",
        body: messageInputRef.current.value,
        skipContentLengthHeader: true,
      });
      messageInputRef.current.value = "";
    }
  };

  return (
    <Container>
      {/* <h2>{connectionStatus}</h2> */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={2}
      >
        <Box sx={{ height: "500px", overflow: "auto", width: "50%", border: "5px solid green", borderRadius: "20px" }}>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="stretch" mt={2}>
          <TextField
            sx={{
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
              width: "300px",
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
    </Container>
  );
};

export default ChatPage;
