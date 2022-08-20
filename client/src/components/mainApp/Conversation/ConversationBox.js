import React, { useEffect, useRef } from "react";

import Message from "./Message";
import MessageInput from "./MessageInput";
import style from "./ConversationBox.module.css";

function ConversationBox(props) {
  const bottomPageRef = useRef();

  useEffect(() => {
    bottomPageRef.current.scrollIntoView();
  });

  const messages = props.messages.map((message, i) => (
    <Message
      isFirstMessage={
        props.messages[i - 1]?.userid !== message.userid ||
        props.messages[i - 1]?.type === "status"
      }
      message={message}
      key={"m" + i}
    />
  ));

  return (
    <div className={style.messagesBox}>
      <ul className={style.messages}>{messages}</ul>
      <div>
        <MessageInput sendMessage={props.sendMessage} />
        <div ref={bottomPageRef} />
      </div>
    </div>
  );
}

export default ConversationBox;
