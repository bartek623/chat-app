import React, { useEffect, useState } from "react";

import ConversationBox from "./components/Conversation/ConversationBox";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = (message = "Hello") => {
    socket.emit("send_message", { message });

    const data = { message, user: "from-me" };
    setMessages((prevState) => [...prevState, data]);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevState) => [...prevState, data]);
    });
  }, [socket]);

  return (
    <React.Fragment>
      <ConversationBox messages={messages} sendMessage={sendMessage} />
    </React.Fragment>
  );
}

export default App;
