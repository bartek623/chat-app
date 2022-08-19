import { useState } from "react";
import style from "./MessageInput.module.css";

function MessageInput(props) {
  const [message, setMessage] = useState("");

  const changeHandler = function (e) {
    setMessage(e.target.value);
  };

  const submitHandler = function (e) {
    e.preventDefault();

    if (message === "") return;

    setMessage("");
    props.sendMessage(message);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className={style["input"]}
        onChange={changeHandler}
        value={message}
        placeholder="Your message"
      />
      <button className={style["submit-btn"]} type="submit">
        Send
      </button>
    </form>
  );
}

export default MessageInput;
