import { useContext } from "react";

import UserContext from "../../store/UserContext";
import style from "./Message.module.css";

function Message(props) {
  const userCtx = useContext(UserContext);

  if (props.message.type === "status") {
    return <div className={style.status}>{props.message.message}</div>;
  }

  const messageClass =
    props.message.userid === userCtx.userid ? "from-me" : "from-other";

  console.log(props.isFirstMessage);

  return (
    <div
      className={`${style[messageClass]} ${
        props.isFirstMessage ? style["first-message"] : ""
      }`}
    >
      {messageClass !== "from-me" && props.isFirstMessage && (
        <span className={style.author}>{props.message.username}</span>
      )}
      <p className={style["message-content"]}>{props.message.message}</p>
    </div>
  );
}

export default Message;
