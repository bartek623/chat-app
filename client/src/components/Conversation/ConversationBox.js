import React from "react";

import Message from "./Message";
import MessageInput from "./MessageInput";
import style from "./ConversationBox.module.css";

function ConversationBox(props) {
  const messages = props.messages.map((message, i) => (
    <Message message={message} key={"m" + i} />
  ));

  return (
    <div className={style.messagesBox}>
      <ul className={style.messages}>{messages}</ul>
      <MessageInput sendMessage={props.sendMessage} />
    </div>
  );
}

export default ConversationBox;
