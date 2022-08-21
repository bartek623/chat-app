import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";

import UserContext from "../../store/UserContext";
import ConversationBox from "./Conversation/ConversationBox";
import UsersList from "./UsersList/UsersList";
import style from "./ChatApp.module.css";

function ChatApp(props) {
  const [messages, setMessages] = useState([]);
  const userCtx = useRef(useContext(UserContext));
  const { socket } = props;

  const sendMessage = useCallback(
    (message = "Hello", type = "message") => {
      const data = {
        message,
        userid: userCtx.current.userid,
        username: userCtx.current.username,
        type,
      };

      socket.emit("send_message", data);

      setMessages((prevState) => [...prevState, data]);
    },
    [socket]
  );

  useEffect(() => {
    // User connection
    sendMessage(`User ${userCtx.current.username} connected.`, "status");

    // New message received
    socket.on("receive_message", (data) => {
      setMessages((prevState) => [...prevState, data]);
    });

    // User disconnected
    socket.on("user_disconnected", (user) => {
      if (user.username)
        sendMessage(`User ${user.username} disconnected.`, "status");
    });
  }, [sendMessage, socket]);

  return (
    <div className={style.container}>
      <ConversationBox messages={messages} sendMessage={sendMessage} />
      <UsersList users={props.users} />
    </div>
  );
}

export default ChatApp;
