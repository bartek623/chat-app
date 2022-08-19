import style from "./Message.module.css";

function Message(props) {
  const messageClass =
    props.message.user === "from-me" ? props.message.user : "from-other";

  return (
    <div
      className={`${style[messageClass]} ${
        props.isFirstMessage ? style["first-message"] : ""
      }`}
    >
      {props.message.user !== "from-me" && props.isFirstMessage && (
        <span className={style.author}>{props.message.user}</span>
      )}
      <p className={style["message-content"]}>{props.message.message}</p>
    </div>
  );
}

export default Message;
