import React, { useContext, useEffect, useState, useRef } from "react";

import UserContext from "../../store/UserContext";
import ConversationBox from "./ConversationBox";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const userCtx = useRef(useContext(UserContext));

  const sendMessage = (message = "Hello", type = "message") => {
    const data = {
      message,
      userid: socket.id,
      username: userCtx.current.username,
      type,
    };

    socket.emit("send_message", data);

    setMessages((prevState) => [...prevState, data]);
  };

  useEffect(() => {
    userCtx.current.login(socket.id, userCtx.current.username);
    sendMessage(`User ${userCtx.current.username} connected.`, "status");

    socket.on("receive_message", (data) => {
      setMessages((prevState) => [...prevState, data]);
    });
  }, []);

  return (
    <React.Fragment>
      <ConversationBox messages={messages} sendMessage={sendMessage} />
    </React.Fragment>
  );
}

export default ChatApp;
