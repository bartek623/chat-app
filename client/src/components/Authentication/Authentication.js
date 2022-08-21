import { useContext, useRef, useState } from "react";

import UserContext from "../../store/UserContext";
import style from "./Authentication.module.css";

function Authentication(props) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const userCtx = useContext(UserContext);
  const { socket, currentUserid: userid } = props;

  const changeHandler = function (e) {
    setError(false);
  };

  const submitHandler = function (e) {
    e.preventDefault();
    const username = usernameRef.current.value;

    if (username.trim() === "" || username.length > 16) {
      setError(true);
      return;
    }

    userCtx.login(userid, username);
    socket.emit("user_logged_in", { userid, username });
  };

  return (
    <div className={style["modal-container"]}>
      <div className={style.modal}>
        <div className={style.logo}>ChatApp</div>
        <form onSubmit={submitHandler} className={style.form}>
          <input
            ref={usernameRef}
            id="username"
            type="text"
            className={`${style.input} ${error ? style["wrong-input"] : ""}`}
            placeholder="Your Name"
            onChange={changeHandler}
          />
          {error && (
            <p className={style.error}>Wrong username! (1-16 characters)</p>
          )}
        </form>
        <p className={style["active-users"]}>
          Active users: {props.activeUsers}
        </p>
      </div>
    </div>
  );
}

export default Authentication;
